import { buildUrl } from "build-url-ts";
import { get, post } from "./helper/api";
import { ethers } from "ethers";

// buildUrl('http://example.com', {
//   path: 'about',
//   hash: 'contact',
//   queryParams: {
//     foo: bar,
//     bar: ['foo', 'bar']
//   }
// });

export type ProofPayloadType = {
  action: string;
  platform: string;
  identity: string;
  public_key: string;
};

export type ProofPayloadResponse = {
  post_content: {
    default: string;
    en_US: string;
    zh_CN: string;
  };
  sign_payload: string;
  uuid: string;
  created_at: string;
};

export type VerifyProofType = {
  action: string;
  platform: string;
  identity: string;
  public_key: string;
  proof_location: string;
  extra: any;
  uuid: string;
  created_at: string;
};

export type RootObject = {
  pagination: Pagination;
  ids: Id[];
};

export type Id = {
  persona: string;
  avatar: string;
  alias: any[];
  last_arweave_id: string;
  activated_at: string;
  proofs: Proof[];
};
export type Proof = {
  platform: string;
  identity: string;
  alt_id: string;
  created_at: string;
  last_checked_at: string;
  is_valid: boolean;
  invalid_reason: string;
};
export type Pagination = {
  total: number;
  per: number;
  current: number;
  next: number;
};

export class NextDotId {
  baseUrl = "https://proof-service.next.id/v1";

  async verifyProofOnTwitter(req: VerifyProofType): Promise<boolean> {
    const url = buildUrl(this.baseUrl, {
      path: "proof",
    });
    const res = await post(url, req);
    return res.status === 201;
  }

  async proofPayload(
    payload: ProofPayloadType
  ): Promise<ProofPayloadResponse | null> {
    const url = buildUrl(this.baseUrl, {
      path: "proof/payload",
    });

    const res = await post<ProofPayloadResponse>(url, payload);
    if (res.status !== 200) {
      return null;
    }

    return res.data;
  }

  async getTwitterProofs(identity: string) {
    const url = buildUrl(this.baseUrl, {
      path: "proof",
      queryParams: {
        platform: "twitter",
        identity: identity,
      },
    });

    console.log(`url: ${url}`);
    const res = await get<RootObject>(url);
    return res.data;
  }

  verifyPublicKey(publicKey: string, ethAddress: string): boolean {
    const kRes = ethers.utils.keccak256(publicKey);
    const derivedEthAddress = kRes.substr(kRes.length - 40);

    return "0x" + derivedEthAddress.toLowerCase() === ethAddress.toLowerCase();
  }
}
