const ProjectRepository = require('../repositories/project.repository');

class ProjectController {
    // GET all
    static async getAll(req, res) {
        try {
            const projects = await ProjectRepository.findAll();
            if (!projects.length) {
                return res.status(404).json({ message: 'Không có dữ liệu Project' });
            }
            res.status(200).json(projects);
        } catch (error) {
            console.error("❌ Lỗi getAll Project:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // POST create
    static async create(req, res) {
        try {
            const { title, description, technologies, github_url, live_url, image_url, created_at } = req.body;

            if (!title || !description) {
                return res.status(400).json({ message: 'title và description là bắt buộc' });
            }

            const newProject = await ProjectRepository.create({
                title,
                description,
                technologies,
                github_url,
                live_url,
                image_url,
                created_at: created_at || new Date().toISOString(),
            });

            res.status(201).json({ message: 'Thêm Project thành công', data: newProject });
        } catch (error) {
            console.error("❌ Lỗi create Project:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // PUT update
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { title, description, technologies, github_url, live_url, image_url } = req.body;

            if (!title || !description) {
                return res.status(400).json({ message: 'title và description là bắt buộc' });
            }

            const updated = await ProjectRepository.update(id, {
                title,
                description,
                technologies,
                github_url,
                live_url,
                image_url,
            });

            if (!updated) {
                return res.status(404).json({ message: 'Không tìm thấy Project để cập nhật' });
            }

            res.status(200).json({ message: 'Cập nhật Project thành công' });
        } catch (error) {
            console.error("❌ Lỗi update Project:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // DELETE
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await ProjectRepository.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Không tìm thấy Project để xóa' });
            }
            res.status(200).json({ message: 'Xóa Project thành công' });
        } catch (error) {
            console.error("❌ Lỗi delete Project:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}

module.exports = ProjectController;