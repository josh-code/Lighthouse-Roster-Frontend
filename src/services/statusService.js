import React from "react";

export function renderSmily(status) {
  let className;
  switch (status) {
    case "pending":
      className = "fas fa-meh";
      break;
    case "accepted":
      className = "fas fa-laugh";
      break;
    case "declined":
      className = "fas fa-frown-open";
      break;
    default:
      className = "fas fa-meh";
  }
  return <i className={className} />;
}
