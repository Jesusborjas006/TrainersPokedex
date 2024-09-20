const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[50svh]">
      <div className="relative">
        <div className="animate-spin rounded-full h-28 w-28 border-t-4 border-b-4 border-red-500 "></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
