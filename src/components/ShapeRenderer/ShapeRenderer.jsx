import React from 'react';
import './ShapeRenderer.css';

/**
 * ShapeRenderer Component
 * Renders a list of shapes dynamically based on their properties.
 */
const ShapeRenderer = ({ shapes }) => {
  return (
    <div className="shape-renderer">
      {shapes.map((shape, index) => (
        <div
          key={index} // Unique key for each shape for efficient rendering
          className={`shape ${shape.type}`} // Dynamically assigns a class based on shape type
          style={{
            width: `${shape.width}px`, // Sets the width of the shape
            height: `${shape.height}px`, // Sets the height of the shape
            backgroundColor: shape.color, // Applies the specified color
            top: `${shape.y}px`, // Sets the vertical position
            left: `${shape.x}px`, // Sets the horizontal position
          }}
        ></div>
      ))}
    </div>
  );
};

export default ShapeRenderer;
