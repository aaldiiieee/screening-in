import React from "react";
import Navbar from "@/components/partials/Header/Navbar";
import Footer from "@/components/partials/Footer/Footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Navbar />
      <main className="max-w-screen-xl mx-auto p-4 min-h-screen">{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default MainLayout;
