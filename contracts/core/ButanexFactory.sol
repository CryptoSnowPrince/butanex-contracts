// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.8.17;

// contracts
import "./ButanexPair.sol";

// interfaces
import "./interfaces/IButanexFactory.sol";

/**
 * @title ButanexFactory
 * @notice facilitates creation of ButanexPair to swap tokens.
 */
contract ButanexFactory is IButanexFactory {
    bytes32 public constant INIT_CODE_PAIR_HASH = keccak256(abi.encodePacked(type(ButanexPair).creationCode));

    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    ///@inheritdoc IButanexFactory
    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    ///@inheritdoc IButanexFactory
    function createPair(address _tokenA, address _tokenB) external returns (address pair_) {
        require(_tokenA != _tokenB, "Butanex: IDENTICAL_ADDRESSES");
        (address _token0, address _token1) = _tokenA < _tokenB ? (_tokenA, _tokenB) : (_tokenB, _tokenA);
        require(_token0 != address(0), "Butanex: ZERO_ADDRESS");
        require(getPair[_token0][_token1] == address(0), "Butanex: PAIR_EXISTS"); // single check is sufficient
        bytes32 _salt = keccak256(abi.encodePacked(_token0, _token1));
        ButanexPair pair = new ButanexPair{ salt: _salt }();
        pair.initialize(_token0, _token1);
        pair_ = address(pair);
        getPair[_token0][_token1] = pair_;
        getPair[_token1][_token0] = pair_; // populate mapping in the reverse direction
        allPairs.push(pair_);
        emit PairCreated(_token0, _token1, pair_, allPairs.length);
    }

    ///@inheritdoc IButanexFactory
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "Butanex: FORBIDDEN");
        feeTo = _feeTo;
    }

    ///@inheritdoc IButanexFactory
    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, "Butanex: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }
}
