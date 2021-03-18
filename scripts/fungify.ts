import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import Fraction from '../artifacts/contracts/Fraction.sol/Fraction.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'https://kovan.poa.network'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  // console.log('Wallet:', wallet.address)
  let fraction = new ethers.Contract('0xB84E429b71802decd65e1A6Fe197800D069A1ac6', Fraction.abi, provider)
  let fractionSigner = fraction.connect(wallet)
  let overrideOptions = {
      gasLimit: 5000000,
  }

  let tokenIDs = [
      ethers.BigNumber.from("1"),
      ethers.BigNumber.from("2"),
      ethers.BigNumber.from("3"),
      ethers.BigNumber.from("4"),
      ethers.BigNumber.from("5"),
      ethers.BigNumber.from("6")
  ]
  let totalERC20 = ethers.BigNumber.from("888")

  let fung = await fractionSigner.fungify(tokenIDs, totalERC20, overrideOptions)

  provider.once(fung.hash, (receipt) => {
      console.log('Transaction Minded: ' + receipt.transactionHash);
      console.log(receipt);
  })
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  });