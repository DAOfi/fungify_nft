// SPDX-License-Identifier: MIT

pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Fraction is ERC20 {
    address public owner;
    ERC721 public nft;
    
    event Fraction(address nft, address owner, string name, string symbol, uint total);
    
    constructor (ERC721 _nft, uint _nftid, string memory _name, string memory _symbol, uint _total) ERC20(_name, _symbol) {
        require(owner != address(0));
        owner = msg.sender;
        nft = _nft;
        
        _nft.transferFrom(msg.sender, address(this), _nftid);
        require(_nft.ownerOf(_nftid) == address(this), "nft transfer failed");
        _mint(msg.sender, _total * (10 ** uint256(decimals())));
        
        emit Fraction(address(nft), address(owner), _name, _symbol, _total);
    }
}

