import { Client, User, Proposal, BuildProposalRequest, IdentityContext, Endorsement, EndorsementResponse, Channel } from '/home/osboxes/github.com/prasanths96/fabric-sdk-node/fabric-common'
import { IWallet } from './models/IWallet'
import { ITransactionInfo } from './models/ITransactionInfo'
import { ISubmitterClient } from './models/ISubmitterClient'
// Must be imported from transaction-submitter SDK later
import { ISignedEnvelope, ICommitEnvelope } from 'transaction-submitter'
import { computeHash } from './utils/crypto-utils'
import { parseJSONBuffers } from './utils/parse-utils'

interface GenerateCommitParams {
    endorseResponse: Buffer 
    channel: Channel
    chaincodeId: string
    idx: IdentityContext
    action: any
}

export class TransactionInitiator {
    private _submitter: ISubmitterClient
    /**
	 * @param {ISubmitterClient} submitter check models/ISubmitterClient.ts for info
	 */
    constructor(submitter: ISubmitterClient) {
        this._submitter = submitter
    }

   public async invoke(wallet: IWallet, txInfo: ITransactionInfo): Promise<Buffer> {
    try {
        const signedEnvelopeInternal = await this.generateProposal(wallet, txInfo)
        // Convert to Buffer
        const signedEnvelope: ISignedEnvelope = {
            payload_bytes: signedEnvelopeInternal.payload_bytes,
            signature: signedEnvelopeInternal.signature,
        }
        const envelopeBuffer = Buffer.from(JSON.stringify(signedEnvelope))
        const endorseResponsesBuffer = await this._submitter.endorseBySignedEnvelope(envelopeBuffer)
        const commitParams: GenerateCommitParams = {
            endorseResponse: endorseResponsesBuffer,
            channel: signedEnvelopeInternal.extra.channel,
            chaincodeId: txInfo.chaincodeId,
            idx: signedEnvelopeInternal.extra.identityContext,
            action: signedEnvelopeInternal.extra.action,
        }
        const genCommit = await this.generateCommit(wallet, commitParams)
        // Convert to Buffer
        const commitEnvelope: ICommitEnvelope = {
            payload_bytes: genCommit.payload_bytes,
            signature: genCommit.signature,
            txId: signedEnvelopeInternal.extra.txId,
        }
        const cEnvelopeBuffer = Buffer.from(JSON.stringify(commitEnvelope))
        const resultPayload = await this._submitter.commitBySignedEnvelope(cEnvelopeBuffer)

        return genCommit.extras.responsePayload

    }
    catch(err) {
        throw err
    }
   }

   public async query(wallet: IWallet, txInfo: ITransactionInfo): Promise<Buffer> {
       try {
            const signedEnvelopeInternal = await this.generateProposal(wallet, txInfo)
            // Convert to Buffer
            const signedEnvelope: ISignedEnvelope = {
                payload_bytes: signedEnvelopeInternal.payload_bytes,
                signature: signedEnvelopeInternal.signature,
            }
            const envelopeBuffer = Buffer.from(JSON.stringify(signedEnvelope))
            const resultPayload = await this._submitter.evaluateBySignedEnvelope(envelopeBuffer)
            return resultPayload
        } 
        catch(err) {
            throw err
        }
   }

    private async generateProposal(wallet: IWallet, txInfo: ITransactionInfo): Promise<any> {
    try {
            // Client
            const client = new Client('new client')
            // User
            const userOpts = {
                name: 'unknownUser', // We do not care about username
                pass:'',
                mspid: wallet.mspId,
                signedCertPEM: wallet.cert,
            }
            const user = User.createUser(userOpts.name, userOpts.pass, userOpts.mspid, userOpts.signedCertPEM)
            // IdentityContext
            const idx = client.newIdentityContext(user)
            const identityContext = idx.calculateTransactionId()
            // Channel
            const channel = client.newChannel(txInfo.channelId)
            // Proposal
            const proposal = new Proposal(txInfo.chaincodeId, channel)

            // Building proposal
            this.verifyTransactionName(txInfo.funcName) 
            const qualifiedName = this.getQualifiedName(txInfo.funcName)
            const buildProposalRequest = this.newBuildProposalRequest(qualifiedName, txInfo.args)

            // Payload & its hash
            const proposalBytes = proposal.build(identityContext, buildProposalRequest)
            const digest = computeHash(proposalBytes)
            // Sign it
            const signatureBytes = await wallet.sign(digest)

            // Meta-data required for invoke
            const action = proposal.getAction()
            const txId = proposal.getTransactionId()

            const signedEnvelope = {
                payload_bytes: proposalBytes,
                signature: signatureBytes,
                extra: {
                    txId: txId,
                    action: action,
                    identityContext: identityContext,
                    channel: channel
                }
            }
            return signedEnvelope   
        }
        catch(err) {
            throw err
        }
    }

    private async generateCommit(wallet: IWallet, params: GenerateCommitParams): Promise<any> {
        try {
            // Parse the endorseResponse
            let endorsementResponses: EndorsementResponse[] = JSON.parse(params.endorseResponse.toString())
            if (endorsementResponses.length == 0) {
                throw new Error('no endorsement response received by initiator')
            }
            // Parse Buffers inside json object 
            for ( let i = 0; i < endorsementResponses.length; i ++){
                // @ts-ignore
                endorsementResponses[i] = parseJSONBuffers(endorsementResponses[i])
            }
        
            // Endorsement
            const endorsement = new Endorsement(params.chaincodeId, params.channel)
            endorsement.setAction(params.action)
            endorsement.setProposalResponses(endorsementResponses)

            // Commit
            const commit = endorsement.newCommit();    
            
            // Building commit
            const commitBytes = commit.build(params.idx);
            const digest = computeHash(commitBytes)
            // Sign it
            const signatureBytes = await wallet.sign(digest)
            const signedEnvelope = {
                payload_bytes: commitBytes,
                signature: signatureBytes,
                extras: {
                    responsePayload: endorsementResponses[0].response.payload,
                }
            };
        
            return signedEnvelope
        }
        catch(err) {
            throw err
        }
    
    }

     
    /**
     * Ensure transaction name is a non-empty string.
     * @private
     * @param {string} name Transaction name.
     * @throws {Error} if the name is invalid.
     */
    private verifyTransactionName(name: string): void {
        if (typeof name !== 'string' || name.length === 0) {
            const msg = `Transaction name must be a non-empty string: ${name}`
            throw new Error(msg)
        }
    }

    // Transaction name / function name
    // Namespace is nothing
    private getQualifiedName(name: string): string {
        // return (this.namespace ? `${this.namespace}:${name}` : name)
        return (null ? `namespacegoeshere:${name}` : name)
    }

    // TODO transient!!
    private newBuildProposalRequest(fullyQualifiedFuncName: string, args: string[]): BuildProposalRequest {
        const request: BuildProposalRequest = {
            fcn: fullyQualifiedFuncName,
            args: args,
            generateTransactionId: false
        }
        // if (this.transientMap) {
        //     request.transientMap = this.transientMap
        // }
        return request
    }


}