import React, { useState, useEffect } from "react";
import { Info, Trash2, Edit, Plus, Save, X } from "lucide-react";
import adminService from "../../services/admin.services";

export const AboutMe = () => {
  const [aboutme, setAboutme] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    descriptions: "",
    skill_tag: [],
    skill_card: [],
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    fetchAboutme();
  }, []);

  const fetchAboutme = async () => {
    try {
      const data = await adminService.aboutme.getAll();
      setAboutme(data);
    } catch (error) {
      console.error("❌ Lỗi fetch About Me:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const newItem = await adminService.aboutme.create(formData);
      setAboutme([newItem.data]);
      setIsCreating(false);
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi tạo About Me:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await adminService.aboutme.update(formData.id, formData);
      fetchAboutme();
      setIsEditing(false);
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi update About Me:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa About Me?")) {
      try {
        await adminService.aboutme.delete(id);
        setAboutme([]);
      } catch (error) {
        console.error("❌ Lỗi delete About Me:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      descriptions: "",
      skill_tag: [],
      skill_card: [],
      created_at: new Date().toISOString(),
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">About Me Management</h1>
      </div>

      {/* Create Button */}
      {aboutme.length === 0 && !isCreating && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Chưa có thông tin About Me</p>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} /> Tạo About Me
          </button>
        </div>
      )}

      {/* Create Form */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tạo About Me mới</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Mô tả về bản thân..."
                value={formData.descriptions}
                onChange={(e) =>
                  setFormData({ ...formData, descriptions: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Tags (cách nhau bởi dấu phẩy)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="JavaScript, React, Node.js"
                value={formData.skill_tag.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skill_tag: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Cards (title-detail, cách nhau bởi ;)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Frontend-React và TypeScript; Backend-Node.js và MongoDB"
                value={formData.skill_card
                  .map((c) => `${c.title}-${c.detail}`)
                  .join("; ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skill_card: e.target.value.split(";").map((s) => {
                      const [title, detail] = s.split("-");
                      return { title: title?.trim() || "", detail: detail?.trim() || "" };
                    }),
                  })
                }
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={16} /> Lưu
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X size={16} /> Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display/Edit About */}
      {aboutme.length > 0 && isEditing ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Chỉnh sửa About Me</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                value={formData.descriptions}
                onChange={(e) =>
                  setFormData({ ...formData, descriptions: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Tags</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.skill_tag.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skill_tag: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Skill Cards</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.skill_card
                  .map((c) => `${c.title}-${c.detail}`)
                  .join("; ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    skill_card: e.target.value.split(";").map((s) => {
                      const [title, detail] = s.split("-");
                      return { title: title?.trim() || "", detail: detail?.trim() || "" };
                    }),
                  })
                }
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save size={16} /> Lưu thay đổi
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X size={16} /> Hủy
              </button>
            </div>
          </div>
        </div>
      ) : (
        aboutme.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mô tả</h3>
              <p className="text-gray-600 leading-relaxed">{item.descriptions}</p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Skill Tags</h3>
              <div className="flex flex-wrap gap-2">
                {item.skill_tag.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Skill Cards</h3>
              <div className="grid gap-3">
                {item.skill_card.map((card, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800">{card.title}</h4>
                    <p className="text-gray-600 text-sm">{card.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setFormData(item);
                  setIsEditing(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit size={16} /> Chỉnh sửa
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={16} /> Xóa
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};