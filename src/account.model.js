const knex = require('./knex')

const ACCOUNT_TABLE = 'account'

module.exports = {
    ACCOUNT_TABLE,

    /**
     * @param
     * @return {Promise<Array>} A promise that resolves to an array of customers.
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
     * @param {number} id - The customer's id.
     * @return {Promise<Object>} A promise that resolves to the customer that matches the id.
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

    //   /**
    //    * @param {Object} customer - The new customer data to add.
    //    * @return {Promise<number>} A promise that resolves to the id of created customer.
    //    */
    //   create(customer) {
    //     validateRequired(
    //       validateProps(customer)
    //     );
    //     // YOUR CODE HERE
    //     return knex(CUSTOMER_TABLE).insert([{
    //       id: customer.id,
    //       email: customer.email,
    //       first_name: customer.first_name,
    //       last_name: customer.last_name,
    //       address: customer.address,
    //       city: customer.city,
    //       region: customer.region,
    //       postal_code: customer.postal_code,
    //       country: customer.country
    //     }])

    //   },

    //   /**
    //    * @param {number} id - The unique id of the existing customer.
    //    * @param {Object} customer - The customer data to change.
    //    * @return {Promise<number>} A promise that resolves to the id of the updated customer.
    //    */
    //   update(id, customer) {
    //     validateProps(customer);

    //     // YOU CODE HERE
    //     return knex(CUSTOMER_TABLE)
    //       .where({ id: id })
    //       .update({
    //         email: customer.email,
    //         first_name: customer.first_name,
    //         last_name: customer.last_name,
    //         address: customer.address,
    //         city: customer.city,
    //         region: customer.region,
    //         postal_code: customer.postal_code,
    //         country: customer.country
    //       },['id'])
    //       .then((result)=>{
    //         return result[0].id;
    //       });
    //   }
}
