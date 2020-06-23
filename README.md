## A. Environment
### OS: macOS 10.15.5

## B. Setting up the environment
- NodeJS: v12.16.2
    - Download it here: https://nodejs.org/en/download/
- Truffle: v5.1.23
```
$ npm install truffle
```
- Ganache CLI: v6.9.1
```
$ npm install ganache-li
```
- sweetalert2: v9.15.1
```
$ npm install sweetalert2
```
## C. How to start the program?
### 1. Clone the project
```
$ git clone https://github.com/c-tsai/nmlab_final.git
```
- Check out final branch
```
$ git checkout final
```

### 2. Truffle compile (Directory: `src/`)
```
$ truffle compile
```
### 3. Start ganache-cli
```
$ ganache-cli
```
- Make sure the client is running on port:8545

### 4. Truffle migrate (Director: `src/`)
```
$ truffle migrate
```

### 5. Start the program (Directory: `root dir`)
```
$ npm run start
```

### 6. Start Google Chrome
- http://localhost:3000
- Click on the button and you'll see the message in the console

## D. About the UI
### Stylesheet:https://tocas-ui.com

