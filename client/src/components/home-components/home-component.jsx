import React from "react"
import { useState, useEffect } from "react"
import { Button, Card, Tag, SectionTitle } from "../ui"

export const Home = () => {
const [isVisible, setIsVisible] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typeSpeed, setTypeSpeed] = useState(150)
  
  const dynamicWords = ["Palala", "Công nghệ", "Sáng tạo", "Đam mê"]

  useEffect(() => {
    // Animation khi component mount
    setTimeout(() => setIsVisible(true), 100)
    
    // Typewriter effect
    const handleType = () => {
      const currentWord = dynamicWords[currentWordIndex]
      
      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1))
        setTypeSpeed(50) // Xóa nhanh hơn
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1))
        setTypeSpeed(150) // Gõ chậm hơn
      }
      
      if (!isDeleting && displayText === currentWord) {
        // Dừng lại 1.5s trước khi xóa
        setTimeout(() => setIsDeleting(true), 1500)
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false)
        setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length)
      }
    }
    
    const timer = setTimeout(handleType, typeSpeed)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, currentWordIndex, typeSpeed, dynamicWords])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section với hiệu ứng */}
      <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="space-y-8">
            <div>
              <h1 className={`text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <span className="block overflow-hidden">
                  <span className={`block transition-all duration-700 delay-200 ${
                    isVisible ? 'translate-y-0' : 'translate-y-full'
                  }`}>
                    Chào mừng đến với
                  </span>
                </span>
                <span className="relative inline-block">
                  <span 
                    className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 transition-all duration-700 delay-500 ${
                      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                    style={{
                      animation: 'gradient-x 3s ease infinite',
                      minWidth: '400px',
                      display: 'inline-block'
                    }}
                  >
                    {displayText}
                    {/* Blinking cursor */}
                    <span 
                      className="inline-block w-1 h-full bg-blue-600 ml-1"
                      style={{
                        animation: 'blink 1s infinite',
                        verticalAlign: 'top'
                      }}
                    ></span>
                  </span>
                </span>
              </h1>
              
              <p className={`text-2xl text-gray-600 leading-relaxed max-w-3xl transition-all duration-1000 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <span className="relative">
                  Khám phá thế giới công nghệ qua những dự án sáng tạo và chia sẻ kiến thức lập trình.
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-all duration-1000 delay-1000 scale-x-0"
                    style={{ transform: isVisible ? 'scaleX(1)' : 'scaleX(0)' }}
                  ></span>
                </span>
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Button variant="primary" href="#projects" className="group">
                <span className="mr-2">Xem dự án</span>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" href="#about" className="group">
                <span className="mr-2">Về tôi</span>
                <span className="transform transition-transform group-hover:scale-110">👋</span>
              </Button>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-1/4 right-1/4 opacity-20">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce animation-delay-1000"></div>
            </div>
            <div className="absolute top-3/4 left-1/4 opacity-20">
              <div className="w-6 h-6 bg-purple-500 rounded-full animate-bounce animation-delay-2000"></div>
            </div>
            <div className="absolute top-1/2 right-1/6 opacity-20">
              <div className="w-3 h-3 bg-pink-500 rounded-full animate-bounce animation-delay-3000"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-gray-400 animate-bounce">
            <span className="text-sm">Cuộn xuống</span>
            <div className="w-6 h-10 border-2 border-gray-300 rounded-full relative">
              <div className="w-1 h-3 bg-gray-400 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle title="Về tôi" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Tôi là một developer đam mê công nghệ, luôn tìm kiếm những giải pháp sáng tạo cho các vấn đề phức tạp.
                Với kinh nghiệm trong phát triển web và ứng dụng, tôi mong muốn chia sẻ kiến thức và học hỏi từ cộng đồng.
              </p>
              <div className="flex flex-wrap gap-3">
                <Tag variant="blue">React</Tag>
                <Tag variant="blue">Next.js</Tag>
                <Tag variant="green">Node.js</Tag>
                <Tag variant="green">TypeScript</Tag>
                <Tag>Tailwind CSS</Tag>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <SkillCard 
                title="Frontend Development" 
                description="Xây dựng giao diện người dùng hiện đại và responsive"
                tools="React, Next.js, TypeScript"
              />
              <SkillCard 
                title="UI/UX Design" 
                description="Thiết kế trải nghiệm người dùng trực quan và thân thiện"
                tools="Figma, Tailwind CSS"
              />
              <SkillCard 
                title="Backend & Deployment" 
                description="Phát triển API và triển khai ứng dụng"
                tools="Node.js, AWS, Docker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle 
            title="Dự án nổi bật" 
            subtitle="Một số dự án tôi đã thực hiện gần đây"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                title: "E-commerce Platform",
                description: "Nền tảng thương mại điện tử với giao diện hiện đại và tính năng thanh toán tích hợp.",
                image: "bg-gradient-to-br from-blue-50 to-indigo-100",
                tags: ["React", "Node.js"]
              },
              {
                id: 2,
                title: "Task Management App",
                description: "Ứng dụng quản lý công việc với giao diện trực quan và khả năng cộng tác nhóm.",
                image: "bg-gradient-to-br from-green-50 to-emerald-100",
                tags: ["Vue.js", "Express"]
              },
              {
                id: 3,
                title: "Portfolio Website",
                description: "Website portfolio cá nhân với thiết kế responsive và tối ưu SEO.",
                image: "bg-gradient-to-br from-purple-50 to-pink-100",
                tags: ["Next.js", "Tailwind"]
              }
            ].map((project) => (
              <Card key={project.id} className="group overflow-hidden">
                <div className={`h-48 ${project.image} relative`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200"></div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    {project.tags.map((tag, index) => (
                      <Tag key={index} variant={index === 0 ? "blue" : "default"}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-gray-50 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle 
            title="Blog" 
            subtitle="Chia sẻ kiến thức và kinh nghiệm trong lập trình"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: 1,
                title: "Tối ưu hiệu suất React Application",
                excerpt: "Hướng dẫn các kỹ thuật tối ưu hiệu suất cho ứng dụng React, từ code splitting đến lazy loading...",
                date: "15 tháng 12, 2024",
                readTime: "5 phút đọc"
              },
              {
                id: 2,
                title: "Thiết kế responsive với Tailwind CSS",
                excerpt: "Khám phá các best practices khi sử dụng Tailwind CSS để tạo ra giao diện responsive...",
                date: "10 tháng 12, 2024",
                readTime: "7 phút đọc"
              },
              {
                id: 3,
                title: "Deployment automation với GitHub Actions",
                excerpt: "Hướng dẫn thiết lập CI/CD pipeline tự động với GitHub Actions cho dự án web...",
                date: "5 tháng 12, 2024",
                readTime: "10 phút đọc"
              },
              {
                id: 4,
                title: "TypeScript trong dự án React",
                excerpt: "Lợi ích và cách tích hợp TypeScript vào dự án React để tăng tính bảo mật code...",
                date: "1 tháng 12, 2024",
                readTime: "8 phút đọc"
              }
            ].map((post) => (
              <Card key={post.id} className="p-6">
                <article>
                  <h3 className="font-semibold text-gray-900 mb-3 text-lg leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors font-medium group">
                      Đọc thêm <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </article>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

const SkillCard = ({ title, description, tools }) => (
  <div className="border-l-4 border-gray-200 pl-6 hover:border-gray-400 transition-colors duration-200">
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-2 text-sm">{description}</p>
    <p className="text-sm text-gray-500">{tools}</p>
  </div>
)