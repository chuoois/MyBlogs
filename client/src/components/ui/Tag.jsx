import React from "react"

export const Tag = ({ variant = "default", children }) => {
  const variants = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    default: "bg-gray-100 text-gray-800"
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  )
}