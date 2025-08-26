import React from "react"

export const Button = ({ children, variant = "primary", href, className = "", ...props }) => {
  const base = "px-8 py-3 rounded-lg font-medium transition-all duration-200 inline-block"
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  }

  const handleClick = (e) => {
    if (href?.startsWith("#")) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}