"use client";

import "./swiss.css";

/** Visible 12-column grid (decorative) aligned with the 1200px content container. */
export default function SwissGrid() {
  return (
    <div aria-hidden className="sw-grid" data-testid="swiss-grid">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}
