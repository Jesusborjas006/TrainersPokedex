const Card = ({ children }) => {
  return (
    <div className="border-4 cursor-pointer rounded-xl capitalize bg-slate-100 py-6 hover:border-red-600 relative">
      {children}
    </div>
  );
};

export default Card;
