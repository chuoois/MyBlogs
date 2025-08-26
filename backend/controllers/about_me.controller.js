const AboutmeRepository = require('../repositories/about_me.repository');

class AboutmeController {
    // GET all
    static async getAll(req, res) {
        try {
            const abouts = await AboutmeRepository.findAll();
            if (!abouts.length) {
                return res.status(404).json({ message: 'Không có dữ liệu About Me' });
            }
            res.status(200).json(abouts);
        } catch (error) {
            console.error("❌ Lỗi getAll:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // POST create
    static async create(req, res) {
        try {
            const { descriptions, skill_tag, skill_card } = req.body;
            if (!descriptions) {
                return res.status(400).json({ message: 'descriptions là bắt buộc' });
            }
            const newAbout = await AboutmeRepository.create({ descriptions, skill_tag, skill_card });
            res.status(201).json({ message: 'Thêm thành công', data: newAbout });
        } catch (error) {
            console.error("❌ Lỗi create:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // PUT update
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { descriptions, skill_tag, skill_card } = req.body;

            if (!descriptions) {
                return res.status(400).json({ message: 'descriptions là bắt buộc' });
            }

            const updated = await AboutmeRepository.update(id, { descriptions, skill_tag, skill_card });
            if (!updated) {
                return res.status(404).json({ message: 'Không tìm thấy bản ghi để cập nhật' });
            }

            res.status(200).json({ message: 'Cập nhật thành công' });
        } catch (error) {
            console.error("❌ Lỗi update:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    // DELETE
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await AboutmeRepository.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Không tìm thấy bản ghi để xóa' });
            }
            res.status(200).json({ message: 'Xóa thành công' });
        } catch (error) {
            console.error("❌ Lỗi delete:", error);
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }
}

module.exports = AboutmeController;
