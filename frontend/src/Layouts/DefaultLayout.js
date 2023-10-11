import React from "react";
import Navbar from "../components/Navbar";

const DefaultLayout = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default DefaultLayout;
