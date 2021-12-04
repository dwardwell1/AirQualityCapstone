
--add default location to USER?


CREATE TABLE locations (
  id SERIAL PRIMARY KEY ,
  zipcode int UNIQUE,
  city varchar(50),
  state_code varchar(5),
  lat DECIMAL(10,8) ,
  lng DECIMAL(11,8) 
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  password TEXT NOT NULL,
  default_locale int REFERENCES locations,
  is_admin BOOLEAN DEFAULT FALSE
);


CREATE TABLE subs (
  user_id int NOT NULL REFERENCES users ON DELETE CASCADE,
  location_id int NOT NULL REFERENCES locations,
  email_alerts int,
  PRIMARY KEY (user_id, location_id)
);

-- CREATE TABLE locations (
--   username VARCHAR(25) PRIMARY KEY,
--   password TEXT NOT NULL,
--   first_name TEXT NOT NULL,
--   last_name TEXT NOT NULL,
--   email TEXT NOT NULL
--     CHECK (position('@' IN email) > 1),
--   is_admin BOOLEAN NOT NULL DEFAULT FALSE
-- );

-- CREATE TABLE jobs (
--   id SERIAL PRIMARY KEY,
--   title TEXT NOT NULL,
--   salary INTEGER CHECK (salary >= 0),
--   equity NUMERIC CHECK (equity <= 1.0),
--   company_handle VARCHAR(25) NOT NULL
--     REFERENCES companies ON DELETE CASCADE
-- );

-- CREATE TABLE applications (
--   username VARCHAR(25)
--     REFERENCES users ON DELETE CASCADE,
--   job_id INTEGER
--     REFERENCES jobs ON DELETE CASCADE,
--   PRIMARY KEY (username, job_id)
-- );
