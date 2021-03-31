# fungify_nft

This is an extension to ERC20 that does two primary things.

1. Holds ownership of NFT(s) while minting ERC20 tokens.
  
```
fungify(uint [] nftIDs, uint amountMinted)
```

2. Allows holders of the minted ERC20 tokens to redeem those tokens for the nft(s).

```
redeemTokens()
```

Set the Fungify contracts parameters for redeeming and minting. The following parameters control this process.

```
address NFTContract // the address of the nft that is being fractionalized and redeemed for
uint redeemAmount // the amount of erc20 tokens needed to redeem for an NFT(s)
uint expiry // a date after which redeeming erc20 tokens is not possible (if desired)
uint fee // a fee for redeeming (if desired)
```
