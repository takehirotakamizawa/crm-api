const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { setupServer } = require('../src/server')
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should()
let expect = chai.expect

const server = setupServer()

describe('Account API Server', () => {
    let request
    beforeEach(() => {
        request = chai.request(server)
    })

    it('should returns all accounts', async () => {
        // expected。JSONデータを手書きする
        const expected = [
            { id: 1, lastName: 'nomura' },
            { id: 2, lastName: 'nomura' },
            { id: 3, lastName: 'nomura' },
        ]

        //実行
        const res = await request.get('/api/accounts')
        //評価
        JSON.parse(res.text).should.deep.equal(expected)
        //掃除
    })

    it('should returns a account', async () => {
        // expected。JSONデータを手書きする
        const expected = { id: 2, lastName: 'nomura' }

        //実行
        const res = await request.get('/api/accounts').query({ id: '2' })
        //評価
        JSON.parse(res.text).should.deep.equal(expected)
        //掃除
    })
})
