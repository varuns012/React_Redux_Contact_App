import React from "react";
import "./Navbar.css";
import { Typography } from "antd";

const { Title } = Typography;

function Navbar() {
  return (
    <>
      <div className="navbar">
        <Title className="navbar_title" level={5}>React Redux Contact App</Title>
      </div>
    </>
  );
}

export default Navbar;
