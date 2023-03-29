# Introduction
Commission Calculator - Get the calculated commission charge for your transaction amount. Cash In, Cash Out commission charge calculated based on total amount, weekly free charge limit, user ID and user type. <br/>

Demo Project Link: https://commission-calculator.vercel.app <br/>

Technology used: React.js, TypeScript <br/>
Check [React Documentation](https://reactjs.org/docs/getting-started.html), [TypeScript Documentation](https://www.typescriptlang.org/docs/) for help.

# Installation 
At first clone the github repository to your local machine. 
```
git clone https://github.com/raadu/commission-calculator
```

To run the app go to project directory and enter these commands serially
```
npm install
npm start
```
or if you are using Yarn,

```
yarn install
yarn start
```

* Port used 3000. App is displayed in localhost:3000. If the port 3000 is not free, it will prompt and ask to open in another port.

# Executing in command line
Need ts-node to be installed as global npm package. It is used to run node projects that use TypeScript with ESM module. Please install the package using this command.

```
npm install -g ts-node
```

A json file with given transaction data is needed for input. <br/>
ENTRYPOINT here is app.js <br/>
PATH is the path of the json file. <br/>

```
ts-node --esm ENTRYPOINT PATH
```

A input.json file is already included in the project. To run the app, go to project directory enter this command. 

```
ts-node --esm app.js input.json
```

# Testing
To run unit tests enter this command
```
npm run test
```
or if you are using Yarn,

```
yarn test
```
