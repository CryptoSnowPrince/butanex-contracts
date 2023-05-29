// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/**
 * @title MORODEX (MDEX), ERC-20 token, 18, 1,000,000,000
 * @notice Inherit from the ERC20Permit, allowing to sign approve off chain
 */
contract MoroDex is ERC20Permit {
    constructor(string memory _name, string memory _symbol, uint256 _supply) ERC20(_name, _symbol) ERC20Permit(_name) {
        _mint(msg.sender, _supply);
    }
}
