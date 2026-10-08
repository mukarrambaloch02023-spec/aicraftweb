import { GlobalGrid } from "./GlobalGrid";
import React from 'react';

const PublicHomePage = () => {
  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 flex flex-col relative overflow-hidden">
      <GlobalGrid />
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Yahan tera saara content hai - Navbar, Hero, etc */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-5xl font-bold">AiCraft</h1>
        </div>
      </div>
    </div>
  );
};

export default PublicHomePage;
