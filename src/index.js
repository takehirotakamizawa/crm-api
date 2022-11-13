const accountModel = require('./account.model')
const { setupServer } = require('./server')

const server = setupServer()

//サーバ起動listen：port process.env.PORT || 3000
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log('Server listening on Port', PORT)
})
