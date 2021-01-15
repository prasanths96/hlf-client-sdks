export default {
    channelId: 'mychannel',
    chaincodeId: 'basic',
    caHostName: "ca.org1.example.com",
    caOrgMspId: "Org1MSP",

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
    "channels": {
        "mychannel": {
            "orderers": [
                "orderer.example.com"
            ],
            "peers": {
                "peer0.org1.example.com": {},
                "peer0.org2.example.com": {}
            }
        }
    },
    "organizations": {
        "Org1": {
            "mspid": "Org1MSP",
            "peers": [
                "peer0.org1.example.com", "peer0.org2.example.com"
            ],
            "certificateAuthorities": [
                "ca.org1.example.com"
            ]
        }
    },
    "peers": {
        "peer0.org1.example.com": {
            "url": "grpcs://publisot.motoreq.co:7051",
            "tlsCACerts": {
                "pem": "-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUCfKPSPqR8eoYJ+SbFYUBdhaA/i4wCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwMTE1MTY1MzAwWhcNMzYwMTEyMTY1MzAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABN8Y\nO8/ryQsK93muFi4PX7rZe4Zj5IfsvIJEOhcZjas4nphV+OwiPm3VfNxAk++1iXoY\nDUpWCnLDcvaONn4sjJ6jRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBSojLum9MQQkyuufTAjN6qWmuYubTAKBggqhkjOPQQD\nAgNHADBEAiAmvMP28NFrM0PahRvFDboQQR6k7A7/E96zKlALxhuEowIgM+jfOr0F\nz6zLzCXyrwciPeu4uwc2E6F5yZ8PwNvbe5I=\n-----END CERTIFICATE-----\n"
            },
            "grpcOptions": {
                "ssl-target-name-override": "peer0.org1.example.com",
                "hostnameOverride": "peer0.org1.example.com"
            }
        },

        "peer0.org2.example.com": {
            "url": "grpcs://publisot.motoreq.co:9051",
            "tlsCACerts": {
                "pem": "-----BEGIN CERTIFICATE-----\nMIICHzCCAcWgAwIBAgIUJZbYjhwJKNkA+aoL2QUDRni+ARwwCgYIKoZIzj0EAwIw\nbDELMAkGA1UEBhMCVUsxEjAQBgNVBAgTCUhhbXBzaGlyZTEQMA4GA1UEBxMHSHVy\nc2xleTEZMBcGA1UEChMQb3JnMi5leGFtcGxlLmNvbTEcMBoGA1UEAxMTY2Eub3Jn\nMi5leGFtcGxlLmNvbTAeFw0yMTAxMTUxNjUzMDBaFw0zNjAxMTIxNjUzMDBaMGwx\nCzAJBgNVBAYTAlVLMRIwEAYDVQQIEwlIYW1wc2hpcmUxEDAOBgNVBAcTB0h1cnNs\nZXkxGTAXBgNVBAoTEG9yZzIuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2NhLm9yZzIu\nZXhhbXBsZS5jb20wWTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAARNK0SzhWTlw2mv\nFcz0BgmNv7s9vTzL+yqe/7O6UmpVX/uTfkvLTqAdKcomWd4rEHBWPUzj22DV3Qmo\nrlK0Pw8To0UwQzAOBgNVHQ8BAf8EBAMCAQYwEgYDVR0TAQH/BAgwBgEB/wIBATAd\nBgNVHQ4EFgQUAfHFYJk2Uw9iAyWvYdUveDxFZMIwCgYIKoZIzj0EAwIDSAAwRQIh\nAInAJ+TTLVw71CWM0QsiBBFzwIMAtBdGzyHKnA4aKUexAiA/+4pMiJlOgnivmGDb\nEk+bmaOMvF1KAz7qv4Ngs9b+pg==\n-----END CERTIFICATE-----\n"
            },
            "grpcOptions": {
                "ssl-target-name-override": "peer0.org2.example.com",
                "hostnameOverride": "peer0.org2.example.com"
            }
        }
    },
    "orderers": {
        "orderer.example.com": {
            "url": "grpcs://publisot.motoreq.co:7050",
            "tlsCACerts": {
                "pem": "-----BEGIN CERTIFICATE-----\nMIICCzCCAbGgAwIBAgIUPjOvsIp8FN4htOCW7nuTFfDOxJ8wCgYIKoZIzj0EAwIw\nYjELMAkGA1UEBhMCVVMxETAPBgNVBAgTCE5ldyBZb3JrMREwDwYDVQQHEwhOZXcg\nWW9yazEUMBIGA1UEChMLZXhhbXBsZS5jb20xFzAVBgNVBAMTDmNhLmV4YW1wbGUu\nY29tMB4XDTIxMDExNTE2NTMwMFoXDTM2MDExMjE2NTMwMFowYjELMAkGA1UEBhMC\nVVMxETAPBgNVBAgTCE5ldyBZb3JrMREwDwYDVQQHEwhOZXcgWW9yazEUMBIGA1UE\nChMLZXhhbXBsZS5jb20xFzAVBgNVBAMTDmNhLmV4YW1wbGUuY29tMFkwEwYHKoZI\nzj0CAQYIKoZIzj0DAQcDQgAEm/DeUEvYLcp5d6IMYQToNkcf9mRQF7pt3bi3cLBQ\nwTgyK8JYQdI8jqbrsgjo1tWz5UlZNfGNkkJGF4fXhzWo56NFMEMwDgYDVR0PAQH/\nBAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8CAQEwHQYDVR0OBBYEFJporuRb+924n7j8\ne7gF6oNUfSz1MAoGCCqGSM49BAMCA0gAMEUCIQDNKyBDo6W9ZR24YqCu7LfvwDtB\n6uP5NxtjOm243os8TAIgEi8QzAukcIsgW9UxytlQK2qHH52yjvjzTu1sQqIddRc=\n-----END CERTIFICATE-----"
            },
            "grpcOptions":  {
                "ssl-target-name-override": "orderer.example.com",
                "grpc.keepalive_timeout_ms": 20000
            }
        }
    },
    "certificateAuthorities": {
        "ca.org1.example.com": {
            "url": "https://publisot.motoreq.co:7054",
            "caName": "ca-org1",
            "tlsCACerts": {
                "pem": ["-----BEGIN CERTIFICATE-----\nMIICJjCCAc2gAwIBAgIUCfKPSPqR8eoYJ+SbFYUBdhaA/i4wCgYIKoZIzj0EAwIw\ncDELMAkGA1UEBhMCVVMxFzAVBgNVBAgTDk5vcnRoIENhcm9saW5hMQ8wDQYDVQQH\nEwZEdXJoYW0xGTAXBgNVBAoTEG9yZzEuZXhhbXBsZS5jb20xHDAaBgNVBAMTE2Nh\nLm9yZzEuZXhhbXBsZS5jb20wHhcNMjEwMTE1MTY1MzAwWhcNMzYwMTEyMTY1MzAw\nWjBwMQswCQYDVQQGEwJVUzEXMBUGA1UECBMOTm9ydGggQ2Fyb2xpbmExDzANBgNV\nBAcTBkR1cmhhbTEZMBcGA1UEChMQb3JnMS5leGFtcGxlLmNvbTEcMBoGA1UEAxMT\nY2Eub3JnMS5leGFtcGxlLmNvbTBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABN8Y\nO8/ryQsK93muFi4PX7rZe4Zj5IfsvIJEOhcZjas4nphV+OwiPm3VfNxAk++1iXoY\nDUpWCnLDcvaONn4sjJ6jRTBDMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAG\nAQH/AgEBMB0GA1UdDgQWBBSojLum9MQQkyuufTAjN6qWmuYubTAKBggqhkjOPQQD\nAgNHADBEAiAmvMP28NFrM0PahRvFDboQQR6k7A7/E96zKlALxhuEowIgM+jfOr0F\nz6zLzCXyrwciPeu4uwc2E6F5yZ8PwNvbe5I=\n-----END CERTIFICATE-----\n"]
            },
            "httpOptions": {
                "verify": false
            }
        }
    }
    
}
