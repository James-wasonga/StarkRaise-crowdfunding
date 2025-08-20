// import the interface and the dispatcher to be able to interact with the smart contract

use crowdfunding::interfaces::{IStarkRaiseDispatcher, IStarkRaiseDispatcherTrait};
use crowdfunding::starkstructs::{Campaign, Donation};
use crowdfunding::starkraise::StarkRaise;
use core::starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
// import traits and functions from snforge
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
// use contract::erc20::{IERC20DispatcherTrait, IERC20Dispatcher};

// add additionaly the testing utilities
use snforge_std::{start_cheat_caller_address_global, stop_cheat_caller_address_global, load};
// declare and deploy contract and return it's dispatcher
use starknet::{ContractAddress, get_caller_address};

fn deploy() -> IStarkRaiseDispatcher {
    let contract = declare("StarkRaise").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();

    IStarkRaiseDispatcher {contract_address}
    
}



#[test]
fn test_create_campaign() {
    // let contract = deploy('0x'.try_into().unwrap());
    let contract = deploy();
    let caller: ContractAddress = starknet::contract_address_const::<'0x'>();
    start_cheat_caller_address_global(caller);
    contract.create_campagin(1_u64, 'Robot',"This is a robot app", 1000000_u256, 172800_u64, 0_u256, "image_url", caller, "Education");
    let campaign: Campaign = contract.get_campaign(1_u256);

    assert_eq!(campaign.title, 'Robot', "campaign title mismatch");
    assert_eq!(campaign.description, "This is a robot app", "Wrong description");
    assert_eq!(campaign.target, 1000000, "Wrong Target amount");
    assert_eq!(campaign.deadline, 172800, "Deadlie mismatch");
    assert_eq!(campaign.amount_collected, 0 , "Wrong Amount collected");
    assert_eq!(campaign.image, "image_url", "Wrong Image");

}

#[test]
fn test_donate() {
    let contract = deploy();
    let caller: ContractAddress = starknet::contract_address_const::<'0x'>();
    start_cheat_caller_address_global(caller);
    contract.donate(1_u256, 100000_u256);
    let donate: Array<Donation> = contract.get_donations(1_u256, 1_u256);

    assert_eq!(donate.len(), 1, "Donation amount mismatch");

}
 
#[test]
fn test_withdraw_donations() {
    let contract = deploy();
    let caller: ContractAddress = starknet::contract_address_const::<'0x'>();
    start_cheat_caller_address_global(caller);
    contract.withdraw_donations(1_u256, 100000_u256);
    let campaign: Campaign = contract.get_campaign(1_u256);

    assert_eq!(campaign.amount_collected, 100000, "Wrong Amount collected after withdraw");

    stop_cheat_caller_address_global();
}

