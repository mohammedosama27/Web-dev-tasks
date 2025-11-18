import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="trusted">
          Trusted by over 17,000 companies and millions of learners
        </p>
        <div className="logo-row" aria-hidden>
          <div className="partner" />
          <div className="partner" />
          <div className="partner" />
          <div className="partner" />
          <div className="partner" />
        </div>
      </div>
    </footer>
  );
}
