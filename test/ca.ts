import { CAClient, IUserCredentials } from '@medisot/ca-client'
import ccp from './ccp'
import { X509Identity } from '@medisot/fabric-network-ext'
const adminUserId = 'admin'
const adminUserPasswd = 'adminpw'

const registerUser = async (userId: string, pass?: string):Promise<X509Identity> => {
    try {
        // EnrolAdmin only once, during init phase
        //@ts-ignore
        const caClient = new CAClient(ccp)

        const adminCredentials: IUserCredentials = {
            adminUser: adminUserId,
            adminPass: adminUserPasswd,
        }
        await caClient.init(adminCredentials)

        // Enroll RegisterAndEnroll the users with the caClient object henceforth, without re-enrolling admin everytime
        const identity = await caClient.registerAndEnrollUser(userId, pass)
        return identity
    }
    catch(err){
       if (!err.message.includes('is already registered')) {
            throw err
       }
       // Enrolling if user already registered
       return enrollUser(userId, pass)
    }
}

const enrollUser = async (userId: string, pass: string):Promise<X509Identity> => {
    try {
        // EnrolAdmin only once, during init phase
        //@ts-ignore
        const caClient = new CAClient(ccp)

        const adminCredentials: IUserCredentials = {
            adminUser: adminUserId,
            adminPass: adminUserPasswd,
        }
        await caClient.init(adminCredentials)

        const identity = await caClient.enrollUser(userId, pass)
        return identity
    }
    catch(err){
        throw err
    }
}

export {
    registerUser,
    enrollUser
}