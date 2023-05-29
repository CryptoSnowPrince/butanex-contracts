import { expect } from "chai";
import hre, { ethers } from "hardhat";

import { Greeter } from "../typechain"
// import greeterAbi from "../artifacts/contracts/Greeter.sol/Greeter.json"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract } from "ethers";

let accountList: SignerWithAddress[];
// let greeter: Contract;
let greeterContract: Contract;

before(async function () {

    accountList = await ethers.getSigners();
    console.log(accountList.length)
    for (let i = 0; i < accountList.length; i++)
        console.log("## ", accountList[i]);
})

describe("Token Test", function () {

    it("RBA Transfer", async function () {
        console.log("RBA Transfer start");
        console.log("RBA Transfer end");
    });
});
