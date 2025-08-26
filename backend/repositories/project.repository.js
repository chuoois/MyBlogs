const connection = require("../configs/connectDB");
const ProjectModel = require("../models/project.model");

class ProjectRepository {
  static async findAll() {
    try {
      const sql = `SELECT * FROM ${ProjectModel.table} ORDER BY created_at DESC`;
      const [rows] = await connection.promise().query(sql);
      return rows || [];
    } catch (err) {
      throw err;
    }
  }

  static async create(data) {
    try {
      const sql = `INSERT INTO ${ProjectModel.table} (title, descriptions, frontend_backend_tag, readme) VALUES (?, ?, ?, ?)`;
      const [result] = await connection.promise().query(sql, [
        data.title,
        data.descriptions,
        JSON.stringify(data.frontend_backend_tag || []),
        data.readme,
      ]);
      return { id: result.insertId, ...data };
    } catch (err) {
      throw err;
    }
  }

  static async update(id, data) {
    try {
      const sql = `UPDATE ${ProjectModel.table} SET title = ?, descriptions = ?, frontend_backend_tag = ?, readme = ? WHERE id = ?`;
      const [result] = await connection.promise().query(sql, [
        data.title,
        data.descriptions,
        JSON.stringify(data.frontend_backend_tag || []),
        data.readme,
        id,
      ]);
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    try {
      const sql = `DELETE FROM ${ProjectModel.table} WHERE id = ?`;
      const [result] = await connection.promise().query(sql, [id]);
      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = ProjectRepository;
