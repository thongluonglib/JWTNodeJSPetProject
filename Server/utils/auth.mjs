
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function generateToken(payload) {
    const token = await jwt.sign(payload, "SECRET_KEY", {
        expiresIn: '1h'
    })
    return token
}

export async function verifyToken(req, res, next) {
    const token = req.headers['authorization'].replace('Bearer ', '');
    if (!token) return res.status(401).json('Unauthorize User')
    try {
        var decodeToken = await jwt.verify(token, "SECRET_KEY", {
            complete: true
        })
        if (!decodeToken.payload?.username) {
            throw new Error();
        }
        // Handler get info here
        if (decodeToken.payload) {
            req.tokenInfo = {
                ...decodeToken.payload
            }
            next()
        }
    }
    catch (err) {
        console.log('error', err)
        return res.status(403).json('Token not valid')

    }
}
export async function hashPassword(payload) {
    const hash = await bcrypt.hashSync(JSON.stringify(payload), 8);
    return hash
}

export async function comparePassword(password, hashPassword) {
    const isCompare = await bcrypt.compareSync(JSON.stringify(password), hashPassword)
    return isCompare
}