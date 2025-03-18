use crowdfunding::interfaces::IStarkRaise;


#[starknet::contract]
mod StarkRaise {
    use crowdfunding::erc20::IERC20DispatcherTrait;
    use core::clone::Clone;
    use crowdfunding::interfaces::IStarkRaise;
    use starknet::{get_caller_address, ContractAddress, get_contract_address, get_block_timestamp};
    use crowdfunding::starkstructs::{Campaign, Donation};
    use crowdfunding::utils::{CampaignID, UserAddress, TokenAddress, DonationID, Amount};
    use crowdfunding::erc20::{IERC20Dispatcher};
    use starknet::storage::Map;
    


    #[storage]
    struct Storage {
        balance: felt252,
        campaigns: Map<CampaignID, Campaign>,
        campaigns_count: u256,
        donations: Map<(CampaignID, DonationID), Donation>,
        guardian: ContractAddress,
    }

    #[generate_trait]
    impl Private of PrivateTrait {
        fn assert_is_guardian(self: @ContractState) {
            let caller = get_caller_address();

            assert(self.guardian.read() == caller, 'Guardian Only');
        }

        fn assert_is_campaign_owner(self: @ContractState, campaign_id: CampaignID) {
            let campaign = self.get_campaign(campaign_id);
            let caller = get_caller_address();

            assert(campaign.owner == caller, 'Campaign Owner Only');
        }
    }

    #[abi(embed_v0)]
    impl StarkRaiseImpl of super::IStarkRaise<ContractState> {
        fn create_campagin(
            ref self: ContractState,
            uuid: u64,
            title: felt252,
            description: ByteArray,
            target: Amount,
            deadline: u64,
            amount_collected: Amount,
            image: ByteArray,
            token_address: TokenAddress
        ) {
            let mut campaign_id = self.campaigns_count.read() + 1;
            let campaign = Campaign {
                id: campaign_id,
                uuid,
                owner: get_caller_address(),
                title,
                description,
                target,
                deadline,
                amount_collected: 0,
                image,
                donations_count: 0,
                token_address,
            };
            self.campaigns.write(campaign_id, campaign);
            self.campaigns_count.write(campaign_id);
        }

        fn get_campaign(self: @ContractState, campaign_id: CampaignID) -> Campaign {
            self.campaigns.read(campaign_id)
        }

        fn donate(
            ref self: ContractState, campaign_id: CampaignID, amount: Amount
        ) { // Donation logic
            let mut campaign = self.get_campaign(campaign_id);
            let mut _campaign = self.get_campaign(campaign_id);
            let caller = get_caller_address();
            let token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: campaign.token_address
            };

            let are_tokens_transfered = token.transferFrom(caller, get_contract_address(), amount);

            if are_tokens_transfered {
                let donation = Donation {
                    donor: caller, amount: amount, date: get_block_timestamp()
                };
                self.donations.write((campaign_id, campaign.donations_count), donation);
                campaign.donations_count += 1;
                campaign.amount_collected += amount;
                _campaign.donations_count += 1;
                _campaign.amount_collected += amount;

                self.campaigns.write(campaign_id, _campaign);
            }
        }

        fn get_donations(
            self: @ContractState, campaign_id: CampaignID
        , page: u256) -> Array<Donation> {
            // assert(page > 0, 'Page Cant be less than 1');
            let mut donations = ArrayTrait::<Donation>::new();
            let campaign = self.get_campaign(campaign_id);
            let total_count = campaign.donations_count;
            let mut counter = 0;

            while (counter < total_count) {
                let donation = self.donations.read((campaign_id, counter));
                donations.append(donation);
                counter += 1;
            };
            // let pagesize = 25;

            // if total_count > 0 {
            //     let start_index = (page - 1) * pagesize + 1;
            //     let mut count = start_index;

            //     loop {
            //         if count > total_count || count > start_index + pagesize - 1 {
            //             break;
            //         }
            //         donations.append(self.donations.read((campaign_id, count)));
            //         count += 1;
            //     }
            // }

            donations
        }

        //Donation Withdrawal
        fn withdraw_donations(ref self: ContractState, campaign_id: CampaignID) {
            let mut campaign = self.campaigns.read(campaign_id);
            let mut _campaign = self.campaigns.read(campaign_id);
            let campaign_amount = campaign.amount_collected;
            let caller = get_caller_address();

            assert(caller == campaign.owner, 'Not the owner');
            assert(campaign.amount_collected >= campaign.target / 2, 'Target not reached');
            assert(get_block_timestamp() > campaign.deadline, 'Campaign ended');

            campaign.amount_collected = 0;
            self.campaigns.write(campaign_id, _campaign);

            IERC20Dispatcher { contract_address: campaign.token_address}
                .transfer(campaign.owner, campaign_amount);


        }


        fn get_campaigns(self: @ContractState) -> Array<Campaign> {
            // assert(page > 0, 'Page Cant be less than 1');
            // let mut campaigns = ArrayTrait::<Campaign>::new();
            // let total_count = self.campaigns_count.read();
            // let pagesize = 25;

            // if total_count > 0 {
            //     let start_index = (page - 1) * pagesize + 1;
            //     let mut count = start_index;

            //     loop {
            //         if count > total_count || count > start_index + pagesize - 1 {
            //             break;
            //         }
            //         campaigns.append(self.campaigns.read(count));
            //         count += 1;
            //     }
            // }

            let campaign_count = self.campaigns_count.read();
            let mut counter = 1;
            let mut campaigns: Array<Campaign> = ArrayTrait::new();

            while (counter <= campaign_count) {
                let campaign = self.campaigns.read(counter);
                campaigns.append(campaign);
                counter += 1;
            };

            campaigns
        }
    }
}
