export default {
    channelId: 'mychannel',
    chaincodeId: 'basic',
    "name": "test-network-org1",
    "version": "1.0.0",
    "client": {
        "organization": "Org1",
        "connection": {
            "timeout": {
                "peer": {
                    "endorser": "300"
                }
            }
        }
    },
    "organizations": {
        "Org1": {
            "mspid": "Org1MSP",
            "peers": [
                "peer0.org1.example.com"
            ],
            "certificateAuthorities": [
                "ca.org1.example.com"
            ]
        }
    },
    "peers": {
        "peer0.org1.example.com": {
            "url": "grpcs://localhost:7051",
            "tlsCACerts": {
                "pem": "-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUW0lVLI1+3k3ymTNRL6QieJBsGd0wCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwMTE1MTU1NzAwWhcNMzYwMTEyMTU1NzAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABGQ3\noWKR060bOx5epwapa582Cz3Zu6Fx3foSuh6p6i6Kqn9/4aLOr4G886g2FVYbffgW\nMWidyJ6d2VqzLy6AYhSjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBTEzSHh9e8kdqcZrZExk4IKcRGeXjAKBggqhkjOPQQD\nAgNHADBEAiARVR5xq0bJN++gCJTXg1H55W6+qGTzVYVQHcSDTwPjxwIgP0kdJzG3\neudF6NQGLeGZaUT6a9A33r29RpT7iuA5alY=\n-----END CERTIFICATE-----"
            },
            "grpcOptions": {
                "ssl-target-name-override": "peer0.org1.example.com",
                "hostnameOverride": "peer0.org1.example.com"
            }
        }
    },
    caHostName: "ca.org1.example.com",
    caOrgMspId: "Org1MSP",
    "certificateAuthorities": {
        "ca.org1.example.com": {
            "url": "https://localhost:7054",
            "caName": "ca-org1",
            "tlsCACerts": {
                "pem": ["-----BEGIN CERTIFICATE-----\nMIICJzCCAc2gAwIBAgIUHQHXjMYiUNnkEcVNjVCzV3qh7xYwCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwMTE0MTY0MzAwWhcNMzYwMTExMTY0MzAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABOOs\n3tksHopGJnELPrp/8QOpInu2l72LXVocTtcA25t57J47yCAGRmpW5K2LzpVEgSmb\nrW4W7n1VRiPcnRPuDtKjRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBT3k0qZHBmHi9iPMn579Ub8YugxNjAKBggqhkjOPQQD\nAgNIADBFAiEAzTxDERDlPgFNjENrwiIJSCFhUDRxiLqWRrzIz22k4DsCIGXsb4iO\nrMbfZHCMlyTU92VXrSJKU0Nu/pZaLOYurteC\n-----END CERTIFICATE-----\n"]
            },
            "httpOptions": {
                "verify": false
            }
        }
    }
    
}

