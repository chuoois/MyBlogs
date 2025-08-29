import React, { useState, useEffect } from "react";
import { Folder, Trash2, Edit, Plus, Save, X } from "lucide-react";
import adminService from "../../services/admin.services";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    technologies: [],
    github_url: "",
    live_url: "",
    image_url: "",
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await adminService.projects.getAll();
      setProjects(data);
    } catch (error) {
      console.error("❌ Lỗi fetch Projects:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const newProject = await adminService.projects.create(formData);
      setProjects([...projects, newProject.data]);
      setIsCreating(false);
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi tạo Project:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await adminService.projects.update(formData.id, formData);
      fetchProjects();
      setIsEditing(false);
      setEditId(null);
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi update Project:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa Project này?")) {
      try {
        await adminService.projects.delete(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error("❌ Lỗi delete Project:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      technologies: [],
      github_url: "",
      live_url: "",
      image_url: "",
      created_at: new Date().toISOString(),
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setEditId(null);
    resetForm();
  };

  const handleEdit = (project) => {
    setFormData(project);
    setIsEditing(true);
    setEditId(project.id);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} /> Tạo Project mới
          </button>
        )}
      </div>

      {/* Create Project Form */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tạo Project mới</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tên dự án"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Mô tả dự án"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies (cách nhau bởi dấu phẩy)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, Node.js, MongoDB"
                value={formData.technologies.join(", ")}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technologies: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">URL hình ảnh</label>
              <input
                type="url"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
              <input
                type="url"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/..."
                value={formData.github_url}
                onChange={(e) =>
                  setFormData({ ...formData, github_url: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
              <input
                type="url"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://..."
                value={formData.live_url}
                onChange={(e) =>
                  setFormData({ ...formData, live_url: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
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
      )}

      {/* Projects List */}
      <div className="grid gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {isEditing && editId === project.id ? (
              // Edit Form
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.technologies.join(", ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          technologies: e.target.value.split(",").map((s) => s.trim()),
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL hình ảnh</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.github_url}
                      onChange={(e) =>
                        setFormData({ ...formData, github_url: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.live_url}
                      onChange={(e) =>
                        setFormData({ ...formData, live_url: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
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
            ) : (
              // Display Project
              <div className="flex">
                {project.image_url && (
                  <div className="w-48 h-32 flex-shrink-0">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit size={14} /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={14} /> Xóa
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{project.description}</p>

                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        GitHub →
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:text-green-800 text-sm font-medium"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Tạo: {new Date(project.created_at).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {projects.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có project nào</p>
          </div>
        )}
      </div>
    </div>
  );
};