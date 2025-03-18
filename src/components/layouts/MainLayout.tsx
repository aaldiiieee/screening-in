import React from "react";
import Navbar from "@/components/partials/Header/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="max-w-screen-xl mx-auto p-4">{children}</main>
    </React.Fragment>
  );
};

export default MainLayout;
