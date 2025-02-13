import React from "react";

const CardGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {children}
    </main>
  );
};

export default CardGrid;
