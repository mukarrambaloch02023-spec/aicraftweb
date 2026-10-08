import React from 'react';

export const GlobalGrid = () => {
  return (
<div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">      <div className="absolute inset-0 bg-[#070D1F]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]" />
    </div>
  );
};
