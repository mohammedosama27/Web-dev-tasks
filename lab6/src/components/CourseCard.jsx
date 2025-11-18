import React from "react";
import "../App.css";

export default function CourseCard({ title, author, price }) {
  return (
    <div className="course-card">
      <div className="course-img" />
      <div className="course-body">
        <h3 className="course-title">{title}</h3>
        <div className="course-author">{author}</div>
        <div className="course-price">{price}</div>
      </div>
    </div>
  );
}
