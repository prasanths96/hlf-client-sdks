import { ISignedEnvelope, ICommitEnvelope } from './models/ISignedEnvelope'
import { X509Identity } from '@medisot/fabric-network-ext';

declare module '@medisot/transaction-submitter' {

	class TransactionSubmitter {
        constructor(opts: any, clientCred: X509Identity)
        init()
        evaluateBySignedEnvelope(signedEnvelope :ISignedEnvelope): Promise<Buffer>
        endorseBySignedEnvelope(signedEnvelope :ISignedEnvelope): Promise<Buffer>
        commitBySignedEnvelope(commitEnvelope :ICommitEnvelope): Promise<Buffer>
    }
    
}