import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <Outlet />
        </header>
      </div>
    </>
  );
};

export default RootLayout;
