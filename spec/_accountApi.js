const chai = require('chai')
const config = require('../knexfile')
const knex = require('knex')(config)
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { setupServer } = require('../src/server')
const accountModel = require('../src/account.model')
// this enables us to use .should assertions instead of expecct. Personal Preference
chai.should()
let expect = chai.expect
const ACCOUNT_TABLE = require('../src/account.model').ACCOUNT_TABLE
const ACCOUNT_SEQ = 'account_id_seq'
const server = setupServer()

describe('CRM-API', () => {
    let request
    beforeEach(() => {
        request = chai.request(server)
    })
    describe('GET /api/accounts', () => {
        it('should returns all accounts', async () => {
            // expected
            const expected = [
                { id: 1, firstName: 'taro1', lastName: 'nomura' },
                { id: 2, firstName: 'taro2', lastName: 'nomura' },
                { id: 3, firstName: 'taro3', lastName: 'nomura' },
            ]

            //実行
            const res = await request.get('/api/accounts')
            //評価
            JSON.parse(res.text).should.deep.equal(expected)
            //掃除
        })

        it('should returns a account', async () => {
            // expected。JSONデータを手書きする
            const expected = { id: 2, firstName: 'taro2', lastName: 'nomura' }

            //実行
            const res = await request.get('/api/accounts').query({ id: '2' })
            //評価
            JSON.parse(res.text).should.deep.equal(expected)
            //掃除
        })
    })

    describe('POST /api/accounts', () => {
        let createdId = 0
        before(async () => {
            const seq = await knex
                .select({ lastValue: 'last_value' })
                .from(ACCOUNT_SEQ)
                .first()
                .catch(console.error)
            seqbk = seq.lastValue
            console.log('seqbk=' + seqbk)
        })

        after(async () => {
            await knex
                .from(ACCOUNT_TABLE)
                .where('id', createdId)
                .del()
                .catch(console.error)

            console.log('Deleted test account')
        })

        it('should register a account', async () => {
            //SET
            const newAccount = {
                firstName: 'taro5',
                lastName: 'nomura',
                email: 'mail5.com',
            }

            //Exercise
            let res = await request.post('/api/accounts').send(newAccount)
            createdId = res.text

            //Assert
            const testAccount = await knex(ACCOUNT_TABLE)
                .select()
                .where('id', createdId)
                .first()
            expect(testAccount).to.exist
            expect(testAccount.id.toString()).to.eq(createdId)
        })

        it('should return 400 status when register account with registered email', async () => {
            //SET
            const newAccount = {
                firstName: 'taro5',
                lastName: 'nomura',
                email: 'mail5.com',
            }

            //Exercise
            let res = await request.post('/api/accounts').send(newAccount)

            //Assert
            res.should.have.status(400)
            //Teardown
        })
    })

    describe('DELETE /api/accounts/:id', () => {
        let createdId = 2
        before(async () => {
            //処理
        })

        after(async () => {
            //処理
        })

        it('should delete a account', async () => {
            //SET
            const id = 2
            const beforeCount = await knex(ACCOUNT_TABLE)
                .count('*')
                .then((count) => count[0].count)

            //Exercise
            await request.delete('/api/accounts/' + id)

            //Assert
            const afterCount = await knex(ACCOUNT_TABLE)
                .count('*')
                .then((count) => count[0].count)
            expect(beforeCount - afterCount).to.equal(1)
            //Teardown
        })
    })

    describe('PATCH /api/accounts/:id', () => {
        const id = 3

        before(async () => {
            //処理
        })

        after(async () => {
            await knex(ACCOUNT_TABLE)
                .update({
                    last_name: 'nomura',
                })
                .where('id', id)
                .returning('id')
                .then((result) => {
                    console.log('updated test customer')
                })
                .catch(console.error)
        })

        it('should update lastName ', async () => {
            //SET
            //テストデータ準備
            const expected = 'nomuranomura'

            //Exercise
            //patchリクエスト(last_nameだけ更新)
            await request
                .patch('/api/accounts/' + id)
                .send({ lastName: 'nomuranomura' })

            //Assert
            //idからlast_nameを取得
            //変更後last_nameと一致することを確認する
            const updatedAccount = await knex(ACCOUNT_TABLE)
                .select()
                .where('id', id)
                .first()
            const lastName = updatedAccount.last_name
            expect(lastName).to.equal(expected)
            //Teardown
        })
    })
})
