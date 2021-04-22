pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @title QLOUDPLSR ERC721 Token
 * This implementation includes all the required and some optional functionality of the ERC721 standard
 * Moreover, it includes approve all functionality using operator terminology
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract NFT is ERC721 {
    constructor() ERC721("$QLOUDPLSR", "$QLOUDPLSR") {
    	for(uint i=1; i<=30; i++) {
            _mint(msg.sender, i);
    	}
    }

     /**
     * @dev OVERRIDE Base URI for computing {tokenURI}.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://relay.daofi-api.com/qloudpleasr/";
    }
}