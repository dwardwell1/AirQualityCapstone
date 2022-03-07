-- both test users have the password "password"


INSERT INTO locations (zipcode,
                       city,
                       state_code,
                       lat,
                       lng)
VALUES (95926, 'Chico', 'CA', 39.7289, 121.8194),
       (93010, 'Camarillo', 'CA', 34.2164, 119.0376 );

INSERT INTO users (username, email, password, default_locale, alerts, is_admin)
VALUES ('testuser',
        'dwardwell1@gmail.com',
        'password', 95926, 1, true),
       ('testuser2',
        'daniel@wardwellmakes.com',
        'password123', 92083,1, false);

       

INSERT INTO subs (user_id,
                           location_id, email_alerts)
VALUES (1, 1,  3),
       (2, 2,  3);
       