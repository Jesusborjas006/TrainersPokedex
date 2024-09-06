const Card = ({ children }) => {
  return (
    <div className="border-4 rounded-xl capitalize bg-slate-100 py-6 relative">
      {children}
    </div>
  );
};

export default Card;
