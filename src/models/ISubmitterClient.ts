/**
 * Once the signed transaction proposal / commitment is generated,
 * Submitter interface will be used to forward the
 * proposal / commitment using Submitter interface.
 * 
 * This interface will be implemented by the app dev
 * who may have developed a http/grpc/<anykind> submission server 
 * importing medisot-core-server SDK and exposed endpoints
 * for the functions defined in it.
 */
export interface ISubmitterClient {
    evaluateBySignedEnvelope(signedEnvelope: Buffer): Promise<Buffer> // param - Serialized SignedEnvelope
    endorseBySignedEnvelope(signedEnvelope: Buffer): Promise<Buffer> // param - Serialized SignedEnvelope
    commitBySignedEnvelope(commitEnvelope: Buffer): Promise<Buffer> // param - Serialized CommitEnvelope
}