import { expect } from "chai";
import { ethers } from "hardhat";

import sendNativeAndERC20Abi from "../artifacts/contracts/SendNativeAndERC20.sol/SendNativeAndERC20.json"

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract } from "ethers";

let accountList: SignerWithAddress[];
let sendNativeAndERC20: Contract;
let list: string[];

before(async function () {

    accountList = await ethers.getSigners();
    const provider = ethers.provider
    // sendNativeAndERC20 = new ethers.Contract("0x007b9B2A96204E0852C84280bCCF7F4e11eDa565", sendNativeAndERC20Abi.abi, this.provider)

    this.SendNativeAndERC20 = await ethers.getContractFactory("SendNativeAndERC20");
    sendNativeAndERC20 = await this.SendNativeAndERC20.deploy();
    await sendNativeAndERC20.deployed();

    list = [
        "0x90be9043A6603c0458dfbD4a1442372C599DC777",
        "0x90be9043A6603c0458dfbD4a1442372C599DC777",
        "0x3Cc26212500aA1BB56321f1af536Ee13C99CB97B",
        "0x66B0beacE85679Cafb5b2547E4D12dF1011285C9",
        "0xF3f0047E29BA07D836cf0D7ac66d1ACc8fB6364A",
        "0x17F75d271C398b421A724941F0535aA085ff66C7",
        "0x29Ad90f272e426dBdA88967217e59036dC75878B",
        "0x0c55D090FeF42290f2923ae68D65ffF360F0A382",
        "0x4de585565CF5Bd61c9E36d0703cdbd904AF67C01",
        "0xd0D1e5DefC268Ab02C758f358ABb5bBCD7D58211",
        "0x859FfdFc6f8B737Ff408e7B9c088306E818Da4B2",
        "0x6EC638CDB4E520a579f1FA7a658DCDb5DB536a19",
        "0xdAddB4726E79f1C4e7cE3808cA112e87d7F3d744",
        "0x5Aa330F6c14277a075d1BABE2098aAD2C3746ab7",
        "0x4ea63f37B578B56729c4Cb0FF227bc12A2eaA415",
        "0x6d1a46c498c9f1D4a38bF6bc91B396D166328a40",
        "0x5dD12737769e7986B85bd40f5aeD75901C0FFB49",
        "0xd51afE8d099dC8C3413d9971faC905530Ba591bB",
        "0x0dae660De2999A5dec11509eeF53aAeC97B828E5",
        "0xaf88327f636d3E8bB23E154196a4c5E9DD737B5A",
        "0x4ab5f276C7827c0b48fc406EF6f520E7309a3D29",
        "0x2A458960468a374C0FFB70b9AD18F92908cC0f73",
        "0x3dd28fBC97f0414Aa6c09a6930A8d5D3D59C4e3E",
        "0xCBa191eE5eB259f4E7455115d692e17C2f3C9BFb",
        "0x85EFFbe046e92788355d0B23bA9B76c7D7d60692",
        "0x71824c8e0aFB9351b44a03331b6E81FF31B62b39",
        "0xcb61564D4493dC6FcD7C3CBcdcFF2023A9AD947c",
        "0xc32e9c976989638537eE8b436B41204e9317fd89",
        "0x2b2240f6eB4A44069A2Bd6b3EF3C3d931D5c2f06",
        "0x69875030678eCA0E8d42eEe2ac2276661fDe766e",
        "0xA6E221dA5362C61Ae507Ac55c9F7Ca8eA595835d",
        "0x6E10A082764c15961e36f90940349e1BB83fF90c",
        "0xb59a5351ff89db23EbF5DcAe398574e71742E338",
        "0x27FAe591eE4a2F9159e1031412d8FD41d1838681",
        "0x25Cb614f98Ce2d0fB7b74F28BC3EE1249b8c80e0",
        "0xbE8C4616E090cB890470499A16e4f2F44742861C",
        "0xc6623caBFA2D72D1174A3891beF7a28E9408f344",
        "0xF8Fe2080a6370B569599e1a98AD59Fa8c5851cf0",
        "0xA220298F5248d933F5B93F694E4b45efb5403fB7",
        "0x5caf9A3d2eA892532cB9819ee190Af3A049A128f"
    ];
})

describe("ETH and ERC20 Transfer", function () {

    // it("RBA Transfer", async function () {
    //     console.log("RBA Transfer start");
    //     // expect(await sendNativeAndERC20.connect(accountList[0]).distributeETH(list, { value: ethers.utils.parseEther("2") }))
    //     //     .to.emit(sendNativeAndERC20, "LogDistributeETH")

    //     console.log("RBA Transfer end");
    // });


    it("withdrawETH Test1", async function () {
        console.log("withdrawETH start");

        await expect(sendNativeAndERC20.connect(accountList[0]).withdrawETH(accountList[0].address, 0))
            .to.emit(sendNativeAndERC20, "LogWithdrawalETH")


        console.log("withdrawETH end");
    });
});
