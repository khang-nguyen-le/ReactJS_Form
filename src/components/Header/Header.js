import React from "react";
import logo from "./../../assets/information-logo.png";
import classes from "./../Header/Header.module.css";

export default function Header() {
  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" />
      <h1>Student Management</h1>
    </header>
  );
}
