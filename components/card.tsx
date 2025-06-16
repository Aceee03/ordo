import React from "react";

interface CardProps {
  title: string;
  url: string;
  icon: React.ReactNode; // or a specific icon type if you have one
}

const Card: React.FC<CardProps> = ({ title, url, icon }) => {
  return (
    <a
      href={url}
      className="min-w-[16rem] max-w-[16rem] min-h-[16rem]
       bg-pink-200 rounded-2xl px-6 py-12 flex flex-col items-center gap-4
    hover:scale-105 transition-all hover:border-[1px] duration-200 justify-center
  "
    >
      {icon}
      <h2 className="font-bold text-center break-words">{title}</h2>
    </a>
  );
};

export default Card;
