import React, { useState, useEffect } from "react";
import { Button, Card, Tag, SectionTitle } from "../ui";
import adminService from "../../services/admin.services";

export const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typeSpeed, setTypeSpeed] = useState(150);

  // State
  const [aboutme, setAboutme] = useState(null);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const dynamicWords = ["Palala", "Công nghệ", "Sáng tạo", "Đam mê"];

  // Fetch API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aboutRes = await adminService.aboutme.getAll();
        if (aboutRes && aboutRes.length > 0) {
          setAboutme(aboutRes[0]);
        }

        const projectRes = await adminService.projects.getAll();
        setProjects(projectRes);

        const blogRes = await adminService.blogs.getAll();
        setBlogs(blogRes);
      } catch (err) {
        console.error("Lỗi khi fetch dữ liệu:", err);
      }
    };
    fetchData();
  }, []);

  // Typewriter effect
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const handleType = () => {
      const currentWord = dynamicWords[currentWordIndex];

      if (isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        setTypeSpeed(50);
      } else {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        setTypeSpeed(150);
      }

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
      }
    };

    const timer = setTimeout(handleType, typeSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, typeSpeed]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:2s]"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:4s]"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="space-y-8">
            <div>
              <h1
                className={`text-6xl md:text-7xl font-bold text-gray-900 leading-tight mb-6 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="block overflow-hidden">
                  <span
                    className={`block transition-all duration-700 delay-200 ${
                      isVisible ? "translate-y-0" : "translate-y-full"
                    }`}
                  >
                    Chào mừng đến với
                  </span>
                </span>
                <span className="relative inline-block">
                  <span
                    className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 transition-all duration-700 delay-500 ${
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    } animate-[gradient-x_3s_ease_infinite] min-w-[400px] inline-block`}
                  >
                    {displayText}
                    <span className="inline-block w-1 h-full bg-blue-600 ml-1 animate-[blink_1s_infinite] align-top"></span>
                  </span>
                </span>
              </h1>

              <p
                className={`text-2xl text-gray-600 leading-relaxed max-w-3xl transition-all duration-1000 delay-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <span className="relative">
                  Khám phá thế giới công nghệ qua những dự án sáng tạo và chia sẻ kiến thức lập trình.
                  <span
                    className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left transition-all duration-1000 delay-1000"
                    style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)" }}
                  ></span>
                </span>
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Button variant="primary" href="#projects" className="group">
                <span className="mr-2">Xem dự án</span>
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </Button>
              <Button variant="outline" href="#about" className="group">
                <span className="mr-2">Về tôi</span>
                <span className="transform transition-transform group-hover:scale-110">👋</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle title="Về tôi" />

          {aboutme ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">{aboutme.descriptions}</p>
                <div className="flex flex-wrap gap-3">
                  {aboutme.skill_tag?.map((tag, i) => (
                    <Tag key={i} variant="blue">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {aboutme.skill_card?.map((skill, i) => (
                  <SkillCard key={i} title={skill.title} description={skill.detail} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Đang tải thông tin...</p>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle title="Dự án nổi bật" subtitle="Một số dự án tôi đã thực hiện gần đây" />

          {projects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, 3).map((project) => (
                  <Card
                    key={project.id}
                    className="group overflow-hidden flex flex-col"
                  >
                    <div className="h-48 relative bg-gray-100">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-2 text-lg">{project.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex gap-2 flex-wrap mb-4">
                        {project.technologies?.map((tag, index) => (
                          <Tag key={index} variant={index === 0 ? "blue" : "default"}>
                            {tag}
                          </Tag>
                        ))}
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-500">
                        <span>{new Date(project.created_at).toLocaleDateString("vi-VN")}</span>
                        <div className="flex gap-4">
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 transition-colors"
                            >
                              GitHub
                            </a>
                          )}
                          {project.live_url && (
                            <a
                              href={project.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-green-600 transition-colors"
                            >
                              Live
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button variant="outline" href="https://github.com/chuoois" target="_blank" className="group">
                  <span className="mr-2">Xem tất cả dự án</span>
                  <span className="transform transition-transform group-hover:translate-x-1">→</span>
                </Button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Đang tải dự án...</p>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-24 bg-gray-50 px-6">
        <div className="container mx-auto max-w-6xl">
          <SectionTitle title="Blog" subtitle="Chia sẻ kiến thức và kinh nghiệm trong lập trình" />

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogs.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="w-full h-40 object-cover" />
                  )}
                  <div className="p-6">
                    <article>
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg leading-snug">{post.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{post.summary}</p>

                      <div className="flex gap-2 flex-wrap mb-3">
                        {post.tags?.map((tag, i) => (
                          <Tag key={i} variant="blue">
                            {tag}
                          </Tag>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <span>{new Date(post.created_at).toLocaleDateString("vi-VN")}</span>
                          <span>{post.published ? "Đã xuất bản" : "Nháp"}</span>
                        </div>
                        <a
                          href={`/blog/${post.id}`}
                          className="text-gray-900 hover:text-gray-600 transition-colors font-medium group"
                        >
                          Đọc thêm{" "}
                          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                        </a>
                      </div>
                    </article>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Đang tải blog...</p>
          )}
        </div>
      </section>
    </div>
  );
};

const SkillCard = ({ title, description }) => (
  <div className="border-l-4 border-gray-200 pl-6 hover:border-gray-400 transition-colors duration-200">
    <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-2 text-sm">{description}</p>
  </div>
);