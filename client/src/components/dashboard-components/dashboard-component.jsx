import React, { useState } from "react";
import { LogOut, Info, Folder, FileText, Trash2, Edit, Plus } from "lucide-react";

export const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("about");

  const menuItems = [
    { id: "about", title: "About Me", icon: <Info className="w-5 h-5" /> },
    { id: "project", title: "Project", icon: <Folder className="w-5 h-5" /> },
    { id: "blog", title: "Blog", icon: <FileText className="w-5 h-5" /> },
    { id: "logout", title: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  const [aboutme, setAboutme] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    id: 1,
    descriptions: "",
    skill_tag: [],
    skill_card: [],
    created_at: new Date().toISOString(),
  });

  // Save khi create
  const handleCreate = () => {
    setAboutme([formData]);
    setIsCreating(false);
  };

  // Update
  const handleUpdate = () => {
    setAboutme([formData]);
    setIsEditing(false);
  };

  // Delete
  const handleDelete = () => {
    if (window.confirm("Bạn có chắc muốn xóa About Me?")) {
      setAboutme([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-center font-bold text-xl border-b border-gray-200">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-100 ${
                activeMenu === item.id ? "bg-gray-200" : ""
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {activeMenu === "about" && (
          <div>
            <h1 className="text-2xl font-bold mb-4">About Me Page</h1>

            {/* Nếu chưa có dữ liệu → nút Create */}
            {aboutme.length === 0 && !isCreating && (
              <button
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-1 px-3 py-2 border rounded hover:bg-gray-100"
              >
                <Plus size={16} /> Create About Me
              </button>
            )}

            {/* Form Create */}
            {isCreating && (
              <div className="p-4 bg-white shadow rounded-2xl space-y-4">
                <textarea
                  className="w-full border p-2 rounded"
                  rows={4}
                  placeholder="Mô tả bản thân..."
                  value={formData.descriptions}
                  onChange={(e) =>
                    setFormData({ ...formData, descriptions: e.target.value })
                  }
                />

                <div>
                  <label className="font-semibold">Skill Tags (cách nhau bởi dấu phẩy):</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Ví dụ: JavaScript, React, Node.js"
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
                  <label className="font-semibold">Skill Cards (title-detail, cách nhau bởi ;):</label>
                  <input
                    type="text"
                    className="w-full border p-2 rounded"
                    placeholder="Frontend-React; Backend-Node.js"
                    value={formData.skill_card
                      .map((c) => `${c.title}-${c.detail}`)
                      .join("; ")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        skill_card: e.target.value.split(";").map((s) => {
                          const [title, detail] = s.split("-");
                          return { title: title?.trim(), detail: detail?.trim() };
                        }),
                      })
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCreate}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="px-4 py-2 border rounded hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Nếu có dữ liệu */}
            {aboutme.length > 0 &&
              (isEditing ? (
                // Form Edit
                <div className="p-4 bg-white shadow rounded-2xl space-y-4">
                  <textarea
                    className="w-full border p-2 rounded"
                    rows={4}
                    value={formData.descriptions}
                    onChange={(e) =>
                      setFormData({ ...formData, descriptions: e.target.value })
                    }
                  />

                  <div>
                    <label className="font-semibold">Skill Tags (cách nhau bởi dấu phẩy):</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
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
                    <label className="font-semibold">Skill Cards (title-detail, cách nhau bởi ;):</label>
                    <input
                      type="text"
                      className="w-full border p-2 rounded"
                      value={formData.skill_card
                        .map((c) => `${c.title}-${c.detail}`)
                        .join("; ")}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          skill_card: e.target.value.split(";").map((s) => {
                            const [title, detail] = s.split("-");
                            return { title: title?.trim(), detail: detail?.trim() };
                          }),
                        })
                      }
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border rounded hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Hiển thị dữ liệu
                aboutme.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl shadow bg-white border border-gray-200"
                  >
                    <p className="text-gray-700 mb-3">{item.descriptions}</p>

                    <div className="mb-3">
                      <h2 className="font-semibold mb-1">Skill Tags:</h2>
                      <div className="flex flex-wrap gap-2">
                        {item.skill_tag.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full text-sm border bg-gray-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h2 className="font-semibold mb-1">Skill Cards:</h2>
                      <ul className="list-disc pl-5 space-y-1">
                        {item.skill_card.map((card, index) => (
                          <li key={index}>
                            <strong>{card.title}:</strong> {card.detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => {
                          setFormData(item);
                          setIsEditing(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100"
                      >
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-1 px-3 py-1 border rounded hover:bg-gray-100"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                ))
              ))}
          </div>
        )}

        {activeMenu === "project" && (
          <h1 className="text-2xl font-bold">Project Page</h1>
        )}
        {activeMenu === "blog" && (
          <h1 className="text-2xl font-bold">Blog Page</h1>
        )}
        {activeMenu === "logout" && (
          <h1 className="text-2xl font-bold">Logging out...</h1>
        )}
      </main>
    </div>
  );
};
