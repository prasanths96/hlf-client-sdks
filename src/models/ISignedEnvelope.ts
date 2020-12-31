// Should be imported from medisot-core-server later
export interface ISignedEnvelope {
    payload_bytes: Buffer
    signature: Buffer
} 

export interface ICommitEnvelope extends ISignedEnvelope {
    txId: string
}