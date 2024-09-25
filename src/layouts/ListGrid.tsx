const ListGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 px-2 sm:px-6 md:px-10 gap-4 py-10 text-center max-w-[1250px] mx-auto">
      {children}
    </div>
  );
};

export default ListGrid;
