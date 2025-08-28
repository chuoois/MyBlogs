import React, { useState, useEffect } from "react";
import { LogOut, Info, Folder, FileText, Trash2, Edit, Plus, Save, X } from "lucide-react";
import adminService from "../../services/admin.services"; 

export const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("about");

  const menuItems = [
    { id: "about", title: "About Me", icon: <Info className="w-5 h-5" /> },
    { id: "project", title: "Project", icon: <Folder className="w-5 h-5" /> },
    { id: "blog", title: "Blog", icon: <FileText className="w-5 h-5" /> },
    { id: "logout", title: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  // === ABOUT ME STATE ===
  const [aboutme, setAboutme] = useState([]);
  const [aboutIsEditing, setAboutIsEditing] = useState(false);
  const [aboutIsCreating, setAboutIsCreating] = useState(false);
  const [aboutFormData, setAboutFormData] = useState({
    id: null,
    descriptions: "",
    skill_tag: [],
    skill_card: [],
    created_at: new Date().toISOString(),
  });

  // === PROJECTS STATE ===
  const [projects, setProjects] = useState([]);
  const [projectIsEditing, setProjectIsEditing] = useState(false);
  const [projectIsCreating, setProjectIsCreating] = useState(false);
  const [projectEditId, setProjectEditId] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    id: null,
    title: "",
    description: "",
    technologies: [],
    github_url: "",
    live_url: "",
    image_url: "",
    created_at: new Date().toISOString(),
  });

  // === BLOGS STATE ===
  const [blogs, setBlogs] = useState([]);
  const [blogIsEditing, setBlogIsEditing] = useState(false);
  const [blogIsCreating, setBlogIsCreating] = useState(false);
  const [blogEditId, setBlogEditId] = useState(null);
  const [blogFormData, setBlogFormData] = useState({
    id: null,
    title: "",
    content: "",
    summary: "",
    tags: [],
    image_url: "",
    published: false,
    created_at: new Date().toISOString(),
  });

  // === FETCH DATA ===
  useEffect(() => {
    if (activeMenu === "about") fetchAboutme();
    if (activeMenu === "project") fetchProjects();
    if (activeMenu === "blog") fetchBlogs();
  }, [activeMenu]);

  const fetchAboutme = async () => {
    try {
      const data = await adminService.aboutme.getAll();
      setAboutme(data);
    } catch (error) {
      console.error("❌ Lỗi fetch About Me:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await adminService.projects.getAll();
      setProjects(data);
    } catch (error) {
      console.error("❌ Lỗi fetch Projects:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const data = await adminService.blogs.getAll();
      setBlogs(data);
    } catch (error) {
      console.error("❌ Lỗi fetch Blogs:", error);
    }
  };

  // === ABOUT ME HANDLERS ===
  const handleAboutCreate = async () => {
    try {
      const newItem = await adminService.aboutme.create(aboutFormData);
      setAboutme([newItem.data]);
      setAboutIsCreating(false);
      resetAboutForm();
    } catch (error) {
      console.error("❌ Lỗi tạo About Me:", error);
    }
  };

  const handleAboutUpdate = async () => {
    try {
      await adminService.aboutme.update(aboutFormData.id, aboutFormData);
      fetchAboutme();
      setAboutIsEditing(false);
      resetAboutForm();
    } catch (error) {
      console.error("❌ Lỗi update About Me:", error);
    }
  };

  const handleAboutDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa About Me?")) {
      try {
        await adminService.aboutme.delete(id);
        setAboutme([]);
      } catch (error) {
        console.error("❌ Lỗi delete About Me:", error);
      }
    }
  };

  const resetAboutForm = () => {
    setAboutFormData({
      id: null,
      descriptions: "",
      skill_tag: [],
      skill_card: [],
      created_at: new Date().toISOString(),
    });
  };

  // === PROJECT HANDLERS ===
  const handleProjectCreate = async () => {
    try {
      const newProject = await adminService.projects.create(projectFormData);
      setProjects([...projects, newProject.data]);
      setProjectIsCreating(false);
      resetProjectForm();
    } catch (error) {
      console.error("❌ Lỗi tạo Project:", error);
    }
  };

  const handleProjectUpdate = async () => {
    try {
      await adminService.projects.update(projectFormData.id, projectFormData);
      fetchProjects();
      setProjectIsEditing(false);
      setProjectEditId(null);
      resetProjectForm();
    } catch (error) {
      console.error("❌ Lỗi update Project:", error);
    }
  };

  const handleProjectDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa Project này?")) {
      try {
        await adminService.projects.delete(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error("❌ Lỗi delete Project:", error);
      }
    }
  };

  const resetProjectForm = () => {
    setProjectFormData({
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

  // === BLOG HANDLERS ===
  const handleBlogCreate = async () => {
    try {
      const newBlog = await adminService.blogs.create(blogFormData);
      setBlogs([...blogs, newBlog.data]);
      setBlogIsCreating(false);
      resetBlogForm();
    } catch (error) {
      console.error("❌ Lỗi tạo Blog:", error);
    }
  };

  const handleBlogUpdate = async () => {
    try {
      await adminService.blogs.update(blogFormData.id, blogFormData);
      fetchBlogs();
      setBlogIsEditing(false);
      setBlogEditId(null);
      resetBlogForm();
    } catch (error) {
      console.error("❌ Lỗi update Blog:", error);
    }
  };

  const handleBlogDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa Blog này?")) {
      try {
        await adminService.blogs.delete(id);
        setBlogs(blogs.filter(b => b.id !== id));
      } catch (error) {
        console.error("❌ Lỗi delete Blog:", error);
      }
    }
  };

  const resetBlogForm = () => {
    setBlogFormData({
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

  // === LOGOUT ===
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-6 text-center font-bold text-2xl border-b border-gray-200 text-blue-600">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "logout") {
                  handleLogout();
                } else {
                  setActiveMenu(item.id);
                }
              }}
              className={`flex items-center w-full p-3 rounded-lg transition-all duration-200 ${
                activeMenu === item.id 
                  ? "bg-blue-100 text-blue-700 shadow-md" 
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {item.icon}
              <span className="ml-3 font-medium">{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* ABOUT ME PAGE */}
        {activeMenu === "about" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">About Me Management</h1>
            </div>

            {/* Create Button */}
            {aboutme.length === 0 && !aboutIsCreating && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Chưa có thông tin About Me</p>
                <button
                  onClick={() => setAboutIsCreating(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} /> Tạo About Me
                </button>
              </div>
            )}

            {/* Create Form */}
            {aboutIsCreating && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Tạo About Me mới</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Mô tả về bản thân..."
                      value={aboutFormData.descriptions}
                      onChange={(e) =>
                        setAboutFormData({ ...aboutFormData, descriptions: e.target.value })
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
                      value={aboutFormData.skill_tag.join(", ")}
                      onChange={(e) =>
                        setAboutFormData({
                          ...aboutFormData,
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
                      value={aboutFormData.skill_card
                        .map((c) => `${c.title}-${c.detail}`)
                        .join("; ")}
                      onChange={(e) =>
                        setAboutFormData({
                          ...aboutFormData,
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
                      onClick={handleAboutCreate}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} /> Lưu
                    </button>
                    <button
                      onClick={() => {
                        setAboutIsCreating(false);
                        resetAboutForm();
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <X size={16} /> Hủy
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Display/Edit About */}
            {aboutme.length > 0 && aboutIsEditing ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Chỉnh sửa About Me</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      value={aboutFormData.descriptions}
                      onChange={(e) =>
                        setAboutFormData({ ...aboutFormData, descriptions: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Tags</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={aboutFormData.skill_tag.join(", ")}
                      onChange={(e) =>
                        setAboutFormData({
                          ...aboutFormData,
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
                      value={aboutFormData.skill_card
                        .map((c) => `${c.title}-${c.detail}`)
                        .join("; ")}
                      onChange={(e) =>
                        setAboutFormData({
                          ...aboutFormData,
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
                      onClick={handleAboutUpdate}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} /> Lưu thay đổi
                    </button>
                    <button
                      onClick={() => {
                        setAboutIsEditing(false);
                        resetAboutForm();
                      }}
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
                        setAboutFormData(item);
                        setAboutIsEditing(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit size={16} /> Chỉnh sửa
                    </button>
                    <button
                      onClick={() => handleAboutDelete(item.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 size={16} /> Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* PROJECT PAGE */}
        {activeMenu === "project" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Project Management</h1>
              {!projectIsCreating && (
                <button
                  onClick={() => setProjectIsCreating(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} /> Tạo Project mới
                </button>
              )}
            </div>

            {/* Create Project Form */}
            {projectIsCreating && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Tạo Project mới</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tên dự án"
                      value={projectFormData.title}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Mô tả dự án"
                      value={projectFormData.description}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, description: e.target.value })
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
                      value={projectFormData.technologies.join(", ")}
                      onChange={(e) =>
                        setProjectFormData({
                          ...projectFormData,
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
                      value={projectFormData.image_url}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, image_url: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://github.com/..."
                      value={projectFormData.github_url}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, github_url: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://..."
                      value={projectFormData.live_url}
                      onChange={(e) =>
                        setProjectFormData({ ...projectFormData, live_url: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleProjectCreate}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Save size={16} /> Lưu
                  </button>
                  <button
                    onClick={() => {
                      setProjectIsCreating(false);
                      resetProjectForm();
                    }}
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
                  {projectIsEditing && projectEditId === project.id ? (
                    // Edit Form
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Project</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={projectFormData.title}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, title: e.target.value })
                            }
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={3}
                            value={projectFormData.description}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, description: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={projectFormData.technologies.join(", ")}
                            onChange={(e) =>
                              setProjectFormData({
                                ...projectFormData,
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
                            value={projectFormData.image_url}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, image_url: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                          <input
                            type="url"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={projectFormData.github_url}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, github_url: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Live Demo URL</label>
                          <input
                            type="url"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={projectFormData.live_url}
                            onChange={(e) =>
                              setProjectFormData({ ...projectFormData, live_url: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={handleProjectUpdate}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <Save size={16} /> Lưu thay đổi
                        </button>
                        <button
                          onClick={() => {
                            setProjectIsEditing(false);
                            setProjectEditId(null);
                            resetProjectForm();
                          }}
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
                              onClick={() => {
                                setProjectFormData(project);
                                setProjectIsEditing(true);
                                setProjectEditId(project.id);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Edit size={14} /> Sửa
                            </button>
                            <button
                              onClick={() => handleProjectDelete(project.id)}
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

              {projects.length === 0 && !projectIsCreating && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Chưa có project nào</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* BLOG PAGE */}
        {activeMenu === "blog" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Blog Management</h1>
              {!blogIsCreating && (
                <button
                  onClick={() => setBlogIsCreating(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} /> Tạo Blog mới
                </button>
              )}
            </div>

            {/* Create Blog Form */}
            {blogIsCreating && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Tạo Blog mới</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tiêu đề bài viết"
                      value={blogFormData.title}
                      onChange={(e) =>
                        setBlogFormData({ ...blogFormData, title: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      placeholder="Tóm tắt nội dung bài viết"
                      value={blogFormData.summary}
                      onChange={(e) =>
                        setBlogFormData({ ...blogFormData, summary: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={8}
                      placeholder="Nội dung chi tiết bài viết..."
                      value={blogFormData.content}
                      onChange={(e) =>
                        setBlogFormData({ ...blogFormData, content: e.target.value })
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
                        value={blogFormData.tags.join(", ")}
                        onChange={(e) =>
                          setBlogFormData({
                            ...blogFormData,
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
                        placeholder="https://..."
                        value={blogFormData.image_url}
                        onChange={(e) =>
                          setBlogFormData({ ...blogFormData, image_url: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      checked={blogFormData.published}
                      onChange={(e) =>
                        setBlogFormData({ ...blogFormData, published: e.target.checked })
                      }
                    />
                    <label htmlFor="published" className="ml-2 text-sm font-medium text-gray-700">
                      Xuất bản ngay
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleBlogCreate}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save size={16} /> Lưu
                    </button>
                    <button
                      onClick={() => {
                        setBlogIsCreating(false);
                        resetBlogForm();
                      }}
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
                  {blogIsEditing && blogEditId === blog.id ? (
                    // Edit Form
                    <div className="p-6">
                      <h2 className="text-xl font-semibold mb-4">Chỉnh sửa Blog</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={blogFormData.title}
                            onChange={(e) =>
                              setBlogFormData({ ...blogFormData, title: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Tóm tắt</label>
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={2}
                            value={blogFormData.summary}
                            onChange={(e) =>
                              setBlogFormData({ ...blogFormData, summary: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                          <textarea
                            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={8}
                            value={blogFormData.content}
                            onChange={(e) =>
                              setBlogFormData({ ...blogFormData, content: e.target.value })
                            }
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              value={blogFormData.tags.join(", ")}
                              onChange={(e) =>
                                setBlogFormData({
                                  ...blogFormData,
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
                              value={blogFormData.image_url}
                              onChange={(e) =>
                                setBlogFormData({ ...blogFormData, image_url: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="editPublished"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            checked={blogFormData.published}
                            onChange={(e) =>
                              setBlogFormData({ ...blogFormData, published: e.target.checked })
                            }
                          />
                          <label htmlFor="editPublished" className="ml-2 text-sm font-medium text-gray-700">
                            Xuất bản
                          </label>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={handleBlogUpdate}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Save size={16} /> Lưu thay đổi
                          </button>
                          <button
                            onClick={() => {
                              setBlogIsEditing(false);
                              setBlogEditId(null);
                              resetBlogForm();
                            }}
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
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              blog.published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {blog.published ? 'Đã xuất bản' : 'Nháp'}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setBlogFormData(blog);
                                setBlogIsEditing(true);
                                setBlogEditId(blog.id);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              <Edit size={14} /> Sửa
                            </button>
                            <button
                              onClick={() => handleBlogDelete(blog.id)}
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

              {blogs.length === 0 && !blogIsCreating && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Chưa có blog nào</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};