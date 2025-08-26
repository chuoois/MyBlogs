const connection = require("../configs/connectDB");
const BlogModel = require("../models/blog.model");

class BlogRepository {
  static async findAll() {
    try {
      const sql = `SELECT * FROM ${BlogModel.table} ORDER BY created_at DESC`;
      const [rows] = await connection.promise().query(sql);
      return rows || [];
    } catch (err) {
      throw err;
    }
  }

  static async create(data) {
    try {
      const sql = `INSERT INTO ${BlogModel.table} (title, descriptions, img) VALUES (?, ?, ?)`;
      const [result] = await connection.promise().query(sql, [
        data.title,
        data.descriptions,
        data.img || null,
      ]);
      return { id: result.insertId, ...data };
    } catch (err) {
      throw err;
    }
  }

  static async update(id, data) {
    try {
      const sql = `UPDATE ${BlogModel.table} SET title = ?, descriptions = ?, img = ? WHERE id = ?`;
      const [result] = await connection.promise().query(sql, [
        data.title,
        data.descriptions,
        data.img || null,
        id,
      ]);
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM ${BlogModel.table} WHERE id = ?`;
      const [result] = await connection.promise().query(sql, [id]);
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BlogRepository;
