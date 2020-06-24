# My Sprout Farm
![Alt text](public/img/main.png?raw=true "Title")
## A. Environment
### OS: macOS 10.15.5
## B. Prerequisite
- NodeJS: v12.16.2
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
## D. How to play the game?
- Click on any empty box to plant a seed with random DNA
![Alt text](public/img/plantseed_init.png?raw=true "Title")
- Collect seeds from existing sprouts and plant then elsewhere
![Alt text](public/img/plantseed.png?raw=true "Title")
- Collect pollen from existing sprouts and perform pollination to get seeds of different DNA!
![Alt text](public/img/actions.png?raw=true "Title")
![Alt text](public/img/choosepollen.png?raw=true "Title")
## E. About the UI
### Stylesheet:https://tocas-ui.com

