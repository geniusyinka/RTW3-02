//SPDX-License-Identifier: Unlicense

//contracts/BuyMeACoffee.sol

pragma solidity ^0.8.4;

//Contract address on Goerli: --

contract BuyMeACoffee {
    //Event to emit when a memo is created

    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    //memo struct

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    //address from contract deployer. marked payabe so we can withdraw  to this address later.
    address payable owner;

    //list of all the memos received from coffee purchase
    Memo[] memos;

    constructor() {
        //store address of deployer as payable.
        //funds will be withdrawn here.
        owner = payable(msg.sender);
    }

    /**
     *@dev fetches all stored memos
     */

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /**
     *@dev buy a coffee for owner (sends an ETH tip and leaves a memo)
     *@param _name name of the coffee purchaser
     *@param _message a nice message from the purchaser
     */

    function buyCoffee(string memory _name, string memory _message) public payable {
        //must accept more than 0 ETH for a coffee.
        require(msg.value > 0, "can't buy coffee for free!");

        //add memo to storage
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));

        //emit a NewMemo event with details about the memo
        emit NewMemo(msg.sender, block.timestamp, _name, _message);

        /**
         *@dev send the entire balance stored in contract to owner
         */
    }

    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }
}
