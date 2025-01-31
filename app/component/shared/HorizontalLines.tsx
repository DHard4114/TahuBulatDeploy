import React from "react";

export default function HorizontalLines (){
  return (
    <div className="hidden md:flex flex-col justify-center items-center space-y-2">
      <div className="border-t-4 border-white w-8 md:w-16 rounded-sm"></div>
      <div className="border-t-4 border-white w-10 md:w-20 rounded-sm"></div>
      <div className="border-t-4 border-white w-8 md:w-16 rounded-sm"></div>
    </div>
  );
};


