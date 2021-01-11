import { ISignedEnvelope, ICommitEnvelope } from './models/ISignedEnvelope'
import { IOpts } from './models/IOpts'
import { Gateway, GatewayOptions, X509Identity, Contract } from '@medisot/fabric-network-ext';
import { Client, User, Proposal, BuildProposalRequest, IdentityContext, Endorsement, EndorsementResponse } from '@medisot/fabric-common-ext'

export class TransactionSubmitter {
    private _opts: any
    // private _clientCred: X509Identity // If multiple gateway connects are needed, this variable is needed
    private _gateway: Gateway
    private _gatewayOpts: GatewayOptions
    private _contract: Contract
    /**
	 * @param {any} opts includes necessary params to connect with 
     * the blockchain network.
     * channelID - Blockchain channel to connect with
     * chaincodeID - Blockchain chaincode to execute
     * ccp - Connection related information of blockchain nodes
	 */
    constructor(opts: any, clientCred: X509Identity) {
        this._opts = opts
        // this._clientCred = clientCred
        this._gateway = new Gateway()
        // IdentityContext
        const user =  User.createUser('client', '', clientCred.mspId, clientCred.credentials.certificate)
        const client = new Client('new client')
        const idx: IdentityContext = client.newIdentityContext(user)
        this._gatewayOpts = {
            identity: clientCred,
            identityContext: idx,
            discovery: { enabled: true, asLocalhost: false },
        };
    }

    /**
     * init Must be called once TransactionSubmitter instance is created
     * It is not inside constructor since this includes async calls
     */
    public async init() {
        await this._gateway.connect(this._opts.ccp, this._gatewayOpts);
        // Get the contract from the network.
        const network = await this._gateway.getNetwork(this._opts.channelID);
        this._contract = network.getContract(this._opts.chaincodeID);
    }

    /**
     * evaluateBySignedEnvelope is called during a blockchain query
     * @param {ISignedEnvelope} signedEnvelope 
     */
    public async evaluateBySignedEnvelope(signedEnvelope :ISignedEnvelope): Promise<Buffer> {
        try {
            return await this._contract.evaluateBySignedEnvelope(signedEnvelope.payload_bytes, signedEnvelope.signature);
         } 
         catch(err) {
            throw err
         }
         finally {
             // this._gateway.disconnect()
         }
    }

    /**
     * endorseBySignedEnvelope is called during step-1 of blockchain invoke
     * @param {ISignedEnvelope} signedEnvelope 
     */
    public async endorseBySignedEnvelope(signedEnvelope :ISignedEnvelope): Promise<Buffer> {
        try {
            return await this._contract.endorseBySignedEnvelope(signedEnvelope.payload_bytes, signedEnvelope.signature);
         } 
         catch(err) {
            throw err
         }
         finally {
             // this._gateway.disconnect()
         }
    }

    /**
     * commitBySignedEnvelope is called during step-2 of blockchain invoke
     * @param {ICommitEnvelope} commitEnvelope 
     */
    public async commitBySignedEnvelope(commitEnvelope :ICommitEnvelope): Promise<Buffer> {
        try {
            return await this._contract.commitBySignedEnvelope(commitEnvelope.payload_bytes, commitEnvelope.signature, commitEnvelope.txId);
         } 
         catch(err) {
            throw err
         }
         finally {
             // this._gateway.disconnect()
         }
    }   

}