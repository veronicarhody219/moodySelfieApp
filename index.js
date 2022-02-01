const express = require("express");
const Datastore = require("nedb");
const app = express();
app.listen(5000, () => console.log("Listening on port 5000!"));
app.use(express.static("public"));

app.use(express.json({limit: "1mb"}));

const database = new Datastore("database.db");

database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  console.log("I got a request!");
  const data = request.body;
  // console.log(data);
  const timestamp = Date.now();
  data.timestamp = timestamp;

  database.insert(data);
  // console.log(database);
  response.json(
    //   {
    //   status: "success",
    //   timestamp: timestamp,

    //   latitude: data.lat,
    //   longitude: data.long,
    // }
    data
  );
});
