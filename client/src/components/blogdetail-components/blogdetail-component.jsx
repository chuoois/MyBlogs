import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tag } from "@/components/ui/tag"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

// Mock admin service - replace with your actual service
const adminService = {
  blogs: {
    getById: async (id: string) => {
      // Mock blog data - replace with actual API call
      return {
        id: id,
        title: "Hướng dẫn học React từ cơ bản đến nâng cao",
        content: `
          <h2>Giới thiệu về React</h2>
          <p>React là một thư viện JavaScript mạnh mẽ được phát triển bởi Facebook để xây dựng giao diện người dùng. Trong bài viết này, chúng ta sẽ tìm hiểu từ những khái niệm cơ bản nhất của React.</p>
          
          <h3>1. Component là gì?</h3>
          <p>Component trong React là những khối xây dựng cơ bản của ứng dụng. Mỗi component đại diện cho một phần của giao diện người dùng và có thể được tái sử dụng nhiều lần.</p>
          
          <h3>2. JSX Syntax</h3>
          <p>JSX là một phần mở rộng cú pháp cho JavaScript cho phép bạn viết HTML-like syntax trong JavaScript. Điều này giúp việc tạo ra các component trở nên trực quan hơn.</p>
          
          <h3>3. State và Props</h3>
          <p>State là dữ liệu nội bộ của component có thể thay đổi theo thời gian. Props là dữ liệu được truyền từ component cha xuống component con.</p>
          
          <h3>4. Hooks</h3>
          <p>Hooks là các hàm đặc biệt cho phép bạn "hook into" các tính năng của React. useState và useEffect là hai hooks phổ biến nhất.</p>
          
          <h3>Kết luận</h3>
          <p>React là một công cụ mạnh mẽ để xây dựng ứng dụng web hiện đại. Với những kiến thức cơ bản này, bạn đã có thể bắt đầu hành trình học React của mình.</p>
        `,
        summary: "Tìm hiểu React từ những khái niệm cơ bản nhất như Component, JSX, State, Props và Hooks.",
        image_url: "/react-programming-tutorial.png",
        tags: ["React", "JavaScript", "Frontend", "Tutorial"],
        author: "Palala Dev",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
        published: true,
        reading_time: 8,
      }
    },
  },
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const blogData = await adminService.blogs.getById(params.id as string)
        setBlog(blogData)
      } catch (err) {
        setError("Không thể tải bài viết. Vui lòng thử lại sau.")
        console.error("Lỗi khi fetch blog:", err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBlog()
    }
  }, [params.id])

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
      <div className="min-h-screen bg-white">
        <div className="container mx-auto max-w-4xl px-6 py-24">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{error || "Không tìm thấy bài viết"}</h1>
            <p className="text-gray-600 mb-6">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl px-6 py-4">
          <Button onClick={() => router.back()} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </header>

      {/* Hero Image */}
      {blog.image_url && (
        <div className="relative h-96 overflow-hidden">
          <img src={blog.image_url || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <article className="container mx-auto max-w-4xl px-6 py-12">
        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{blog.title}</h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">{blog.summary}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags?.map((tag: string, index: number) => (
              <Tag key={index} variant="blue">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.created_at).toLocaleDateString("vi-VN")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.reading_time} phút đọc</span>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Cập nhật lần cuối: {new Date(blog.updated_at).toLocaleDateString("vi-VN")}
              </p>
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((tag: string, index: number) => (
                  <Tag key={index} variant="default">
                    #{tag}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Lên đầu trang</Button>
            </div>
          </div>
        </footer>
      </article>

      {/* Related Articles Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mock related articles */}
            {[1, 2].map((item) => (
              <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-48 bg-gray-200">
                  <img
                    src={`/related-article.png?height=200&width=400&query=related article ${item}`}
                    alt={`Bài viết liên quan ${item}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Bài viết liên quan số {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">Mô tả ngắn gọn về bài viết liên quan này...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>15/01/2024</span>
                    <span>5 phút đọc</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
