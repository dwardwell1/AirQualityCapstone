
--make zip codes unique, if subscribing to already declared zip, refer to current location in db


CREATE TABLE locations (
  id SERIAL PRIMARY KEY ,
  zipcode int  NOT NULL,
  city varchar(50),
  state_code varchar(5),
  lat DECIMAL(10,8) ,
  lng DECIMAL(11,8) 
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL
    CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  default_locale int,
  alerts int,
  secondary int REFERENCES locations,
  is_admin BOOLEAN DEFAULT FALSE
);


CREATE TABLE subs (
  user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
  location_id int NOT NULL REFERENCES locations ON DELETE CASCADE,
  email_alerts int,
  PRIMARY KEY (user_id, location_id)
);

