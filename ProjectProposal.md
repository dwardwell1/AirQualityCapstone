1. What tech stack will you use for your final project? We recommend that you use
React and Node for this project, however if you are extremely interested in
becoming a Python developer you are welcome to use Python/Flask for this
project.

A. React and Node

2. Is the front-end UI or the back-end going to be the focus of your project? Or are
you going to make an evenly focused full-stack application?

A. Ideally evenly focused

3. Will this be a website? A mobile app? Something else?

A. Website

4. What goal will your project be designed to achieve?

A. To provide an easy to understand, clean and informative one stop shop to understand air quality and how much time to spend outdoors. Allergies and general weather hopefully to be to be included.

5. What kind of users will visit your app? In other words, what is the demographic of
your users?

A. Anyone who cares about the air quality. Where I am in California forest fires make our air quite bad for most the summer. How bad exactly? How safe is it to be outside?

6. What data do you plan on using? How are you planning on collecting your data?
You may have not picked your actual API yet, which is fine, just outline what kind
of data you would like it to contain. You are welcome to create your own API and
populate it with data. If you are using a Python/Flask stack are required to create
your own API.

A. I have several options for API to find air quality information for basically anywhere in the world, today and days past. Hopefully a forecast as well. An early idea is to also have data for the local area to suggest indoor events if necessary? Still brainstorming additional features. 

7. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later).
a. What does your database schema look like?
    - Simple database schema at this point with user emails and passwords. API calls will be stored locally I believe
b. What kinds of issues might you run into with your API? This is especially
important if you are creating your own API, web scraping produces
notoriously messy data.
    - Ill need to experiment with API to see if it gets global data or just US.
c. Is there any sensitive information you need to secure?
    - User passwords for my email list
d. What functionality will your app include?
    - Weather forecast, event suggestions based on wx/air quality. Allergen alerts, and email alerts the user signs up for
e. What will the user flow look like?
    - Plug in location (ideally zip code), see local results. Give option to sign up for email alerts based on criteria you want (if AQI is above a certain level, if it is a certain weather condition, etc.)
f. What features make your site more than a CRUD app? What are your
stretch goals?
    - With email alerts Ill need to have the users saved and make an auto API call for them on a daily basis, which is something Ill have to figure out
