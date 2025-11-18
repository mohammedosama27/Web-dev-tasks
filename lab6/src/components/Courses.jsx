import React from "react";
import CourseCard from "./CourseCard";
import "../App.css";

const sampleCourses = [
  {
    title: "The AI Engineer Course 2025: Complete AI Engineer Bootcamp",
    author: "365 Careers",
    price: "£349.99",
  },
  {
    title: "Intro to AI Agents and Agentic AI",
    author: "365 Careers",
    price: "£309.99",
  },
  {
    title: "The Complete Guide To AI Powered Salesforce Development",
    author: "Matt Gerry",
    price: "£259.99",
  },
  {
    title: "Artificial Intelligence for Business + ChatGPT Prize [2025]",
    author: "Hadelin et al.",
    price: "£579.99",
  },
];

export default function Courses() {
  return (
    <section className="courses container">
      <h2>Learn essential career and life skills</h2>
      <p className="muted">
        Udemy helps you build in demand skills fast and advance your career.
      </p>

      <div className="card-grid">
        {sampleCourses.map((c, i) => (
          <CourseCard
            key={i}
            title={c.title}
            author={c.author}
            price={c.price}
          />
        ))}
      </div>
    </section>
  );
}
