import React, { useState } from "react";
import { format } from "date-fns";
import { enGB } from "date-fns/locale";
import { DateRangePickerCalendar, START_DATE } from "react-nice-dates";
import axios from "axios";
import "react-nice-dates/build/style.css";
import * as GoIcons from "react-icons/go";
import * as GiIcons from "react-icons/gi";
import * as FaIcons from "react-icons/fa";

import "../styles/Calendar.css";

export default function DateRangeCalendar() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [focus, setFocus] = useState(START_DATE);
  const [cars, setCars] = useState([]);
  const handleFocusChange = (newFocus) => {
    setFocus(newFocus || START_DATE);
  };

  const formatDate = (date) => format(date, "yyyy-MM-dd", { locale: enGB });

  const getCurrentDate = (addDays = 0) => {
    let today = new Date();
    let day = today.getDate() + addDays;
    let month = today.toLocaleString("default", { month: "short" });
    let year = today.getFullYear();
    let date = `${day}/${month}/${year}`;
    return date;
  };

  const handleCarAvailable = () => {
    setCars([]);
    const dates = `${formatDate(startDate)},${formatDate(endDate)}`;
    axios.get(`/booking/${dates}`).then((response) => {
      setCars(response.data.data);
    });
  };

  const handleBooking = (startDate, endDate, id) => {
    axios.post("/booking", {
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      carId: id,
    });
    handleCarAvailable();
  };

  return (
    <>
      <section className="calendar-box-container">
        <div className="calendar-container">
          <span className="startDate">
            {" "}
            {startDate
              ? format(startDate, "dd/MM/yyyy", { locale: enGB })
              : getCurrentDate()}
          </span>
          <span className="endDate">
            {" "}
            {endDate
              ? format(endDate, "dd/MM/yyyy", { locale: enGB })
              : getCurrentDate(5)}
          </span>

          <DateRangePickerCalendar
            startDate={startDate}
            endDate={endDate}
            focus={focus}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
            onFocusChange={handleFocusChange}
            locale={enGB}
          />
          <button
            className="btn-check-car-available"
            onClick={handleCarAvailable}
          >
            Confirm
          </button>
          {cars.map((car) => {
            return (
              <div key={car.id} className="car-display-container">
                <img src={car.photo} alt="car" />
                <p className="car-name">
                  {car.name} - {car.brand}
                </p>
                <p>type: {car.type}</p>
                <p>
                  <GiIcons.GiHammerNails /> {car.year}
                </p>
                <p>
                  <GoIcons.GoGear /> {car.transmission}
                </p>
                <p>
                  <FaIcons.FaMoneyBill /> $180/week
                </p>
                <button
                  onClick={() => handleBooking(startDate, endDate, car.id)}
                >
                  make booking
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
