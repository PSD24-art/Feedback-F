import React from "react";
import "./SkeletonCard.css";

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-header">
        <div className="skeleton-icon shimmer"></div>
        <div className="skeleton-title shimmer"></div>
      </div>
      <div className="skeleton-line shimmer"></div>
      <div className="skeleton-line shimmer short"></div>
      <div className="flex items-center gap-2">
        <div className="skeleton-chip shimmer"></div>
        <div className="skeleton-chip shimmer"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
