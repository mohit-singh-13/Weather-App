import React from "react";

const ButtonTab = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
}) => {
  return (
    <div
      className={`text-white rounded-md px-2 py-2 tracking-widest text-sm cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ButtonTab;
