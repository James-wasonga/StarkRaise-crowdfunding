use starknet::ContractAddress;
use crowdfunding::utils::{CampaignID, Amount, UserAddress, DonationID, TokenAddress}; //NEW: Should Add Category


#[derive(Serde, Drop, starknet::Store)]
pub struct Campaign {
    pub id: CampaignID,
    pub uuid: u64,
    pub owner: UserAddress,
    pub title: felt252,
    pub description: ByteArray,
    pub target: Amount,
    pub deadline: u64,
    pub amount_collected: Amount,
    pub image: ByteArray,
    pub donations_count: DonationID,
    pub token_address: TokenAddress,
    // pub category: Category, // NEW field
}

#[derive(Copy, Serde, Drop, starknet::Store)]
pub struct Donation {
    pub donor: UserAddress,
    pub amount: Amount,
    pub date: u64
}