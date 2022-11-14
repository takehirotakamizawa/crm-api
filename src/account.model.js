const knex = require('./knex')

const ACCOUNT_TABLE = 'account'

module.exports = {
    ACCOUNT_TABLE,

    /**
     * @param
     * @return {Promise<Array>} A promise that resolves to an array of accounts.
     */
    getAll() {
        return knex
            .select({
                id: 'id',
                firstName: 'first_name',
                lastName: 'last_name',
            })
            .from(ACCOUNT_TABLE)
    },

    /**
     * @param {number} id - The account's id.
     * @return {Promise<Object>} A promise that resolves to the account that matches the id.
     */
    getById(id) {
        return knex
            .select({
                id: 'id',
                firstName: 'first_name',
                lastName: 'last_name',
            })
            .from(ACCOUNT_TABLE)
            .where({
                id: id,
            })
            .first()
    },

    /**
     * @param {String} email - The account's id.
     * @return {Promise<Object>} A promise that resolves to the account that matches the id.
     */
    getByEmail(email) {
        return knex
            .select({
                id: 'id',
                firstName: 'first_name',
                lastName: 'last_name',
            })
            .from(ACCOUNT_TABLE)
            .where({
                email: email,
            })
            .first()
    },

    /**
     * @param {Object} account - The new account data to add.
     * @return {Promise<number>} A promise that resolves to the id of created account.
     */
    create(account) {
        return knex(ACCOUNT_TABLE)
            .insert(
                [
                    {
                        id: account.id,
                        email: account.email,
                        first_name: account.first_name,
                        last_name: account.last_name,
                        address: account.address,
                        region: account.region,
                        postal_code: account.postal_code,
                        country: account.country,
                    },
                ],
                ['id']
            )
            .then((result) => {
                return result[0].id
            })
    },

    /**
     * @param {number} id - The new account data to add.
     * @return {Promise<number>} A promise that resolves to the id of created account.
     */
    delete(id) {
        return knex
            .from(ACCOUNT_TABLE)
            .where('id', id)
            .del(['id'])
            .then((result) => {
                return result[0].id
            })
            .catch(console.error)
    },

    /**
     * @param {number} id - The unique id of the existing customer.
     * @param {Object} account - The customer data to change.
     * @return {Promise<number>} A promise that resolves to the id of the updated customer.
     */
    update(id, account) {
        return knex(ACCOUNT_TABLE)
            .where({ id: id })
            .update(
                {
                    last_name: account.last_name,
                },
                ['id']
            )
            .then((result) => {
                return result[0].id
            })
    },
}
