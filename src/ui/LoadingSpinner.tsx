const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-[50svh]">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-500"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

{
  /* <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce200"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce400"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-500 font-semibold pt-10">
          Loading...
        </div>
      </div>
    </div> */
}
