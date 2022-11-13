/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('account').del()
    await knex('account').insert([
        {
            id: 1,
            email: 'mail1.com',
            first_name: 'taro1',
            last_name: 'nomura',
            address: 'tokyo',
            region: 'asia',
            postal_code: '123-456',
            country: 'Japan',
        },
        {
            id: 2,
            email: 'mail2.com',
            first_name: 'taro2',
            last_name: 'nomura',
            address: 'tokyo',
            region: 'asia',
            postal_code: '123-456',
            country: 'Japan',
        },
        {
            id: 3,
            email: 'mail3.com',
            first_name: 'taro3',
            last_name: 'nomura',
            address: 'tokyo',
            region: 'asia',
            postal_code: '123-456',
            country: 'Japan',
        },
    ])
}
