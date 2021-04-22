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
    bool public minted = false;
    
    constructor (
        ERC721 _nft,
        string memory _name, 
        string memory _symbol,
        uint _redeemAmount
    ) ERC20(_name, _symbol) {
        nft = _nft;
        redeemAmount = _redeemAmount * (10 ** uint256(decimals()));
    }

    function fungify(uint[] memory _nftids, uint _total) public virtual override {
        require(minted == false);

        for(uint i=0; i<_nftids.length; i++) {
            nft.transferFrom(msg.sender, address(this), _nftids[i]);
            require(nft.ownerOf(_nftids[i]) == address(this), "nft transfer failed");
            remainingNFTs++;
        }

        _mint(_msgSender(), _total * (10 ** uint256(decimals())));

        minted = true;
    }

    function redeemNFT() public virtual override {
        require(remainingNFTs > 0, "there are no more NFTs to redeem");
        require(balanceOf(msg.sender) >= redeemAmount, "sender does not have enough ERC20s");
        require(nft.ownerOf(remainingNFTs) == address(this), "nft transfer failed");

        remainingNFTs--;

        _transfer(_msgSender(), address(0), redeemAmount); // Burn the erc20 token
        nft.transferFrom(address(this), _msgSender(), remainingNFTs+1);
        emit Redeem(remainingNFTs+1);
    }
}

