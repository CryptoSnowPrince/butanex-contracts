// SPDX-License-Identifier: BUSL-1.1
pragma solidity 0.8.17;

// interfaces
import "../../@openzeppelin/contracts/interfaces/IERC20.sol";
import "../../core/interfaces/IButanexFactory.sol";
import "../../core/interfaces/IButanexSwapCallback.sol";

interface IAutoSwapper is IButanexSwapCallback {
    /**
     * @notice public function for executing swaps on tokens and send them to staking contract will be called from a
     * Butanex Pair on mint and burn, and can be forced call by anyone
     * @param _token0 token to be converted to bex
     * @param _token1 token to be converted to bex
     */
    function executeWork(IERC20 _token0, IERC20 _token1) external;

    /**
     * @notice transfer BEX from here to staking contract
     */
    function transferTokens() external;

    /**
     * @notice return the factory address
     * @return factory address
     */
    function factory() external view returns (IButanexFactory);

    /**
     * @notice return the staking address
     * @return staking address
     */
    function stakingAddress() external view returns (address);

    /**
     * @notice return the butanexToken address
     * @return butanexToken address
     */
    function butanexToken() external view returns (IERC20);
}
