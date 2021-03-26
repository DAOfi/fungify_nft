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
      '0x67Fd6c648083425D86Fa5dD400A0935f7311b338',
      'REFRACTION',
      'REFRACTION'
    ],
    {
      chainId: process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 0x01, // default to kovan (42)
      gasLimit: 4000000,
      gasPrice: ethers.utils.parseUnits('120', 'gwei')
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