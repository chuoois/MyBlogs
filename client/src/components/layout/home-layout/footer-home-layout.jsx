import React from "react"
import { Github, Mail } from "lucide-react"

export const HomeFooter = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl py-10 md:py-12">
        {/* Grid chính */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Cột 1 */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3 text-base">Về Blog</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Chia sẻ những cảm nhận, trải nghiệm và bài học từ hành trình phát triển các dự án công nghệ.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Giới Thiệu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Liên Hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3 text-base">Chủ Đề</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Cảm Nhận Dự Án
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Kinh Nghiệm Lập Trình
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Thử Thách & Giải Pháp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Công Nghệ Mới
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3 text-base">Kết Nối</h3>
            <p className="text-sm text-slate-600 mb-4">
              Theo dõi mình trên các nền tảng để cập nhật bài viết mới nhất.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <a
                href="https://github.com/chuoois"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center sm:items-center space-x-2 hover:text-slate-800 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="text-sm">Github</span>
              </a>
              <a
                href="mailto:bthinh003@gmail.com"
                className="flex items-center sm:items-center space-x-2 hover:text-red-500 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span className="text-sm">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hàng dưới */}
        <div className="border-t border-slate-200 pt-6 text-center">
          <p className="text-xs md:text-sm text-slate-500">
            © 2025 Blog Cá Nhân • Chia sẻ hành trình lập trình
          </p>
        </div>
      </div>
    </footer>
  )
}
