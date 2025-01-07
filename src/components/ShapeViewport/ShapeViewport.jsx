import React, { useState } from 'react';
import './ShapeViewport.css';

const ShapeViewport = ({ shapes = [], onShapeUpdate }) => {
  const [draggingShape, setDraggingShape] = useState(null);

  // Handles the context menu for right-click to delete a shape
  const handleContextMenu = (event, index) => {
    event.preventDefault(); // Prevent the default browser context menu
    const confirmDelete = window.confirm('Do you want to delete this shape?');
    if (confirmDelete) {
      // Remove the selected shape from the shapes array
      onShapeUpdate((prevShapes) => prevShapes.filter((_, i) => i !== index));
    }
  };

  // Handles the initial mouse down event to start dragging a shape
  const handleMouseDown = (index, event) => {
    const shape = shapes[index];
    setDraggingShape({
      index,
      offsetX: event.clientX - shape.x,
      offsetY: event.clientY - shape.y,
    });
  };

  // Handles the mouse move event to update the position of a dragging shape
  const handleMouseMove = (event) => {
    if (draggingShape) {
      const updatedShapes = [...shapes];
      const { index, offsetX, offsetY } = draggingShape;

      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;

      const shape = updatedShapes[index];

      // Adjust the vertices for polygons and triangles during dragging
      if (shape.type === 'Polygon' || shape.type === 'Triangle') {
        const dx = newX - shape.x;
        const dy = newY - shape.y;
        shape.points = shape.points.map(([vx, vy]) => [vx + dx, vy + dy]);
      }

      // Update the x and y positions of the shape
      shape.x = newX;
      shape.y = newY;
      onShapeUpdate(updatedShapes);
    }
  };

  // Handles the mouse up event to stop dragging a shape
  const handleMouseUp = () => {
    setDraggingShape(null);
  };

  return (
    <div
      className="shape-viewport"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {shapes.map((shape, index) => {
        if (shape.type === 'Rectangle') {
          // Render a rectangle shape
          return (
            <div
              key={index}
              className="shape rectangle"
              style={{
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                backgroundColor: shape.color,
                border: '2.1px solid black', // Add a border for better visibility
                position: 'absolute',
                top: `${shape.y}px`,
                left: `${shape.x}px`,
                zIndex: shape.zIndex || 0,
                transform: `rotate(${shape.rotation}deg)`, // Apply rotation
                transformOrigin: 'center', // Rotate around the center
              }}
              onMouseDown={(e) => handleMouseDown(index, e)}
              onContextMenu={(e) => handleContextMenu(e, index)} // Handle right-click
            ></div>
          );
        } else if (shape.type === 'Triangle' || shape.type === 'Polygon') {
          // Use the first three points for a triangle, all points for a polygon
          const points = shape.type === 'Triangle' ? shape.points.slice(0, 3) : shape.points;

          // Convert points to a string for SVG <polygon>
          const pointsString = points
            .map(([vx, vy]) => `${vx - shape.x},${vy - shape.y}`)
            .join(' ');

          // Adjust the vertices for rotation
          const adjustedPoints = shape.points.map(([vx, vy]) => [
            vx - shape.x,
            vy - shape.y,
          ]);

          // Calculate the centroid for rotation
          const centroid = adjustedPoints
            .reduce(
              (acc, [vx, vy]) => [acc[0] + vx, acc[1] + vy],
              [0, 0]
            )
            .map((sum) => sum / points.length);

          return (
            <svg
              key={index}
              className={`shape ${shape.type.toLowerCase()}`}
              style={{
                position: 'absolute',
                top: `${shape.y}px`,
                left: `${shape.x}px`,
                zIndex: shape.zIndex || 0,
                overflow: 'visible', // Ensure shapes remain visible during manipulation
              }}
              onMouseDown={(e) => handleMouseDown(index, e)}
              onContextMenu={(e) => handleContextMenu(e, index)} // Handle right-click
            >
              <polygon
                points={pointsString}
                fill={shape.color || 'transparent'} // Fill with color or remain transparent
                stroke="black" // Add a stroke for better visibility
                strokeWidth="1"
                transform={`rotate(${shape.rotation} ${centroid[0]} ${centroid[1]})`} // Apply rotation
              />
            </svg>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ShapeViewport;
