/**
 * ISignedEnvelope is the expected structure for
 * a transaction proposal (query or 1st step of invoke)
 */
export interface ISignedEnvelope {
    payload_bytes: Buffer
    signature: Buffer
} 

/**
 * ICommitEnvelope is the expected structure for
 * a commit proposal (2nd step of invoke)
 * 
 * It extends ISignedEnvelope
 */
export interface ICommitEnvelope extends ISignedEnvelope {
    txId: string
}