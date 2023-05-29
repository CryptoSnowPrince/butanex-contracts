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

  // We get the contract to deploy

  const _feeToSetter = "0x1e3cc205a642Ad3E94746Dd3e232dBc9c40d0395";
  const MorodexFactory = await ethers.getContractFactory("MorodexFactory");
  const morodexFactory = await MorodexFactory.deploy(_feeToSetter);

  await morodexFactory.deployed();

  console.log("MorodexFactory deployed to:", morodexFactory.address);

  const pairCodeHash = await morodexFactory.pairCodeHash();
  console.log("pairCodeHash:", pairCodeHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
