import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import Fraction from '../artifacts/contracts/Fraction.sol/Fraction.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'https://main-light.eth.linkpool.io'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)
  const fraction = await deployContract(
    wallet,
    Fraction,
    [
      '0xe32be33e46706831412606D948b5E8B240dA4fB0',
      '$QLOUDPLSR',
      '$QLOUDPLSR',
      '1500000000000000000',
      30
    ],
    {
      chainId: process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 0x01, // default to kovan (42)
      gasLimit: 3000000,
      gasPrice: ethers.utils.parseUnits('140', 'gwei')
    }
  )
  console.log('Fractional NFT deployted at:', fraction.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  });