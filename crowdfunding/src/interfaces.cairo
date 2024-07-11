use crowdfunding::starkstructs::{Campaign, Donation};
use starknet::ContractAddress;
use crowdfunding::utils::{CampaignID, UserAddress, Amount, TokenAddress};



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
        token_address: TokenAddress
    );
    fn get_campaign(self: @TContractState, campaign_id: CampaignID) -> Campaign;
    fn donate(ref self: TContractState, campaign_id: CampaignID, amount: Amount);
    fn get_donations(self: @TContractState, campaign_id: CampaignID, page: u256) -> Array<Donation>;
    fn withdraw_donations(ref self: TContractState, campaign_id: CampaignID);
    fn get_campaigns(self: @TContractState) -> Array<Campaign>;
}


// #[starknet::interface]
// pub trait IPrivateStarkRaise<TContractState> {
//     fn edit_fee_token(ref self: TContractState, token_address: ContractAddress);
//     fn edit_verification_fee(ref self: TContractState, fee: u256);
//     fn get_revenue(self: @TContractState) -> u256;
// }