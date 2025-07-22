use crowdfunding::starkstructs::{Campaign, Donation};
use starknet::ContractAddress;
use crowdfunding::utils::{CampaignID, UserAddress, Amount, TokenAddress}; //NEW: should Add Category



#[starknet::interface]
pub trait IStarkRaise<TContractState> {
    fn create_campagin(
        ref self: TContractState,
        uuid: u64,
        title: felt252,
        description: ByteArray,
        target: Amount,
        deadline: u64,
        amount_collected: Amount,
        image: ByteArray,
        token_address: TokenAddress,
        // category: Category // New parameter 
    );
    fn get_campaign(self: @TContractState, campaign_id: CampaignID) -> Campaign;
    fn donate(ref self: TContractState, campaign_id: CampaignID, amount: Amount);
    fn get_donations(self: @TContractState, campaign_id: CampaignID, page: u256) -> Array<Donation>;
    fn withdraw_donations(ref self: TContractState, campaign_id: CampaignID, amount: u256);
    fn get_campaigns(self: @TContractState) -> Array<Campaign>;
    // fn get_campaigns_by_category(self: @TContractState, category: Category) -> Array<Campaign>; //NEW Function
}


// #[starknet::interface]
// pub trait IPrivateStarkRaise<TContractState> {
//     fn edit_fee_token(ref self: TContractState, token_address: ContractAddress);
//     fn edit_verification_fee(ref self: TContractState, fee: u256);
//     fn get_revenue(self: @TContractState) -> u256;
// }