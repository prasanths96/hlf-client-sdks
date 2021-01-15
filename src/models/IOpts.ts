export interface IOpts {
    channelID: string
    chaincodeID: string
    // mspID: string
    ccp: any

    discoveryOpts: IDiscoveryOpts
    // If gatewayAutoDisconnect is false, then the dev 
    // must call TransactionSubmitter.disconnect(), when all requests are served.
    gatewayAutoDisconnect: boolean    
}

export interface IDiscoveryOpts {
    enabled: boolean
    asLocalhost: boolean
}
