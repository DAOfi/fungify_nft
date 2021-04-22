import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address'
import { expect } from 'chai'
import { BigNumber, Contract } from 'ethers'
import { ethers } from 'hardhat'
import { FractionFixture, getFixtureWithParams } from './shared/fixtures'

const zero = ethers.BigNumber.from(0)
const MaxUint256 = ethers.constants.MaxUint256

let tokenFixture: FractionFixture
let wallet: SignerWithAddress

describe('Fraction Tests:', () => {
  // async function createToken(totalSupply: BigNumber) {
  //   const { artToken } = tokenFixture
  // }

  beforeEach(async function () {
    wallet = (await ethers.getSigners())[0]
    tokenFixture = await getFixtureWithParams(4, wallet, true)
  })

  it('createNFT', async () => {
    const { nft, fraction } = tokenFixture
    const baseSupply = ethers.BigNumber.from(4)

    console.log(nft.address)
    let name = await nft.name()
    expect(await nft.name.call()).to.equal(name)
    console.log(name)
  })

  it('prints have correct uri', async () => {
    const { nft } = tokenFixture
    let uri = 'https://relay.daofi-api.com/qloudpleasr/1'
    expect(await nft.tokenURI(1)).to.equal(uri)
    console.log(await nft.tokenURI(30))
    // expect(await artToken.tokenURI(1)).to.equal(uri)
    // expect(await artToken.tokenURI(2)).to.equal(uri)
    // expect(await artToken.tokenURI(3)).to.equal(uri)
  })

  it('approve nfts to fraction Contract', async () => {
    const { nft, fraction } = tokenFixture
    let uri = 'https://relay.daofi-api.com/qloudpleasr/1'
    for(var i=1; i<=30; i++) {
      await nft.approve(fraction.address, i)
      expect(await nft.getApproved(i)).to.equal(fraction.address)
    }
  })

  it('lock nfts on fraction Contract', async () => {
    const { nft, fraction } = tokenFixture
    let uri = 'https://relay.daofi-api.com/qloudpleasr/1'
    for(var i=1; i<=30; i++) {
      await nft.approve(fraction.address, i)
      expect(await nft.getApproved(i)).to.equal(fraction.address)
    }

    let id_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    await fraction.fungify(id_array, 45)
    for(var i=1; i<=30; i++) {
      expect(await nft.ownerOf(i)).to.equal(fraction.address)
    }
  })

  it('mints correct amount of tokens', async () => {
    const { nft, fraction } = tokenFixture
    let uri = 'https://relay.daofi-api.com/qloudpleasr/1'
    for(var i=1; i<=30; i++) {
      await nft.approve(fraction.address, i)
      expect(await nft.getApproved(i)).to.equal(fraction.address)
    }

    let id_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    await fraction.fungify(id_array, 45)
    expect(await fraction.balanceOf(wallet.address)).to.equal('45000000000000000000')
  })

  it('redeems tokens for nft', async () => {
    const { nft, fraction } = tokenFixture
    expect(await fraction.remainingNFTs()).to.equal(30)
    let uri = 'https://relay.daofi-api.com/qloudpleasr/1'
    for(var i=1; i<=30; i++) {
      await nft.approve(fraction.address, i)
      expect(await nft.getApproved(i)).to.equal(fraction.address)
    }

    let id_array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    await fraction.fungify(id_array, 45)
    expect(await nft.ownerOf(30)).to.equal(fraction.address)
    await fraction.redeem(30)
    // expect(await nft.ownerOf(30)).to.equal(wallet.address)
    // expect(await nft.ownerOf(29)).to.equal(fraction.address)
  })
})
