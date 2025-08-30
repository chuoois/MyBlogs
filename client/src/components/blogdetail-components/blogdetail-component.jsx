import React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import adminService from "../../services/admin.services"

export const BlogDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setLoading(true)
                const blogData = await adminService.blogs.getById(id)
                console.log("Fetched blog data:", blogData)
                setBlog(blogData)
            } catch (err) {
                setError("Không thể tải bài viết. Vui lòng thử lại sau.")
                console.error("Lỗi khi fetch blog:", err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchBlog()
        }
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-white">
                <div className="container mx-auto max-w-4xl px-6 py-24">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="max-w-lg w-full bg-white border rounded-lg shadow p-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Không tìm thấy bài viết"}</h1>
                    <p className="text-gray-600 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto max-w-4xl px-6 py-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center px-3 py-2 text-sm border rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Quay lại
                    </button>
                </div>
            </header>

            {/* Hero Image */}
            {blog.image_url && (
                <div className="relative h-96 overflow-hidden">
                    <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
            )}

            {/* Content */}
            <article className="container mx-auto max-w-4xl px-6 py-12">
                {/* Article Header */}
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

                    {blog.summary && <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.summary}</p>}

                    {/* Tags */}
                    {blog.tags && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {blog.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-8">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{blog.author || "Admin"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(blog.created_at).toLocaleDateString("vi-VN")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>5 phút đọc</span>
                        </div>
                    </div>
                </header>

                {/* Article Content */}
                {blog.content && (
                    <div
                        className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                )}

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <p className="text-sm text-gray-500">
                        Cập nhật lần cuối: {new Date(blog.created_at).toLocaleDateString("vi-VN")}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
                        >
                            <ArrowLeft className="w-4 h-4 inline mr-2" />
                            Quay lại
                        </button>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
                        >
                            Lên đầu trang
                        </button>
                    </div>
                </footer>
            </article>
        </div>
    )
}