import { buildUrl } from "build-url-ts";
import { post } from "./helper/api";

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

    console.log(`url: ${url}`);
    const res = await post<ProofPayloadResponse>(url, payload);
    if (res.status !== 200) {
      return null;
    }

    return res.data;
  }
}
