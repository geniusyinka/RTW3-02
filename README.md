# Road To Web3 Lesson 2 repo

This repo contains both the smart contract and the frontend of the second lesson of the Alchemy Road To Web3 course. 

setting things up is quite easy.

clone the repo: 
run `npm install`
cd into "frontend", run `npm install`

this will install all of the dependencies.

## deploying contract
locate .env.example file and replace with your private key and API keys. learn more here: https://docs.alchemy.com/alchemy/road-to-web3/weekly-learning-challenges/2.-how-to-build-buy-me-a-coffee-defi-dapp

then
run `npx hardhat run scripts/deploy.js --network goerli`

you should get this:
```
BuyMeACoffee deployed to: <contract address>
```
copy the contract address and open index.js in `frontend/pages/index.js`. replace with yours.

while in the frontend folder, run `npm run dev`, project should be live on `http://localhost:3000`
