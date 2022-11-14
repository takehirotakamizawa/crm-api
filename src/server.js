const accountModel = require('./account.model')

const setupServer = () => {
    const express = require('express')
    const app = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    //ルーティング実装
    app.get('/api/accounts', async (req, res) => {
        if (req.query.id) {
            const accounts = await accountModel.getById(req.query.id)
            return res.json(accounts)
        } else if (req.query.email) {
            const accounts = await accountModel.getByEmail(req.query.email)
            return res.json(accounts)
        }
        const accounts = await accountModel.getAll()
        return res.json(accounts)
    })

    app.post('/api/accounts', async (req, res) => {
        const payload = {
            email: req.body.email,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            // address: req.body.address,
            // region: req.body.region,
            // postal_code: req.body.postal_code,
            // country: req.body.country,
        }
        const accounts = await accountModel.getByEmail(payload.email)
        if (accounts) {
            return res.status(400).end()
        }
        const createdId = await accountModel.create(payload)
        return res.send(createdId.toString())
    })

    app.delete('/api/accounts/:id', async (req, res) => {
        const accounts = await accountModel.getById(req.params.id)
        if (accounts) {
            const deletedId = await accountModel.delete(Number(req.params.id))
            return res.send(deletedId.toString())
        }
        return res.status(400).end()
    })

    app.patch('/api/accounts/:id', async (req, res) => {
        const data = {
            last_name: req.body.lastName,
        }
        const updatedId = await accountModel.update(req.params.id, data)
        return res.send('証券口座番号:' + updatedId + 'を更新しました')
    })

    return app
}

module.exports = { setupServer }
