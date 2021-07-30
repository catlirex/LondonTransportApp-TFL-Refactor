# LondonTransportApp-TFL-Refactor
This App is searching London Public Transport(TFL) using PostCode. With search History, user login, save bookmark features.</br>
Using the [Transport API](https://www.transportapi.com/) fetch to get instance data.</br>

A json data base is used to store user account and view history.</br>
Style using `material-ui` and `styled-components` library.</br>
PostCode vilidataion with `uk-postcode-validator`

This project build with:
- React
- React-Leaflet
- Typescript

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing
```
npm i
```
### Run the app
Start the local server for the user database
```
json-server --watch db/db.json -p 4000
```
Then start the app with the command
```
npm run dev
```

