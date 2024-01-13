const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");

// importing request promise to deal with promises
const request = require("request-promise");
const R = require("ramda");

// importing csv-stringify module to deal with csvs
const { stringify: csvStringify } = require("csv-stringify/sync");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

// existing code - not touching it
app.get("/investments/:id", (req, res) => {
  const { id } = req.params;
  request.get(
    `${config.investmentsServiceUrl}/investments/${id}`,
    (e, r, investments) => {
      if (e) {
        console.error(e);
        res.send(500);
      } else {
        res.send(investments);
      }
    }
  );
});

// new route for csv report generation
app.get("/generate-report", async (req, res) => {
  try {
    // fetching investment records
    const investments = await request({
      uri: `${config.investmentsServiceUrl}/investments`,
      json: true,
    });

    // console.log(investments);

    // fetch company details to get investment data and return an array of promises
    // flatten the array to map through holdings
    const csvPromises = investments.flatMap((investment) =>
      investment.holdings.map(async (holding) => {
        // send the request to financial companies service
        const company = await request({
          uri: `${config.companiesServicesUrl}/companies/${holding.id}`,
          json: true,
        });

        // return object (basically the whole thing becomes an array of objects)
        return {
          User: investment.userId,
          FirstName: investment.firstName,
          LastName: investment.lastName,
          Date: investment.date,
          Holding: company.name,
          Value: investment.investmentTotal * holding.investmentPercentage,
        };
      })
    );

    // console.log(csvPromises);

    // resolve all promises at once
    const csvData = await Promise.all(csvPromises);

    // console.log(csvData);

    // creating headers
    const headers = [
      "User",
      "FirstName",
      "LastName",
      "Date",
      "Holding",
      "Value",
    ];

    // convert the data to csv format
    const csv = csvStringify(csvData, {
      header: true,
      columns: headers,
    });

    // console.log(csv);

    // send csv report to investments service
    const response = await request({
      method: "POST",
      uri: `${config.investmentsServiceUrl}/investments/export`,
      body: { csv: csv },
      json: true,
      resolveWithFullResponse: true,
    });

    // console.log(response.statusCode);
    // console.log(response);

    // return csv to the admin
    res.setHeader("Content-Type", "text/csv");
    res.send(csv);
  } catch (e) {
    console.error(e);
    res.status(500).send("error with report");
  }
});

// wraping for testing
if (process.env.NODE_ENV !== "test") {
  app.listen(config.port, (err) => {
    if (err) {
      console.error("Error occurred starting the server", err);
      process.exit(1);
    }
    console.log(`Server running on port ${config.port}`);
  });
}

// exporting for testing
module.exports = app;
