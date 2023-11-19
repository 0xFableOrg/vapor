// import { NextDotId, ProofPayloadType, VerifyProofType } from "./next_dot_id";

export * from "./vapor";
export * from "./next_dot_id";

// const nextDotId = new NextDotId();

// const proofPayloadReq: ProofPayloadType = {
//   action: "create",
//   platform: "twitter",
//   identity: "cheechyuanang",
//   public_key:
//     "0372d7f93108f9d48831a3efaaf7ba027ffddb8a098e0a39579699c63a20136e4c",
// };

// nextDotId.proofPayload(proofPayloadReq).then((res) => {
//   console.log(`proofpayload: ${JSON.stringify(res)}`);
// });

// const req: VerifyProofType = {
//   action: "create",
//   platform: "twitter",
//   identity: "cheechyuanang",
//   public_key:
//     "0372d7f93108f9d48831a3efaaf7ba027ffddb8a098e0a39579699c63a20136e4c",
//   proof_location: "1726069990686638282",
//   extra: {},
//   uuid: "f75ff1c8-2df9-4949-b3ab-b9fa7a397caf",
//   created_at: "1700361652",
// };
// nextDotId.verifyProofOnTwitter(req).then((res) => {
//   console.log(`result is ${res}`);
// });
