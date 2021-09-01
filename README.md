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
### ScreenCap
HomePage
![image](https://user-images.githubusercontent.com/81304846/131759484-8652e598-86ab-4d20-8c6d-c161c50465f7.png)

### Search (Implement React Model in search, login, create bookmark)
![image](https://user-images.githubusercontent.com/81304846/131759557-5f6fa22a-2d1e-4e86-8f57-dce17d7c84eb.png)

### Search Result
![image](https://user-images.githubusercontent.com/81304846/131759713-07c14fb6-4352-47ce-b43e-5f2c040aa2e5.png)

### Path detail
![image](https://user-images.githubusercontent.com/81304846/131759749-c150f1ba-38db-4661-83c0-63349b2f5cec.png)

Click on the map icon of each card, can zoom to detail
![image](https://user-images.githubusercontent.com/81304846/131759772-ff7a5cde-e1e3-4e4e-b5fe-290bfd223fc6.png)

### Login user function
user can save journey(re-fetch) / bookmark(auto fill search form)
![image](https://user-images.githubusercontent.com/81304846/131760190-90a29be4-a34a-4816-b098-109a5c4e01be.png)

