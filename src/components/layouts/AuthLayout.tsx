import React from "react";
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex justify-between h-screen w-full">
      {/* Bên trái layout tĩnh */}
      <div className="flex justify-center items-center w-1/2 bg-blue-100 text-2xl font-bold">
        
      </div>

      {/* Bên phải layout động */}
      <div className="flex justify-center items-center w-1/2 bg-green-100 text-2xl font-bold">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
