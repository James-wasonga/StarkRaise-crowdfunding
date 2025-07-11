use starknet::ContractAddress;

pub type CampaignID = u256;
pub type DonationID = u256;
pub type Amount = u256;
pub type UserAddress = ContractAddress;
pub type TokenAddress = ContractAddress;

// //NEW: Add Category enum
// #[derive(Copy, Serde, Drop, starknet::Store)]
// pub enum Category {
//     Education,
//     Tooling,
//     Gaming,
//     DeFi,
//     NFT,
//     Infrustructure,
//     Social,
//     Other,
// }
