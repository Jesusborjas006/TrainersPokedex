import { ReactElement } from "react";

interface CardProps {
  children: ReactElement | ReactElement[];
}

const Card = ({ children }: CardProps) => {
  return (
    <div className="border-2 rounded-xl capitalize bg-slate-100 py-6 relative">
      {children}
    </div>
  );
};

export default Card;
