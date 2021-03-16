import { ethers } from 'ethers'
import { deployContract } from 'ethereum-waffle'
import Fraction from '../artifacts/contracts/Fungify.sol/Fraction.json'

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.JSONRPC_URL || 'https://rpc.xdaichain.com'
  )
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || '', provider)
  console.log('Wallet:', wallet.address)
  const router = await deployContract(
    wallet,
    Fraction,
    [
      // factory sokol
      // '0x1F92A85AB6F3aC7eB1F6E1B2114c79a349Fd936f',
      // factory xdai
      '0x408b10d4a4EA307017B647732D7BcE95A3fD76B2',
      // WXDAI on sokol
      // '0x705581f5830Cfd11715020543f5309ADEBdbd074',
      // WXDAI on xdai
      '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d'
    ],
    {
      chainId: process.env.CHAIN_ID ? parseInt(process.env.CHAIN_ID) : 0x4D, // default to sokol (77)
      gasLimit: 9999999,
      gasPrice: ethers.utils.parseUnits('120', 'gwei')
    }
  )
  console.log('Router deployted at:', router.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  });