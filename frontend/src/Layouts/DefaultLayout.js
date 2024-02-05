import React from "react";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../components/auth/AuthRequired";

const DefaultLayout = (props) => {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        {props.children}
      </AuthProvider>
    </div>
  );
};

export default DefaultLayout;
