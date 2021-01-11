
import { ISubmitterClient } from './src/models/ISubmitterClient'
import { IWallet } from './src/models/IWallet'
import { ITransactionInfo } from './src/models/ITransactionInfo'

declare module '@medisot/transaction-initiator' {

	class TransactionInitiator {
        constructor(submitter: ISubmitterClient)
        invoke(wallet: IWallet, txInfo: ITransactionInfo): Promise<string>
        query(wallet: IWallet, txInfo: ITransactionInfo): Promise<string>
    }
    
}