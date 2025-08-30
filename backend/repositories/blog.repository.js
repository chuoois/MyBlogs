const connection = require("../configs/connectDB");
const BlogModel = require("../models/blog.model");

class BlogRepository {
  // Lấy tất cả blogs
  static async findAll() {
    try {
      const sql = `SELECT * FROM ${BlogModel.table} ORDER BY created_at DESC`;
      const [rows] = await connection.promise().query(sql);
      return rows || [];
    } catch (err) {
      throw err;
    }
  }

  // Lấy blog theo id
  static async findById(id) {
    try {
      const sql = `SELECT * FROM ${BlogModel.table} WHERE id = ? LIMIT 1`;
      const [rows] = await connection.promise().query(sql, [id]);
      if (rows.length === 0) return null;
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  // Tạo blog
  static async create(data) {
    try {
      const sql = `
        INSERT INTO ${BlogModel.table} 
        (title, content, summary, tags, image_url, published) 
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const [result] = await connection.promise().query(sql, [
        data.title,
        data.content,
        data.summary,
        JSON.stringify(data.tags || []),
        data.image_url || null,
        data.published ? 1 : 0,
      ]);

      return { id: result.insertId, ...data };
    } catch (err) {
      throw err;
    }
  }

  // Cập nhật blog
  static async update(id, data) {
    try {
      const sql = `
        UPDATE ${BlogModel.table} 
        SET title = ?, content = ?, summary = ?, tags = ?, image_url = ?, published = ?
        WHERE id = ?
      `;

      const [result] = await connection.promise().query(sql, [
        data.title,
        data.content,
        data.summary,
        JSON.stringify(data.tags || []),
        data.image_url || null,
        data.published ? 1 : 0,
        id,
      ]);

      return result.affectedRows > 0;
    } catch (err) {
      throw err;
    }
  }

  // Xoá blog
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
