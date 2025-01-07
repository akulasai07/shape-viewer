import { saveAs } from 'file-saver';
import React, { useState } from 'react';
import './App.css';
import LeftMenu from './components/LeftMenu/LeftMenu';
import ShapeCreationModal from './components/ShapeCreationModal/ShapeCreationModal';
import ShapeViewport from './components/ShapeViewport/ShapeViewport';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Toolbar from './components/Toolbar/Toolbar';
import { parseShapeFile } from './utils/fileParser';

function App() {
  // State for the currently opened file name
  const [fileName, setFileName] = useState('');
  // State for the list of shapes
  const [shapes, setShapes] = useState([]);
  // State for controlling the shape creation modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for controlling the splash screen visibility
  const [showSplash, setShowSplash] = useState(true);

  // Handles the completion of the splash screen
  const handleSplashComplete = () => {
    setShowSplash(false); // Hide splash screen and show the main app
  };

  // Handles file uploads and updates the shapes state
  const handleFileChange = (name, content) => {
    setFileName(name);
    const parsedShapes = parseShapeFile(content);
    setShapes(parsedShapes);
  };

  // Handles saving shapes to a .shapefile with user-specified name
  const handleSaveAs = () => {
    if (!shapes || !Array.isArray(shapes)) {
      console.error('Shapes array is undefined or not an array');
      return;
    }

    const fileContent = shapes
      .map((shape) => {
        if (shape.type === 'Rectangle') {
          return `${shape.type}, ${shape.x}, ${shape.y}, ${shape.zIndex || 0}, ${shape.width}, ${shape.height}, ${shape.color.slice(1)}${shape.rotation ? `, ${shape.rotation}` : ''}`;
        } else if (shape.type === 'Triangle') {
          // Save triangles in the original format
          const [x, y] = shape.points[0]; // Top vertex
          const baseWidth = Math.abs(shape.points[1][0] - shape.points[2][0]) / 2; // Half of the base width
          const height = Math.abs(shape.points[1][1] - y); // Height of the triangle
          return `${shape.type}, ${x}, ${y}, ${shape.zIndex || 0}, ${baseWidth}, ${height}, ${shape.color.slice(1)}${shape.rotation ? `, ${shape.rotation}` : ''}`;
        } else if (shape.type === 'Polygon') {
          // Save polygons with all vertices
          const points = shape.points
            .map(([vx, vy]) => `${vx}, ${vy}`)
            .join(', ');
          return `${shape.type}, ${points}, ${shape.color.slice(1)}${shape.rotation ? `, ${shape.rotation}` : ''}`;
        }
        return '';
      })
      .join('\n');

    const fileName = window.prompt('Enter a name for your file:', 'shapes.shapefile');

    if (!fileName) {
      console.error('File saving canceled by the user');
      return;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    saveAs(blob, fileName);
  };

  // Handles adding a new shape to the shapes list
  const handleAddShape = (newShape) => {
    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  return (
    <div className="app">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Toolbar fileName={fileName} onFileChange={handleFileChange} />
          <div className="layout">
            <LeftMenu
              onOpenFile={handleFileChange}
              onSaveAs={handleSaveAs}
              onCreateShape={() => setIsModalOpen(true)}
            />
            <ShapeViewport shapes={shapes} onShapeUpdate={setShapes} />
          </div>
          {isModalOpen && (
            <ShapeCreationModal
              onClose={() => setIsModalOpen(false)}
              onAddShape={handleAddShape}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
