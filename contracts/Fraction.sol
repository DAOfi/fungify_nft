// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./IFractional.sol";

contract Fraction is IFractional, ERC20 {
    address public owner;
    ERC721 public nft;
    bool public locked = false;
    
    constructor (ERC721 _nft, string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        owner = address(0); // Be explicit about no ownership
        nft = _nft;
    }

    function fungify(uint[] memory _nftids, uint _total) public virtual override {
        require(locked == false);

        for(uint i=0; i<_nftids.length; i++) {
            nft.transferFrom(msg.sender, address(this), _nftids[i]);
            require(nft.ownerOf(_nftids[i]) == address(this), "nft transfer failed");
        }

        _mint(msg.sender, _total * (10 ** uint256(decimals())));

        locked = true;
        
        emit Fraction(address(nft), address(owner), name(), symbol(), _total);
    }
}

