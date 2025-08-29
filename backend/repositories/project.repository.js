const connection = require("../configs/connectDB");
const ProjectModel = require("../models/project.model");

class ProjectRepository {
  // Lấy tất cả project
  static async findAll() {
    try {
      const sql = `SELECT * FROM ${ProjectModel.table} ORDER BY created_at DESC`;
      const [rows] = await connection.promise().query(sql);

      // parse JSON cho technologies (nếu có)
      return rows.map((row) => ({
        ...row,
        technologies: row.technologies ? JSON.parse(row.technologies) : []
      }));
    } catch (err) {
      throw err;
    }
  }

  // Tạo mới project
  static async create(data) {
    try {
      const sql = `
        INSERT INTO ${ProjectModel.table} 
        (title, description, technologies, github_url, live_url, image_url) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.promise().query(sql, [
        data.title,
        data.description,
        JSON.stringify(data.technologies || []),
        data.github_url,
        data.live_url,
        data.image_url
      ]);

      return { id: result.insertId, ...data };
    } catch (err) {
      throw err;
    }
  }

  // Cập nhật project
  static async update(id, data) {
    try {
      const sql = `
        UPDATE ${ProjectModel.table} 
        SET title = ?, description = ?, technologies = ?, github_url = ?, live_url = ?, image_url = ?
        WHERE id = ?
      `;

      const [result] = await connection.promise().query(sql, [
        data.title,
        data.description,
        JSON.stringify(data.technologies || []),
        data.github_url,
        data.live_url,
        data.image_url,
        id
      ]);

      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  // Xoá project
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