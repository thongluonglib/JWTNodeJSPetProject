import fs from 'fs'
import express from 'express'
import * as utils from './utils/auth.mjs'
import { randomUUID } from 'crypto'
const app = express()
const port = 3000
app.use(express.json())
app.get('/', function (req, res) {
    return res.send('Hello world')
})

app.post('/register', async (req, res) => {
    const userId = randomUUID()
    const token = await utils.generateToken({ userId, username: req.body.username })
    const password = await utils.hashPassword(req.body.password)
    const userInfo = {
        userId: randomUUID(),
        username: req.body.username,
        password,
        token
    }
    // Save file 
    await fs.writeFileSync('auth.json', JSON.stringify(userInfo, null, 2))
    return res.send(userInfo)
})

app.post('/login', async (req, res) => {
    let userInfo = await fs.readFileSync('auth.json', { encoding: 'utf8', flag: 'r' })
    userInfo = JSON.parse(userInfo)
    if (userInfo.username == req.body.username) {
        const isPassword = await utils.comparePassword(req.body.password, userInfo.password)
        if (isPassword) {
            const token = await utils.generateToken({ userId: userInfo.userId, username: userInfo.username })
            return res.send({
                username: userInfo.username,
                token
            })
        }
        return res.send({
            error: "",
            message: "Invalid password"
        })
    }
    return res.send("Login failed")
})

app.get('/get-user-info', utils.verifyToken, async (req, res) => {
    console.log('req.tokenInfo', JSON.stringify(req.tokenInfo, null, 2))
    res.send({
        ...req.tokenInfo
    })
})
app.listen(port, "localhost", () => {
    console.log("Server start port ", port)
})