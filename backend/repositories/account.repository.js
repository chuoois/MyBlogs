const connection = require('../configs/connectDB');
const AccountModel = require('../models/account.model');

class AccountRepository {
    static async findByEmail(email) {
        try {
            const sql = `SELECT * FROM ${AccountModel.table} WHERE email = ? LIMIT 1`;
            const [rows] = await connection.promise().query(sql, [email]);
            return rows[0] || null;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AccountRepository;