const SideBarSkeleton = () => {
  return (
    <div className="py-4  flex-col h-full  w-56 border  px-4 hidden lg:block">
      <div className="px-4 mb-8">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <nav className="space-y-1 flex-1">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center px-4 py-2">
            <div className="h-5 w-5 mr-3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </nav>
    </div>
  );
};
export default SideBarSkeleton;
