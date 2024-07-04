export const CONTRACT_ADDRESS = '0x72d68e62bb940a0209ebe3198652eb1453625b9d480d735f58c0cbbcb79508d';
export const ABI = [
    {
        "type": "impl",
        "name": "StarkRaiseImpl",
        "interface_name": "crowdfunding::interfaces::IStarkRaise"
    },
    {
        "type": "struct",
        "name": "core::integer::u256",
        "members": [
            {
                "name": "low",
                "type": "core::integer::u128"
            },
            {
                "name": "high",
                "type": "core::integer::u128"
            }
        ]
    },
    {
        "type": "struct",
        "name": "crowdfunding::starkstructs::Campaign",
        "members": [
            {
                "name": "id",
                "type": "core::integer::u256"
            },
            {
                "name": "uuid",
                "type": "core::integer::u64"
            },
            {
                "name": "owner",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "title",
                "type": "core::felt252"
            },
            {
                "name": "description",
                "type": "core::felt252"
            },
            {
                "name": "target",
                "type": "core::integer::u256"
            },
            {
                "name": "deadline",
                "type": "core::integer::u64"
            },
            {
                "name": "amount_collected",
                "type": "core::integer::u256"
            },
            {
                "name": "image",
                "type": "core::felt252"
            },
            {
                "name": "donations_count",
                "type": "core::integer::u256"
            },
            {
                "name": "token_address",
                "type": "core::starknet::contract_address::ContractAddress"
            }
        ]
    },
    {
        "type": "struct",
        "name": "crowdfunding::starkstructs::Donation",
        "members": [
            {
                "name": "donor",
                "type": "core::starknet::contract_address::ContractAddress"
            },
            {
                "name": "amount",
                "type": "core::integer::u256"
            },
            {
                "name": "date",
                "type": "core::integer::u64"
            }
        ]
    },
    {
        "type": "interface",
        "name": "crowdfunding::interfaces::IStarkRaise",
        "items": [
            {
                "type": "function",
                "name": "create_campagin",
                "inputs": [
                    {
                        "name": "uuid",
                        "type": "core::integer::u64"
                    },
                    {
                        "name": "title",
                        "type": "core::felt252"
                    },
                    {
                        "name": "description",
                        "type": "core::felt252"
                    },
                    {
                        "name": "target",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "deadline",
                        "type": "core::integer::u64"
                    },
                    {
                        "name": "amount_collected",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "image",
                        "type": "core::felt252"
                    },
                    {
                        "name": "token_address",
                        "type": "core::starknet::contract_address::ContractAddress"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_campaign",
                "inputs": [
                    {
                        "name": "campaign_id",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [
                    {
                        "type": "crowdfunding::starkstructs::Campaign"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "donate",
                "inputs": [
                    {
                        "name": "campaign_id",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "amount",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_donations",
                "inputs": [
                    {
                        "name": "campaign_id",
                        "type": "core::integer::u256"
                    },
                    {
                        "name": "page",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::array::Array::<crowdfunding::starkstructs::Donation>"
                    }
                ],
                "state_mutability": "view"
            },
            {
                "type": "function",
                "name": "withdraw_donations",
                "inputs": [
                    {
                        "name": "campaign_id",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [],
                "state_mutability": "external"
            },
            {
                "type": "function",
                "name": "get_campaigns",
                "inputs": [
                    {
                        "name": "page",
                        "type": "core::integer::u256"
                    }
                ],
                "outputs": [
                    {
                        "type": "core::array::Array::<crowdfunding::starkstructs::Campaign>"
                    }
                ],
                "state_mutability": "view"
            }
        ]
    },
    {
        "type": "event",
        "name": "crowdfunding::starkraise::StarkRaise::Event",
        "kind": "enum",
        "variants": []
    }
]