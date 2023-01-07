import {
  createRef,
  MutableRefObject,
  Ref,
  RefObject,
  useMemo,
  useState,
} from "react";
import data from "./pupmos.json";

const sortVals = (vals: any[]) => {
  return vals.sort((a, b) => {
    if (!a.delegations) return 1;
    if (!b.delegations) return -1;
    return +(b.delegations.total_usd || 0) - +(a.delegations.total_usd || 0);
  });
};

data.validator.chains = sortVals(data.validator.chains);

let fetchPromise: Promise<void | CosmosDirectoryValidator> | undefined;

export const useValidators = () => {
  const [sortedVals, setSortedVals] = useState<
    CosmosDirectoryValidator
  >(data as unknown as CosmosDirectoryValidator);
  if (!fetchPromise && typeof window !== "undefined") {
    fetchPromise = fetch("https://validators.cosmos.directory/pupmos")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        data.validator.chains = sortVals(data.validator.chains);
        const rtn = data as unknown as CosmosDirectoryValidator;
        setSortedVals(rtn);
        return rtn;
      });
  } else if (fetchPromise) {
      fetchPromise = fetchPromise.then((data) => {
        console.log('setting')
        if (!data) return data;
        setSortedVals(data);
        return data;
    });
  }
  return sortedVals;
};

export interface CosmosDirectoryValidator {
  repository: Repository;
  validator: Validator;
}

export interface Repository {
  url: string;
  branch: string;
  commit: string;
  timestamp: number;
}

export interface Validator {
  path: string;
  name: Name;
  identity: string;
  total_usd: number;
  total_users: number;
  chains: Chain[];
  profile: Profile;
}

export interface Chain {
  name: string;
  address: string;
  restake: Restake;
  path: string;
  moniker: Name;
  identity: string;
  active: boolean;
  hex_address: string;
  operator_address: string;
  consensus_pubkey: ConsensusPubkey;
  jailed: boolean;
  status: string;
  tokens: string;
  delegator_shares: string;
  description: Description;
  unbonding_height: string;
  unbonding_time: Date;
  commission: Commission;
  min_self_delegation: string;
  rank: number;
  mintscan_image?: string;
  keybase_image: string;
  slashes: any[] | null;
  signing_info: SigningInfo;
  delegations: Delegations;
  services?: Services;
  image: string;
  uptime: number;
  uptime_periods: UptimePeriod[];
  missed_blocks: number;
  missed_blocks_periods: MissedBlocksPeriod[];
  public_nodes: PublicNodes;
  private_nodes: PrivateNodes;
}

export interface Commission {
  commission_rates: CommissionRates;
  update_time: Date;
  rate: number;
}

export interface CommissionRates {
  rate: string;
  max_rate: string;
  max_change_rate: string;
}

export interface ConsensusPubkey {
  "@type": string;
  key: string;
}

export interface Delegations {
  total_tokens: string;
  total_count: number;
  total_tokens_display: number;
  total_usd?: number;
}

export interface Description {
  moniker: Name;
  identity: string;
  website: string;
  security_contact: string;
  details: string;
}

export enum Name {
  Pupmøs = "PUPMØS",
}

export interface MissedBlocksPeriod {
  blocks: number;
  missed: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PrivateNodes {}

export interface PublicNodes {
  rpc: REST[];
  rest: REST[];
}

export interface REST {
  address: string;
  provider: Name;
}

export interface Restake {
  address: string;
  run_time: string;
  minimum_reward: number;
}

export interface Services {
  staking_rewards: StakingRewards;
}

export interface StakingRewards {
  name: Name;
  verified: boolean;
  slug: string;
}

export interface SigningInfo {
  address: string;
  start_height: string;
  index_offset: string;
  jailed_until: Date;
  tombstoned: boolean;
  missed_blocks_counter: string;
}

export interface UptimePeriod {
  blocks: number;
  uptime: number;
}

export interface Profile {
  $schema: string;
  name: Name;
  identity: string;
}
