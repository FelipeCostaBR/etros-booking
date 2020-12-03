const express = require("express");
const app = express();

const { Pool } = require("pg");
const pool = new Pool({ database: "etros" });

var bodyParser = require("body-parser");

// app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/booking/:dates", (request, response) => {
  const { dates } = request.params;
  const dateFrom = dates.split(",")[0];
  const dateTo = dates.split(",")[1];
  const sql =
    "SELECT DISTINCT b.id, name, brand, type, year, transmission, photo from bookings a RIGHT JOIN cars b on b.id = a.id_cars where b.id not in (SELECT id_cars FROM bookings WHERE (start_date BETWEEN $1 AND $2) OR (end_date BETWEEN $1 AND $2));";
  pool.query(sql, [dateFrom, dateTo], (err, dbResponse) => {
    if (err) {
      response
        .status(400)
        .json({ message: "invalid request", err: err.message });
    } else {
      response.json({ data: dbResponse.rows });
    }
  });
});

app.post("/booking", (request, response) => {
  const { startDate, endDate, carId } = request.body;

  const sql =
    "INSERT INTO bookings (start_date, end_date, id_cars, id_user) VALUES ($1, $2, $3, $4);";
  pool.query(sql, [startDate, endDate, carId, 1], (err, dbResponse) => {
    if (err) {
      response
        .status(400)
        .json({ message: "invalid request", err: err.message });
    } else {
      response.json({ data: "Booking successfully" });
    }
  });
});

app.listen(process.env.PORT || 3333);
