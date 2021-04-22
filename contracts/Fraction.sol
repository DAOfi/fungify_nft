// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';
import "./IFractional.sol";

contract Fraction is IFractional, ERC20 {
    ERC721 public nft;
    uint public redeemAmount = 0; // number of erc20 tokens needed to redeem
    uint public remainingNFTs = 0; // keep track of locked NFTs
    uint public totalNFTs = 0;
    uint public nextNFT = 1; // the expected next nft id, we redeem increasing from 1-total
    bool public minted = false;
    
    constructor (
        ERC721 _nft,
        string memory _name, 
        string memory _symbol,
        uint _redeemAmount,
        uint _totalNFTs
    ) ERC20(_name, _symbol) {
        nft = _nft;
        redeemAmount = _redeemAmount;
        totalNFTs = _totalNFTs;
    }

    function fungify(uint[] memory _nftids, uint _total) public override {
        require(minted == false);
        for(uint i=0; i<_nftids.length; i++) {
            nft.transferFrom(msg.sender, address(this), _nftids[i]);
            require(nft.ownerOf(_nftids[i]) == address(this), "nft transfer failed");
            remainingNFTs++;
        }
        require(totalNFTs == remainingNFTs);
        _mint(_msgSender(), _total * (10 ** uint256(decimals())));

        minted = true;
    }

    function redeem(uint _token) public override {
        require(remainingNFTs > 0, "there are no more NFTs to redeem");
        require(_token == nextNFT, "redeem out of order");
        require(balanceOf(msg.sender) >= redeemAmount, "sender does not have enough ERC20s");
        require(nft.ownerOf(_token) == address(this), "nft id not owned by fraction contract");

        remainingNFTs--;
        nextNFT++;

        _transfer(_msgSender(), address(this), redeemAmount); // Burn the erc20 token
        nft.transferFrom(address(this), _msgSender(), _token);
        emit Redeem(_token);
    }
}

