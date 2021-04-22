// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev Interface of the Fractional NFT standard as defined in the EIP.
 */
interface IFractional {
    event Redeem(uint nftid);

    function fungify(uint[] memory _nftids, uint _total) external;
    function redeemNFT() external;
}