import { Gateway, GatewayOptions, X509Identity, Contract } from '@medisot/fabric-network-ext'
import { Client, User, IdentityContext } from '@medisot/fabric-common-ext'
import { ISignedEnvelope, ICommitEnvelope } from './models/ISignedEnvelope'
import { IOpts } from './models/IOpts'
import { parseJSONFromBuffer } from './utils/parseJSONBuffer'


export class TransactionSubmitter {
    private _opts: IOpts
    // private _clientCred: X509Identity // If multiple gateway connects are needed, this variable is needed
    private _gateway: Gateway
    private _gatewayOpts: GatewayOptions
    private _contract: Contract
    /**
	 * @param {IOpts} opts includes necessary params to connect with 
     * the blockchain network.
     * channelID - Blockchain channel to connect with
     * chaincodeID - Blockchain chaincode to execute
     * ccp - Connection related information of blockchain nodes
	 */
    constructor(opts: IOpts, clientCred: X509Identity) {
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
            discovery: opts.discoveryOpts,
        }
    }

    /**
     * init Must be called once TransactionSubmitter instance is created
     * It is not inside constructor since this includes async calls
     */
    public async init(): Promise<boolean> {
        try {
            await this._gateway.connect(this._opts.ccp, this._gatewayOpts)
            // Get the contract from the network.
            const network = await this._gateway.getNetwork(this._opts.channelID)
            this._contract = network.getContract(this._opts.chaincodeID)
            return true
        } catch(err) {
            throw err
        }
    }

    /**
     * disconnect must be called before stopping the server, when IOpts.gatewayAutoDisconnect is set to false
     * It will disconnect active gateway connections with blockchain nodes.
     */
    public disconnect(): boolean {
        try {
            this._gateway.disconnect()
            return true
        } catch(err) {
            throw err
        }
    }

    /**
     * evaluateBySignedEnvelope is called during a blockchain query
     * @param {Buffer} signedEnvelopeBuffer 
     */
    public async evaluateBySignedEnvelope(signedEnvelopeBuffer :Buffer): Promise<Buffer> {
        try {
            if (this._opts.gatewayAutoDisconnect && this._opts.gatewayAutoDisconnect === true) {
                await this.init()
            }
            const signedEnvelope: ISignedEnvelope = (parseJSONFromBuffer(signedEnvelopeBuffer) as ISignedEnvelope)
            return await this._contract.evaluateBySignedEnvelope(signedEnvelope.payload_bytes, signedEnvelope.signature)
         } 
         catch(err) {
            throw err
         }
         finally {
            if (this._opts.gatewayAutoDisconnect && this._opts.gatewayAutoDisconnect === true) {
                this.disconnect()
            }
         }
    }

    /**
     * endorseBySignedEnvelope is called during step-1 of blockchain invoke
     * @param {Buffer} signedEnvelopeBuffer 
     */
    public async endorseBySignedEnvelope(signedEnvelopeBuffer :Buffer): Promise<Buffer> {
        try {
            if (this._opts.gatewayAutoDisconnect && this._opts.gatewayAutoDisconnect === true) {
                await this.init()
            }
            const signedEnvelope: ISignedEnvelope = (parseJSONFromBuffer(signedEnvelopeBuffer) as ISignedEnvelope)
            return await this._contract.endorseBySignedEnvelope(signedEnvelope.payload_bytes, signedEnvelope.signature)
         } 
         catch(err) {
            throw err
         }
         finally {
            if (this._opts.gatewayAutoDisconnect && this._opts.gatewayAutoDisconnect === true) {
                this.disconnect()
            }
         }
    }

    /**
     * commitBySignedEnvelope is called during step-2 of blockchain invoke
     * @param {Buffer} commitEnvelopeBuffer 
     */
    public async commitBySignedEnvelope(commitEnvelopeBuffer :Buffer): Promise<Buffer> {
        try {
            if (this._opts.gatewayAutoDisconnect && this._opts.gatewayAutoDisconnect === true) {
                await this.init()
            }
            const commitEnvelope: ICommitEnvelope = (parseJSONFromBuffer(commitEnvelopeBuffer) as ICommitEnvelope)
            return await this._contract.commitBySignedEnvelope(commitEnvelope.payload_bytes, commitEnvelope.signature, commitEnvelope.txId)
         } 
         catch(err) {
            throw err
         }
         finally {
            if (this._opts.gatewayAutoDisconnect && this._opts.gatewayAutoDisconnect === true) {
                this.disconnect()
            }
         }
    }   

}