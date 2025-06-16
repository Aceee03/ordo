import React from "react";

const Background = () => {
  return (
      <div className="absolute inset-0 z-[-10]">
        <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      </div>
  );
};

export default Background;
