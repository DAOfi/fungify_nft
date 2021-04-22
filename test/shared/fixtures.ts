import Fraction from '../../artifacts/contracts/Fraction.sol/Fraction.json'
import NFT from '../../artifacts/contracts/test/NFT.sol/NFT.json'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat'
import { deployContract } from 'ethereum-waffle'
import { Contract } from 'ethers'

export interface FractionFixture {
  fraction: Contract,
  nft: Contract
}

export async function getFixtureWithParams(
  numberOfEditions: number,
  wallet: SignerWithAddress,
  fromWallet: boolean = true
): Promise<any> {

  const _nft = await ethers.getContractFactory("NFT")

  // deploy tokens
  const nft = await _nft.deploy() 

  const _fraction = await ethers.getContractFactory("Fraction")

  // deploy tokens
  const fraction = await _fraction.deploy(nft.address, 'QLOUDPLSR', 'QLOUDPLSR', '1500000000000000000', '30') 

  return {
    fraction,
    nft
  }
}
