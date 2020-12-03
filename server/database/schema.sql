CREATE DATABASE etros;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    dt_birth DATE,
    email TEXT NOT NULL,
    cript_password TEXT
);

insert into users (name, dt_birth, email) VALUES ('Felipe', '1992-07-15', 'felipe@ga.co');


CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    year DECIMAL NOT NULL,
    transmission VARCHAR(100),
    details VARCHAR(200),
    photo TEXT NOT NULL
);

INSERT INTO cars (name, brand, type, year, transmission, photo) VALUES 
('Corolla', 'Toyota','Seddan','2015', 'Automatic', 'https://ecoledeconduiteandys.ca/wp-content/uploads/2016/05/2015-toyota-corolla-super-white-1024x768.jpg'),
('Hyundai', 'I30','Hatch','2012', 'Automatic','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX0KQHr8Yt5pEC2FB1i8KVL0AvhDPP078A6g&usqp=CAU' );

CREATE TABLE bookings(
    id SERIAL PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    id_cars INTEGER NOT NULL,
    constraint fk_car_bookings
    foreign key (id_cars)
    REFERENCES cars (id),
    id_user INTEGER NOT NULL,
    constraint fk_user_bookings
    foreign key (id_user)
    REFERENCES users (id)
);

INSERT INTO bookings (start_date, end_date, id_cars, id_user) VALUES ('2020-11-20','2020-12-18',1,1);


-- select car availables for booking
SELECT DISTINCT b.id, name, brand, type, year, transmission 
from bookings a RIGHT JOIN cars b on b.id = a.id_cars
where b.id not in (
    SELECT id_cars FROM bookings 
    WHERE (start_date BETWEEN '2020-12-23' AND '2020-12-29') 
    OR (end_date BETWEEN '2020-12-23' AND '2020-12-29')
);