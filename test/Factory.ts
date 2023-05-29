import { expect } from "chai";
import { ethers } from "hardhat";

import factoryABI from "../artifacts/contracts/MorodexFactory.sol/MorodexFactory.json"
import pairABI from "../artifacts/contracts/MorodexPair.sol/MorodexPair.json"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract } from "ethers";

let accountList: SignerWithAddress[];
let factory: Contract;
let pair: Contract;

before(async function () {
    accountList = await ethers.getSigners();
    const provider = ethers.provider
    factory = new ethers.Contract("0xDe7ab60427914b4d240CE33F200eb17FE6d0B9AA", factoryABI.abi, this.provider)
})

describe("Factory", function () {
    it("Factory pair length", async function() {
        const length = await factory.connect(accountList[0]).allPairsLength();
        console.log(length);

        let pairAddress;
        let token0;
        let token1;
        let totalSupply;
        for(let i = 0; i < length; i++) {
            pairAddress = await factory.connect(accountList[0]).allPairs(i);
            console.log("pair[%d]:", i, pairAddress);
            pair = new ethers.Contract(pairAddress.toString(), pairABI.abi, this.provider)
            token0 = await pair.connect(accountList[0]).token0()
            token1 = await pair.connect(accountList[0]).token1()
            totalSupply = await pair.connect(accountList[0]).totalSupply()
            console.log("  token0: ", token0)
            console.log("  token1: ", token1)
            console.log("  totalSupply: ", ethers.utils.formatEther(totalSupply))
        }
    });
});
