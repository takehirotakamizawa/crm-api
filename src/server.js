const accountModel = require('./account.model')

const setupServer = () => {
    const express = require('express')
    const app = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    //ルーティング実装
    app.get('/api/accounts', async (req, res) => {
        console.log('api/accountsが呼ばれた')
        if (req.query.id) {
            console.log('クエリパラメータ:idあり')
            const accounts = await accountModel.getById(req.query.id)
            return res.json(accounts)
        }
        console.log('クエリパラメータ:idなし')
        const accounts = await accountModel.getAll()
        return res.json(accounts)
    })
    return app
}

module.exports = { setupServer }
