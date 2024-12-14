import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 bg-tertiary bg-opacity-90 flex flex-col items-center justify-center z-10">
      {/* Spinner */}
      <div className="relative w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-xl animate-pulse"></div>
      </div>
      
      {/* Loading Text */}
      <p className="mt-4 text-xl font-semibold text-white animate-bounce">
        Fetching Data...
      </p>

      {/* Subtle UI detail */}
      <p className="mt-2 text-sm text-gray-200 italic opacity-80">
        Hang tight! This won’t take long.
      </p>
    </div>
  );
};

export default Loader;
