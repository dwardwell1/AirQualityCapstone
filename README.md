


Air(Q) - https://bright-mist.surge.sh/

As climate change continues to impact our planet, I wanted to create one-stop-shop to find out the air quality in your area and if there are 
any wildfires in your area. Also, I wanted to creat email alerts to be recieved if air quality hits a certain selectable precipice. Sometimes air quality is not 
as easy as taking a deep breath outside, and remembering to visit a website to ask isn't exactly a daily task you want to do.




The website has 3 main features. First is the ability to search any zip code in America and recieve the current AQI (air quality index). 
Secondly is the ability to subscribe to that area and recieve an email alert if the air quality index hits a certain threshold.
Thirdly is a map that shows up to date wildfires (as reported by NASA) on a Google Map of the world, and information on selected fire.
These are all implemented to provide simple and easy access to your air quality and fire information without the clutter of some websites, along 
with option to subscribe to non-invasive email alerts


Tests can be found in the same folder as the code to be tested. To run test run npm test FILE_NAME_HERE.js


Using the website is pretty straight forward. On homepage we have option to look up zip code and recieve the current AQI. On the 
nav bar we can also see the local fire alerts. User then has option to signin/subscribe to email alerts or quick search their subscribed location


Three API's are used in this project. The first is the AirNow API. The second is the Google Maps API. The third is the NASA Fire API.
AirNow provides the current air quality index for a given zip code. Google Maps the map and location services for our fire mapping service. THe NASA Fire API provides the current wildfires reported by NASA. In the backend a CRUD data base API was created to provide user information and data as well as location data.


The front end of the App utilizies React, Bootstrap, and axios. The back end utilizies Node.js, Express, PostgreSQL, Bcrypt for incryption, and nodemailer for email alerts.


This website is not yet fully armed and operational. Below is a Todo list:
TODOs:
Make the website look good on mobile
Allow users to subscribe to multiple locations
Forgotten password feature
Continue to fine tune UI 
Add Admin page



