import React from "react";
import "../App.css";

export default function Carrer() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <h1>Subscribe to the best of Udemy</h1>
          <p className="muted">
            With Personal Plan, you get access to 26,000+ of our top-rated
            courses in tech, business, and more.
          </p>
          <button className="btn btn-primary">Try it now</button>
        </div>
        <div className="hero-image" aria-hidden>
          {/* Decorative block to mimic the site hero graphic */}
        </div>
      </div>
    </section>
  );
}
