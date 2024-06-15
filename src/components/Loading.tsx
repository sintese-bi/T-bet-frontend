import React from "react";

interface LoadingProps {
  size?: string;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "w-6 h-6",
  color = "text-gray-500",
}) => {
  return (
    <div className={`flex justify-center items-center ${size} ${color}`}>
      <div className="animate-spin rounded-full border-2 border-t-2 border-gray-500 h-full w-full p-20">
        <div className="text-center text-gray-500 z-40">
          <span>Loading</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
