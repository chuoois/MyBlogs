import React, { useState, useEffect } from "react"
import { Github, Mail, Phone, Menu, X } from "lucide-react"

export const HomeHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Theo dõi scroll để thêm shadow cho header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Hàm cuộn mượt đến section
  const handleScroll = (e, id) => {
    e.preventDefault()
    const target = document.querySelector(id)
    if (target) {
      target.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false) // Đóng menu mobile sau khi click
    }
  }

  const navItems = [
    { href: "#home", label: "Trang chủ" },
    { href: "#about", label: "Về tôi" },
    { href: "#projects", label: "Dự án" },
    { href: "#blog", label: "Blog" },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-200 ${
        isScrolled ? "shadow-sm border-b border-gray-100" : ""
      }`}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleScroll(e, "#home")}
            className="text-2xl font-bold text-gray-900 hover:text-gray-600 transition-colors cursor-pointer"
          >
            Palala
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleScroll(e, item.href)}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Contact & Social - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/chuoois"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              title="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <div className="relative group">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Liên hệ"
              >
                <Mail className="h-5 w-5" />
              </button>
              
              {/* Contact Dropdown */}
              <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>0986 152 053</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <a
                      href="mailto:bthinh003@gmail.com"
                      className="hover:text-gray-900 transition-colors"
                    >
                      bthinh003@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              ))}
              
              {/* Mobile Contact */}
              <div className="px-4 py-3 border-t border-gray-100 mt-2 space-y-2">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>0986 152 053</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <a
                    href="mailto:bthinh003@gmail.com"
                    className="hover:text-gray-900 transition-colors"
                  >
                    bthinh003@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <Github className="h-4 w-4 text-gray-500" />
                  <a
                    href="https://github.com/chuoois"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}