import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <aside></aside>
      {children}
    </div>
  );
};

export default layout;
