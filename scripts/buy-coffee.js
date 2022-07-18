
const hre = require("hardhat");

//returns the ether balance of a given address.
async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt);
}

//logs the ether balance for the list of addresses
async function printBalances(addresses) {
    let idx = 0;
    for (const address of addresses) {
      console.log(`Address ${idx} balance: `, await getBalance(address));
      idx ++;
    }
  }

//logs the memos stored on-chain from the coffee purchase
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp
    const tipper = memo.name
    const tipperAddress = memo.from
    const message = memo.message
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"`,
    )
  }
}

async function main() {
  //get the example accounts we'll be working with
  const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners()

  //get the contract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory('BuyMeACoffee')
  const buyMeACoffee = await BuyMeACoffee.deploy()

  //deploy the contract
  await buyMeACoffee.deployed()
  console.log('BuyMeACoffee is deployed to:', buyMeACoffee.address)

  //check balance before the coffee purchase
  const addresses = [owner.address, tipper.address, buyMeACoffee.address]
  console.log('==start==')
  await printBalances(addresses)

  //buy the owner a few coffees
  const tip = { value: hre.ethers.utils.parseEther('1') }
  await buyMeACoffee.connect(tipper).buyCoffee('yinka', 'you rock!', tip)
  await buyMeACoffee.connect(tipper2).buyCoffee('frank', 'awesome work!', tip)
  await buyMeACoffee.connect(tipper3).buyCoffee('wilson', 'you never cease to amaze me!', tip)

  console.log('==bought coffee==')
  await printBalances(addresses)

  //check out the memos
  console.log('==logging memos==')
  const memos = await buyMeACoffee.getMemos()
  printMemos(memos)
}

//needed to use async/await everywhere and properly handle errors

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
