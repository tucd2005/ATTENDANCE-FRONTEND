import React from 'react'
import { Link } from 'react-router-dom'

const HeaderPage = () => {
  return (
    <div>
       <header className="flex gap-10 justify-between mt-3 items-center pb-4 border-b border-gray-200">
        <h1 className="text-5xl">EduAttend</h1>

        <ul className="flex gap-10 text-xl">
          <li className="p-2 link-underline">Giới thiệu</li>
          <li className="p-2 link-underline">Khóa học</li>
          <li className="p-2 link-underline">Liên hệ</li>
        </ul>

        <div className="flex gap-5">
          <button
            className="px-2 py-1 rounded-lg text-white 
            transition-transform duration-200 
            hover:scale-105 active:scale-95 
            shadow hover:shadow-lg 
            bg-blue-500"
          >
            <Link to="/login">
            Đăng nhập
            </Link>
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white 
            transition-transform duration-200 
            hover:scale-105 active:scale-95 
            shadow hover:shadow-lg 
            bg-green-500"
          >
           <Link to="/register">
           Đăng kí
            </Link>
          </button>
        </div>
      </header>

    </div>
  )
}

export default HeaderPage
