# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Environment

Install [NodeJs](https://nodejs.org/en/download/)
## Available Scripts

In the project directory, you can run:

### `npm install` to install all dependecies

### `npm start` to start the project

Runs the app in the development mode.\
Open [http://localhost:3006](http://localhost:3006) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### Examples to generate a QR CODE

You need to fill the textField component with a string. If you want to pass a 
object JSON, you need to convert it to string before you fill the textField. You may use this site to do this conversion: https://tools.knowledgewalls.com/json-to-string

Example:

````
{"ativo":"bomba", "tombamento": "25566995", "unidade":"recife", "setor": "CP-4"}

"{\"ativo\":\"bomba\", \"tombamento\": \"25566995\", \"unidade\":\"recife\", \"setor\": \"CP-4\"}"
````

### App Deploy

Access this link to view the deploy https://davidwilsonfs.github.io/ChallengeOneQRCode/