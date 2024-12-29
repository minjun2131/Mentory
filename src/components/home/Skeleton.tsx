const Skeleton: React.FC = () => {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg bg-gray-200 animate-pulse">
      {/* 이미지 부분 */}
      <div className="w-full h-[300px] bg-gray-300"></div>
      {/* 텍스트 부분 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <div className="bg-gray-400 h-5 w-3/4 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
