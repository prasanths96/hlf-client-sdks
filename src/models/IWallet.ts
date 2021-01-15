export interface IWallet {
    cert: string // PEM encoded
    mspId: string
    sign(msg: string): Promise<Buffer> // async function 
}