import React, { useState } from 'react';
import './ShapeCreationModal.css';

/**
 * A modal component for creating new geometric shapes dynamically.
 * 
 * Props:
 * - onClose: Function to close the modal.
 * - onAddShape: Function to add a new shape to the application state.
 */
const ShapeCreationModal = ({ onClose, onAddShape }) => {
  // State variables to manage shape properties
  const [type, setType] = useState('Rectangle'); // Default shape type
  const [x, setX] = useState(100); // X-coordinate for the shape
  const [y, setY] = useState(100); // Y-coordinate for the shape
  const [width, setWidth] = useState(50); // Width for rectangles/triangles
  const [height, setHeight] = useState(50); // Height for rectangles/triangles
  const [color, setColor] = useState('#ff0000'); // Default color for shapes
  const [points, setPoints] = useState(''); // Custom points for polygons

  /**
   * Handles adding a new shape based on the selected type and properties.
   */
  const handleAddShape = () => {
    let newShape = {
      type,
      x: parseInt(x, 10),
      y: parseInt(y, 10),
      color,
    };

    // Handle properties specific to rectangles
    if (type === 'Rectangle') {
      newShape = {
        ...newShape,
        width: parseInt(width, 10),
        height: parseInt(height, 10),
      };
    } 
    // Handle properties specific to triangles
    else if (type === 'Triangle') {
      newShape.points = [
        [parseInt(x, 10), parseInt(y, 10)],
        [parseInt(x, 10) + parseInt(width, 10), parseInt(y, 10) + parseInt(height, 10)],
        [parseInt(x, 10) - parseInt(width, 10), parseInt(y, 10) + parseInt(height, 10)],
      ];
    } 
    // Handle properties specific to polygons
    else if (type === 'Polygon') {
      // Parse and validate custom points input
      const parsedPoints = points
        .split(',')
        .map((point) => parseInt(point.trim(), 10))
        .filter((num) => !isNaN(num));

      if (parsedPoints.length % 2 !== 0) {
        alert('Invalid points: Ensure all coordinates are in x, y pairs.');
        return;
      }

      const pointPairs = [];
      for (let i = 0; i < parsedPoints.length; i += 2) {
        pointPairs.push([parsedPoints[i], parsedPoints[i + 1]]);
      }

      newShape = {
        ...newShape,
        points: pointPairs,
      };
    }

    // Pass the new shape back to the parent component
    onAddShape(newShape);
    // Close the modal
    onClose();
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <h3>Create New Shape</h3>
        <label>
          Type:
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Rectangle">Rectangle</option>
            <option value="Triangle">Triangle</option>
            <option value="Polygon">Polygon</option>
          </select>
        </label>
        {/* Custom points input for polygons */}
        {type === 'Polygon' && (
          <label>
            Points (comma-separated, e.g., "100,100, 200,100, 150,200"):
            <input
              type="text"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </label>
        )}
        {/* Common inputs for all shapes */}
        <label>
          X Position:
          <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
        </label>
        <label>
          Y Position:
          <input type="number" value={y} onChange={(e) => setY(e.target.value)} />
        </label>
        {/* Inputs specific to rectangles and triangles */}
        {type !== 'Polygon' && (
          <>
            <label>
              Width:
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
            </label>
            <label>
              Height:
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
            </label>
          </>
        )}
        {/* Color picker input */}
        <label>
          Color:
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </label>
        {/* Modal actions */}
        <button onClick={handleAddShape}>Add Shape</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ShapeCreationModal;
