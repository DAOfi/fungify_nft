import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { expect } from 'chai'
import { BigNumber, Contract } from 'ethers'
import { ethers } from 'hardhat'
import { ArtTokenFixture, getFixtureWithParams } from './shared/fixtures'

const zero = ethers.BigNumber.from(0)
const MaxUint256 = ethers.constants.MaxUint256

let tokenFixture: ArtTokenFixture
let wallet: SignerWithAddress

describe('ArtToken:', () => {
  // async function createToken(totalSupply: BigNumber) {
  //   const { artToken } = tokenFixture
  // }

  beforeEach(async function () {
    wallet = (await ethers.getSigners())[0]
    tokenFixture = await getFixtureWithParams(4, wallet, true)
  })

  it('createToken', async () => {
    const { artToken } = tokenFixture
    const baseSupply = ethers.BigNumber.from(4)

    console.log(artToken.address)
    let name = await artToken.name()
    expect(await artToken.name.call()).to.equal(name)
    console.log(name)
  })

  it('prints have correct uri', async () => {
    const { artToken } = tokenFixture
    let uri = 'https://relay.daofi-api.com/qloudpleasr/1'
    expect(await artToken.tokenURI(1)).to.equal(uri)
    console.log(await artToken.tokenURI(30))
    // expect(await artToken.tokenURI(1)).to.equal(uri)
    // expect(await artToken.tokenURI(2)).to.equal(uri)
    // expect(await artToken.tokenURI(3)).to.equal(uri)
  })
})

