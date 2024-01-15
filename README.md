**Task**
Enclosed in the archive is a collection of CSV files. Each file contains a log of events that
have occurred on a server.
Your task is to develop a web server with the following endpoints:
1. Retrieve the Click-Through Rate (CTR) for each campaign on a specified day.
parameters: date: YYYY-MM-DD
Example response
[{
"campaign": "755524_Truck Driver Jobs / DE / AlexIv / [int]",
"ctr": 0.6
}, {
"campaign": "755525_Truck Driver Jobs / UA / AlexIv / [int]",
"ctr": 0.7
}];
2. Gather daily statistics including clicks, views, and unique sessions for a given period.
parameters: from: YYYY-MM-DD, to: YYYY-MM-DD
Example response
[{
"date": "2022-11-02",
"clicks": 100,
"views": 400,
"uniqueSessions": 350
}, {
"date": "2022-11-01",
"clicks": 100,
"views": 400,
"uniqueSessions": 350
}]
Note: CTR should be calculated based on unique sessions rather than total views
This project should be implemented using Javascript + NodeJS + Express, alongside any
other technologies you deem necessary.
Key considerations:
● Robust error handling
● Scalability and efficiency of the solution. Bear in mind that the provided CSV data is
merely illustrative. The actual event count per day could be significantly higher.

**How to run and check solution**
1. Clone the repo
2. Install dependencies with npm 
```npm i```
3. Run server
```npm run start```
4. App has 2 routes implementet. Both can be checked by making a GET request using tools like Postman or any browser. 
Available routes:
GET http://localhost:3000/ctr
GET http://localhost:3000/stats
App has validation so to retrieve the data valid query string is required
Example of query for routes:
http://localhost:3000/ctr?date=2023-12-07
http://localhost:3000/stats?from=2023-11-07&to=2023-11-09

