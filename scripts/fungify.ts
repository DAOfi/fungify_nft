import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import Fraction from '../artifacts/contracts/Fraction.sol/Fraction.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'hhttps://main-light.eth.linkpool.io'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  // console.log('Wallet:', wallet.address)
  let fraction = new ethers.Contract('0x21A870C7fce1BCe5d88bDF845Ac332C76204a9A0', Fraction.abi, provider)

  let fractionSigner = fraction.connect(wallet)
  let overrideOptions = {
      gasLimit: 2000000,
      gasPrice: ethers.utils.parseUnits('120', 'gwei')
  }

  let tokenIDs = [
      ethers.BigNumber.from("1")
  ]
  let totalERC20 = ethers.BigNumber.from("100")

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