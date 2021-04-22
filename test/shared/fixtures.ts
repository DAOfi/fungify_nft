import ArtToken from '../../artifacts/contracts/QLOUDPLSR.sol/QLOUDPLSR.json'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import "@nomiclabs/hardhat-ethers";
import { ethers } from 'hardhat'
import { deployContract } from 'ethereum-waffle'
import { Contract } from 'ethers'

export interface ArtTokenFixture {
  artToken: Contract
}

export async function getFixtureWithParams(
  numberOfEditions: number,
  wallet: SignerWithAddress,
  fromWallet: boolean = true
): Promise<any> {

  const Token = await ethers.getContractFactory("QLOUDPLSR")

  // deploy tokens
  const artToken = await Token.deploy() 

  return {
    artToken
  }
}
