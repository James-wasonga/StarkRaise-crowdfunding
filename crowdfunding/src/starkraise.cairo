use crowdfunding::interfaces::IStarkRaise;


#[starknet::contract]
pub mod StarkRaise {
    use crowdfunding::erc20::IERC20DispatcherTrait;
    use core::clone::Clone;
    use crowdfunding::interfaces::IStarkRaise;
    use starknet::{get_caller_address, ContractAddress, get_contract_address, get_block_timestamp};
    use crowdfunding::starkstructs::{Campaign, Donation};
    use crowdfunding::utils::{CampaignID, UserAddress, TokenAddress, DonationID, Amount }; //NEW: Should Add Category
    use crowdfunding::erc20::{IERC20Dispatcher};
    use starknet::storage::Map;
    


    #[storage]
    struct Storage {
        balance: felt252,
        campaigns: Map<CampaignID, Campaign>,
        campaigns_count: u256,
        donations: Map<(CampaignID, DonationID), Donation>,
        guardian: ContractAddress,
        //NEW: Storage for category indexing 2
        // campaigns_by_category: Map<(Category, u256), CampaignID>,
        // category_counts: Map<category, u256>,
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
            token_address: TokenAddress,
            category: ByteArray //NEW parameter Added
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
                category // Store category
            };
            self.campaigns.write(campaign_id, campaign);
            self.campaigns_count.write(campaign_id);

            // // NEW: Update category indexing
            // let category_count = self.category_counts.read(category);
            // self.campaigns_by_category.write((category, category_count), campaign_id);
            // self.category_counts.write(category, category_count + 1);
            // //END

        }

        fn get_campaign(self: @ContractState, campaign_id: CampaignID) -> Campaign {
            self.campaigns.read(campaign_id)
        }

        // // NEW: ADDED FUNCTION
        // fn get_campaigns_by_category(self: @ContractState, category: Category) -> Array<Campaign> {
        //     let mut campaigns: Array<Campaign> = ArrayTrait::new();
        //     let category_count = self.category_counts.read(category);
        //     let mut counter = 0; 

        //     while (counter < category_count) {
        //         let campaign_id = self.campaigns_by_category.read((category, counter));
        //         let campaign = self.campaigns.read(campaign_id);
        //         campaigns.append(campaign);
        //         counter += 1;
        //     };
        //     campaigns
        // }
        // // END

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
            // assert(page > 0, 'Page Can't be less than 1');
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
        fn withdraw_donations(ref self: ContractState, campaign_id: CampaignID, amount: u256) {
            let mut campaign = self.campaigns.read(campaign_id);
            let mut _campaign = self.campaigns.read(campaign_id);
            let campaign_amount = campaign.amount_collected;
            let caller = get_caller_address();

            assert(caller == campaign.owner, 'Not the owner');
            assert(campaign.amount_collected >= campaign.target / 2, 'Target not reached');
            assert(campaign.amount_collected >= amount, 'Not enough funds to withdraw');
            assert(get_block_timestamp() < campaign.deadline / 1000, 'Campaign ended');

            campaign.amount_collected = campaign.amount_collected - amount;
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
