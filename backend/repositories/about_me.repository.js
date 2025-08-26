const connection = require('../configs/connectDB');
const AboutmeModel = require('../models/about_me.model');

class AboutmeRepository {
    static async findAll() {
        try {
            const sql = `SELECT * FROM ${AboutmeModel.table}`;
            const [rows] = await connection.promise().query(sql);
            return rows || [];
        } catch (err) {
            throw err;
        }
    }

    static async create(data) {
        try {
            const sql = `INSERT INTO ${AboutmeModel.table} (descriptions, skill_tag, skill_card) VALUES (?, ?, ?)`;
            const [result] = await connection.promise().query(sql, [
                data.descriptions,
                JSON.stringify(data.skill_tag || []),
                JSON.stringify(data.skill_card || [])
            ]);
            return { id: result.insertId, ...data };
        } catch (err) {
            throw err;
        }
    }

    static async update(id, data) {
        try {
            const sql = `UPDATE ${AboutmeModel.table} SET descriptions = ?, skill_tag = ?, skill_card = ? WHERE id = ?`;
            const [result] = await connection.promise().query(sql, [
                data.descriptions,
                JSON.stringify(data.skill_tag || []),
                JSON.stringify(data.skill_card || []),
                id
            ]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }

    static async delete(id) {
        try {
            const sql = `DELETE FROM ${AboutmeModel.table} WHERE id = ?`;
            const [result] = await connection.promise().query(sql, [id]);
            return result.affectedRows > 0;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = AboutmeRepository;
