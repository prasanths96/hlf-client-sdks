const crypto = require('crypto')

const computeHash = (data: any) => {
	const sha256 = crypto.createHash('sha256')
	return sha256.update(data).digest()
}

export {
    computeHash,
}