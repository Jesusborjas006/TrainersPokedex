const ListGrid = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-8 pt-10 text-center max-w-[1200px] mx-auto border">
      {children}
    </div>
  );
};

export default ListGrid;
