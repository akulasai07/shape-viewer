/**
 * LeftMenu.jsx
 * This component represents the left menu in the Shape Viewer Application.
 * It provides options to open a shape file, save the current shapes, and create new shapes.
 */

import React from 'react';
import './LeftMenu.css';

const LeftMenu = ({ onOpenFile, onSaveAs, onCreateShape }) => {
  /**
   * Handles file uploads from the user.
   * Reads the content of the uploaded .shapefile and passes it to the parent component via `onOpenFile`.
   */
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Access the selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file content
      reader.onload = () => {
        onOpenFile(file.name, reader.result); // Pass file name and content to the parent handler
      };
      reader.readAsText(file); // Read the file as text
    }
  };

  return (
    <nav className="left-menu">
      <ul>
        {/* File upload input (hidden) */}
        <li>
          <input
            type="file"
            id="fileInputLeft"
            accept=".shapefile"
            style={{ display: 'none' }} // Hide the default file input
            onChange={handleFileUpload} // Trigger file upload handling on change
          />
          {/* Label styled as a button for opening shape files */}
          <label htmlFor="fileInputLeft" className="menu-button">
            <i className="fas fa-folder-open"></i> Open Shape File
          </label>
        </li>

        {/* Button for saving the current shapes to a .shapefile */}
        <li>
          <button className="menu-button" onClick={onSaveAs}>
            <i className="fas fa-save"></i> Save As
          </button>
        </li>

        {/* Button for creating a new shape */}
        <li>
          <button className="menu-button" onClick={onCreateShape}>
            <i className="fas fa-plus-circle"></i> Create Shape
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default LeftMenu;
