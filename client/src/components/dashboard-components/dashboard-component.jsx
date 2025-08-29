import React, { useState } from "react";
import { LogOut, Info, Folder, FileText } from "lucide-react";
import { AboutMe } from "./aboutme-component";
import { Projects } from "./project-component";
import { Blogs } from "./blog-component";

export const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("about");

  const menuItems = [
    { id: "about", title: "About Me", icon: <Info className="w-5 h-5" /> },
    { id: "project", title: "Project", icon: <Folder className="w-5 h-5" /> },
    { id: "blog", title: "Blog", icon: <FileText className="w-5 h-5" /> },
    { id: "logout", title: "Logout", icon: <LogOut className="w-5 h-5" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "about":
        return <AboutMe />;
      case "project":
        return <Projects />;
      case "blog":
        return <Blogs />;
      default:
        return <AboutMe />;
    }
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
        {renderContent()}
      </main>
    </div>
  );
};