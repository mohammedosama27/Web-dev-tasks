import React from "react";
import "../App.css";

export default function Header() {
  return (
    <header className="udemy-header">
      <div className="container header-inner">
        <div className="logo">Udemy</div>
        <nav className="main-nav">
          <a href="#">Explore</a>
          <a href="#">Categories</a>
          <a href="#">Business</a>
          <a href="#">Teach</a>
        </nav>
        <div className="header-actions">
          <input className="search" placeholder="Search for anything" />
          <button className="btn btn-outline">Log in</button>
          <button className="btn btn-primary">Sign up</button>
        </div>
      </div>
    </header>
  );
}
