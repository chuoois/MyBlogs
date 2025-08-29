const BlogRepository = require('../repositories/blog.repository');

class BlogController {
    // GET all
    static async getAll(req, res) {
        try {
            const blogs = await BlogRepository.findAll();
            if (!blogs.length) {
                return res.status(404).json({ message: 'Không có dữ liệu Blog' });
            }
            res.status(200).json(blogs);
        } catch (error) {
            console.error("❌ Lỗi getAll Blog:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // GET by id
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const blog = await BlogRepository.findById(id);

            if (!blog) {
                return res.status(404).json({ message: 'Không tìm thấy Blog' });
            }

            res.status(200).json(blog);
        } catch (error) {
            console.error("❌ Lỗi getById Blog:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // POST create
    static async create(req, res) {
        try {
            const { title, content, summary, tags, image_url, published, created_at } = req.body;

            if (!title || !content) {
                return res.status(400).json({ message: 'title và content là bắt buộc' });
            }

            const newBlog = await BlogRepository.create({
                title,
                content,
                summary,
                tags,
                image_url,
                published: published ?? false,
                created_at: created_at || new Date().toISOString(),
            });

            res.status(201).json({ message: 'Thêm Blog thành công', data: newBlog });
        } catch (error) {
            console.error("❌ Lỗi create Blog:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // PUT update
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, content, summary, tags, image_url, published } = req.body;

            if (!title || !content) {
                return res.status(400).json({ message: 'title và content là bắt buộc' });
            }

            const updated = await BlogRepository.update(id, {
                title,
                content,
                summary,
                tags,
                image_url,
                published: published ?? false,
            });

            if (!updated) {
                return res.status(404).json({ message: 'Không tìm thấy Blog để cập nhật' });
            }

            res.status(200).json({ message: 'Cập nhật Blog thành công' });
        } catch (error) {
            console.error("❌ Lỗi update Blog:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // DELETE
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await BlogRepository.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Không tìm thấy Blog để xóa' });
            }
            res.status(200).json({ message: 'Xóa Blog thành công' });
        } catch (error) {
            console.error("❌ Lỗi delete Blog:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}

module.exports = BlogController;