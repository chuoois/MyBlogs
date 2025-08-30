import React, { useState, useEffect } from "react";
import { FileText, Trash2, Edit, Plus, Save, X } from "lucide-react";
import adminService from "../../services/admin.services";

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
    summary: "",
    tags: [],
    image_url: "",
    published: false,
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await adminService.blogs.getAll();
      setBlogs(data);
    } catch (error) {
      console.error("❌ Lỗi fetch Blogs:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const newBlog = await adminService.blogs.create(formData);
      setBlogs([...blogs, newBlog.data]);
      setIsCreating(false);
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi tạo Blog:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await adminService.blogs.update(formData.id, formData);
      fetchBlogs();
      setIsEditing(false);
      setEditId(null);
      resetForm();
    } catch (error) {
      console.error("❌ Lỗi update Blog:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa Blog này?")) {
      try {
        await adminService.blogs.delete(id);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        console.error("❌ Lỗi delete Blog:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      content: "",
      summary: "",
      tags: [],
      image_url: "",
      published: false,
      created_at: new Date().toISOString(),
    });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    setEditId(null);
    resetForm();
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setIsEditing(true);
    setEditId(blog.id);
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_unsigned_preset"); // thay bằng preset của bạn

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/doevh5tms/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Ảnh đã upload:", data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error("❌ Lỗi upload ảnh:", error);
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = await handleUpload(file);
      if (imageUrl) {
        setFormData({ ...formData, image_url: imageUrl });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} /> Tạo Blog mới
          </button>
        )}
      </div>

      {/* Create Blog Form */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tạo Blog mới</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tiêu đề bài viết"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="Tóm tắt nội dung bài viết"
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={8}
                placeholder="Nội dung chi tiết bài viết..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (cách nhau bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="react, javascript, tutorial"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      tags: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Ảnh</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onChange={handleImageChange}
                />
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>

            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
              />
              <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
                Xuất bản ngay
              </label>
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

      {/* Blogs List */}
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {isEditing && editId === blog.id ? (
              // Edit Form
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Blog</h2>
                <div className="space-y-4">
                  <div>
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      value={formData.summary}
                      onChange={(e) =>
                        setFormData({ ...formData, summary: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={8}
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                      <input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.tags.join(", ")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tags: e.target.value.split(",").map((s) => s.trim()),
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
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="editPublished"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({ ...formData, published: e.target.checked })
                      }
                    />
                    <label htmlFor="editPublished" className="ml-2 text-sm font-medium text-gray-700">
                      Xuất bản
                    </label>
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
              // Display Blog
              <div>
                {blog.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                        }`}>
                        {blog.published ? 'Đã xuất bản' : 'Nháp'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit size={14} /> Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={14} /> Xóa
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3 font-medium">{blog.summary}</p>
                  <div className="text-gray-700 mb-4 prose max-w-none">
                    {blog.content.length > 200
                      ? blog.content.substring(0, 200) + '...'
                      : blog.content
                    }
                  </div>

                  {blog.tags.length > 0 && (
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-gray-400">
                    Tạo: {new Date(blog.created_at).toLocaleDateString('vi-VN')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}

        {blogs.length === 0 && !isCreating && (
          <div className="text-center py-12">
            <p className="text-gray-500">Chưa có blog nào</p>
          </div>
        )}
      </div>
    </div>
  );
};