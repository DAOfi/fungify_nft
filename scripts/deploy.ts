import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import Fraction from '../artifacts/contracts/Fraction.sol/Fraction.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'https://kovan.poa.network'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)
  const fraction = await deployContract(
    wallet,
    Fraction,
    [
      '0xc58e705be8d06fe529a698b6b522b98095e4438f',
      'IDMXERC20',
      'IDMXERC20'
    ],
    {
      chainId: process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 0x2A, // default to kovan (42)
      gasLimit: 9999999,
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