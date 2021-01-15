import { TransactionInitiator, IWallet, ITransactionInfo, ISubmitterClient } from 'transaction-initiator'
import { TransactionSubmitter, IOpts, IDiscoveryOpts } from 'transaction-submitter'
import { X509Identity } from '@medisot/fabric-network-ext'
import { CryptoSigner } from 'crypto-signer'

import ccp from './ccp' 
import { registerUser, enrollUser } from './ca'

// Globally sharing user id for signer to use
let userIdentity: X509Identity

async function main() {
   //  Register and get Client Identity
    const clientIdentity = await registerUser('admin', 'adminpw') // NOTE: ClientID needs to have admin rights
    console.log('clientIdentity: ', clientIdentity)

    // Submitter Client
    const submitterOpts: IOpts = {
        channelID: ccp.channelId,
        chaincodeID: ccp.chaincodeId,
        ccp: ccp,
        discoveryOpts: {
            enabled: false,
            asLocalhost: false,  // NOTE: change this to false when using actual URL (other than localhost)
        },
        gatewayAutoDisconnect: false,  // NOTE: when this is set to false, submitter.disconnect() must be called at the end.
    } 
    const submitter = new TransactionSubmitter(submitterOpts, clientIdentity)
    await submitter.init()
    const submitterClient: ISubmitterClient = submitter


    // Register and get user Identity
    userIdentity = await registerUser('user', 'userpw')
    console.log('userIdentity: ', userIdentity)

    // Initiator
    const initiator = new TransactionInitiator(submitterClient)

    // User wallet
    const signer: IWallet = {
        cert: userIdentity.credentials.certificate, // PEM encoded
        mspId: 'Org1MSP',
        sign: signFunc,
    }


    let startTime = new Date()
    const txInfoi: ITransactionInfo = {
        channelId: ccp.channelId,
        chaincodeId: ccp.chaincodeId,
        funcName: 'TransferAsset',
        args: ['asset1', 'Pras2'], // Change the 2nd arg to different name, to see that it gets changed in the following query
    }
    console.log('\n')
    console.log('Invoking...', txInfoi)
    var result = await initiator.invoke(signer, txInfoi)
    console.log('Result: ', result.toString())

    const txInfoq: ITransactionInfo = {
        channelId: ccp.channelId,
        chaincodeId: ccp.chaincodeId,
        funcName: 'ReadAsset',
        args: ['asset1'],
    }
    console.log('\n')
    console.log('Querying...', txInfoq)
    var result = await initiator.query(signer, txInfoq)
    console.log('Result: ',result.toString())
    let endTime = new Date()

    // Final disconnect
    submitter.disconnect()
    console.log('\n')
    // @ts-ignore
    console.log("Finished in.. ", (endTime-startTime) , "ms")

}


let signFunc = async function (msg : string) : Promise<Buffer> {
    const pemKey = userIdentity.credentials.privateKey
    const signer = new CryptoSigner()
    const signature = signer.signECDSAp256(msg, pemKey)
    return signature
}


main()