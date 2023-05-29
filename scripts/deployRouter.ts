// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  let factory = "0xB0a39D8306b552B4E58b0a0174d817b8c5F2C91d";
  factory = factory.toLowerCase();
  console.log(factory);
  let WTRM = "0x238F5666A0f12c571B7B3fBd5b5a434146dFa0C5"
  WTRM = WTRM.toLowerCase();
  console.log(WTRM);
  // We get the contract to deploy
  const MorodexRouter02 = await ethers.getContractFactory("MorodexRouter02");
  const morodexRouter02 = await MorodexRouter02.deploy();
  // const morodexRouter02 = await MorodexRouter02.deploy(factory, WTRM);

  await morodexRouter02.deployed();

  console.log("MorodexRouter02 deployed to:", morodexRouter02.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
