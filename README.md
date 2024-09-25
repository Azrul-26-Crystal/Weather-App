# Weather-App
Weather app using Node.js, Express, OpenCage API and OpenMeteo API

* This project focuses on how to manage secrets, learn to integrate third party services into the application, re-enforcing core API fundamentals and getting a grasp on templating.

* Third party integration services that were used are Opencage API and OpenMeteo API to obtain the coordinates of the location given by the user and returns the weather condition in that area.

* The webpage can be rendered using EJS templating which takes a single query and forwards it to the forecast route.

* The goal of this project is to allow user to enter a location which returns the weather condition in that area for the day and/or whole day at each hour

## Instructions on how to use weather app in Node.js
1. Run "npm install" in the console to download the necessary packages.
2. Next, create an .env file and save in the root folder. In that file, write **PORT=3000** or any other value that you would like. An on another line, write **OPENCAGE_API_KEY = YOUR_API_KEY**.
3. **YOUR_API_KEY** can be obtained from [OpenCageAPI](https://opencagedata.com/api) after you sign up. Make sure not to share your API keys with others.
4. Next, run "npm run dev" in the console to start the server. You can see that the server is running on port that you assigned.
5. Open a browser, and insert url [http://localhost:3000](http://localhost:3000) to open the weather app page.
6. In the search bar, insert any location that you want to find the weather condition. And press search.
7. The weather condition will be displayed based on the most closest search result that it could find.
8. If it couldn't find the location, an error page will be displayed.
