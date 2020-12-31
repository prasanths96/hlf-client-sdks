
import { ISubmitter } from './models/ISubmitter'

declare module '@medisot/medisot-core-client' {



	class CoreClient {
        constructor(submitter: ISubmitter)
        invoke(wallet: IWallet, txInfo: ITransactionInfo): Promise<string>
        query(wallet: IWallet, txInfo: ITransactionInfo): Promise<string>
    }
    
}