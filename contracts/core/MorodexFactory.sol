// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.8.17;

// contracts
import "./MorodexPair.sol";

// interfaces
import "./interfaces/IMorodexFactory.sol";

/**
 * @title MorodexFactory
 * @notice facilitates creation of MorodexPair to swap tokens.
 */
contract MorodexFactory is IMorodexFactory {
    bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(MorodexPair).creationCode));

    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    ///@inheritdoc IMorodexFactory
    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    ///@inheritdoc IMorodexFactory
    function createPair(address _tokenA, address _tokenB) external returns (address pair_) {
        require(_tokenA != _tokenB, "MoroDex: IDENTICAL_ADDRESSES");
        (address _token0, address _token1) = _tokenA < _tokenB ? (_tokenA, _tokenB) : (_tokenB, _tokenA);
        require(_token0 != address(0), "MoroDex: ZERO_ADDRESS");
        require(getPair[_token0][_token1] == address(0), "MoroDex: PAIR_EXISTS"); // single check is sufficient
        bytes32 _salt = keccak256(abi.encodePacked(_token0, _token1));
        MorodexPair pair = new MorodexPair{ salt: _salt }();
        pair.initialize(_token0, _token1);
        pair_ = address(pair);
        getPair[_token0][_token1] = pair_;
        getPair[_token1][_token0] = pair_; // populate mapping in the reverse direction
        allPairs.push(pair_);
        emit PairCreated(_token0, _token1, pair_, allPairs.length);
    }

    ///@inheritdoc IMorodexFactory
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "MoroDex: FORBIDDEN");
        feeTo = _feeTo;
    }

    ///@inheritdoc IMorodexFactory
    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "MoroDex: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }
}
