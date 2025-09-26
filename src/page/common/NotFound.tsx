import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
      <img
        src="https://cdn.tgdd.vn/hoi-dap/580732/loi-404-not-found-la-gi-9-cach-khac-phuc-loi-404-not-3-800x534.jpg"
        alt="404 Not Found"
        className="w-full max-w-md rounded-2xl shadow-lg mb-6 object-cover"
      />
      <h1 className="text-4xl font-bold text-red-600 mb-2">
        Trang này không tồn tại rồi bạn ơi!
      </h1>
      <p className="text-gray-600 text-lg mb-6">
        Có thể đường dẫn đã bị thay đổi hoặc bị xóa.  
        Hãy quay lại trang chủ và thử lại nhé.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow hover:bg-red-600 transition duration-300"
      >
        Quay lại Trang Chủ
      </a>
    </div>
  );
};

export default NotFound;
