# Shape Viewer Application

## Overview
The **Shape Viewer Application** is a client-side tool designed to create, view, and manage geometric shapes dynamically. It is built using **React.js**, styled with **CSS**, and provides a seamless user interface for working with shapes. Users can load shapes from a `.shapefile`, create new shapes, modify them, and save the updated file. The application is responsive and works across devices of various sizes.

---

## Technologies Used
- **Frontend**: React.js, CSS
- **File Handling**: JavaScript 

---

## Development Environment
- **IDE**: Visual Studio Code
- **Browser**: Any modern browser (e.g., Chrome, Firefox, Edge)

---

## Application Features
### Core Functionalities
- **Shape Rendering**:
  - Supports rendering **rectangles**, **triangles**, and **polygons** with or without rotation.
  - Dynamically handles various shape properties like position, size, color and rotation.

- **File Operations**:
  - **Open File**: Load shapes from a `.shapefile`.
  - **Save As**: Save the current shape configurations to a `.shapefile` with a user-specified `.shapefile` name.

- **Shape Dragging**:
  - Shapes can be dragged within the viewport using a **left-click and hold**.
  - **Shape Rotation**: Users can specify rotation degrees for shapes, in the `.shapefile`.

- **Shape Management**:
  - **Add Shapes**: Use a modal with a color picker and custom dimensions.
  - **Delete Shapes**: Right-click on shapes to delete them with confirmation form the user using a prompt.

- **User Interface**:
  - Responsive design for desktop.
  - Card-like menus and toolbar for a professional UI.
  - Grid background in the viewport for better shape alignment.

### Bonus Features
- **Splash Screen**: Displays an animated introduction before the application loads.
- **Context Menu for Deletion**: Intuitive right-click delete functionality.
- **Card-Like Effects**: Enhanced design for menus and toolbar.

---

## Assignment Iterations Completed

### Iteration 1: User Interface Layout
- Completed the layout of the application with a toolbar, left menu, and shape viewport as per the specifications.
- Ensured responsive behavior for different screen sizes.

### Iteration 2: Shape File
- Created a custom file format (`.shapefile`) to store shape data including position, dimensions, color, and z-index.
- Implemented functionality to load and save shape files through the interface.

### Iteration 3: Shape Rendering
- Rendered shapes (triangles, rectangles, and polygons) in the viewport based on the `.shapefile` data.
- Ensured immediate rendering upon file upload.

### Iteration 4: Polygon Support
- Extended the application to support polygon shapes of any complexity.
- Adjusted the `.shapefile` format to accommodate polygon points.

### Iteration 5: UI Enhancement
- Modernized the interface with a card-like design for the left menu and toolbar.
- Enhanced visual appeal with consistent color schemes, typography, and spacing.

---

## Bonus Features Implemented

1. **Shape Translation**
   - Implemented drag-and-drop functionality for shapes using the left mouse button.

2. **Shape Creation**
   - Added a modal for users to create new shapes by specifying type, size, position, and color.
   - Integrated the "Save As" option for saving new or edited shapes to a file.

3. **Shape Rotation**
   - Extended shape files to include optional rotation data.
   - Shapes render with specified rotation angles and maintain correct proportions during manipulation.

4. **Extra Features**
   - Added a contextual menu (right-click) to delete shapes from the viewport.
   - Introduced a graph-like background for the viewport to assist with alignment and positioning.
   - Dynamic color palette for selecting shape colors.

# Challenges and Solutions

## Overview
During the development of the Shape Viewer Application, we faced several challenges related to shape rendering, rotation, file handling, and UI integration. Below is a detailed account of these challenges and how they were overcome.

---

## Challenges and Solutions

### 1. Shape Rotation for Triangles and Polygons
**Challenge:**  
- Handling the rotation of triangles and polygons was particularly tricky as their geometries dynamically change based on rotation angles.
- For triangles, incorrect vertex calculations often led to rendering issues, creating unintended polygons or shapes with more than three sides.

**Solution:**  
- The centroid of each shape was calculated dynamically as the pivot point for rotation.
- For triangles, the logic ensured only the first three vertices were considered, maintaining their structure during rotation.
- Adjustments were made to handle edge cases, such as shapes with overlapping vertices or rotations exceeding 360°.

---

### 2. Save As Functionality
**Challenge:**  
- Accurately saving shapes to a `.shapefile` while preserving their properties like rotation, color, and dimensions.
- Initial implementations failed to handle rotation or reconstruct polygons accurately when the saved file was reopened.

**Solution:**  
- Extended the save logic to dynamically include rotation data and ensured that polygon vertices were preserved correctly.
- Introduced a user-friendly file-saving process, prompting for custom filenames and locations while using the `file-saver` library.

---

### 3. Dragging and Translating Shapes
**Challenge:**  
- Implementing drag-and-drop functionality without distorting shape properties such as rotation or dimensions.
- Handling dynamic adjustments for triangles and polygons during movement.

**Solution:**  
- Developed a robust dragging mechanism using event handlers, ensuring that the translation of shapes did not affect their rotation or original dimensions.
- Adjusted the logic for polygons and triangles to correctly update their positions without altering vertex relationships.

---

### 4. Handling Diverse Input Formats
**Challenge:**  
- Managing different input formats in `.shapefile` files, including optional rotation data and inconsistent casing for shape types.
- Ensuring backward compatibility with previously saved files.

**Solution:**  
- Standardized input processing by converting all shape types to capitalized format internally.
- Enhanced file parsing logic to handle optional properties dynamically without breaking.

---

### 5. UI Challenges with Graph Background
**Challenge:**  
- Integrating a graph-like background in the viewport without affecting shape rendering or performance.
- Maintaining visibility and clarity of shapes over the background.

**Solution:**  
- Implemented a CSS grid background with subtle colors for contrast.
- Ensured that shapes were rendered above the background with clear strokes and fill colors.

---

## Conclusion
Despite the challenges faced, each problem was systematically analyzed and resolved, leading to a robust and user-friendly application. This project stands as a testament to the importance of problem-solving and iterative development in software engineering.


---

## Included Files

Below is a list of the files included in this submission and their purposes:

1. **App.jsx**  
   - **Description:** The main React component of the application that manages state and renders the toolbar, left menu, shape viewport, and modal.  
   - **Purpose:** Handles the application's core functionality, including adding, modifying, deleting, and saving shapes.

2. **Toolbar.jsx**  
   - **Description:** A React component for the application's toolbar.  
   - **Purpose:** Provides options to open a file, displays the current file name, and integrates seamlessly with the application's layout.

3. **LeftMenu.jsx**  
   - **Description:** A React component representing the left menu.  
   - **Purpose:** Contains buttons for actions like creating shapes, opening files, and saving files with intuitive icons and hover effects.

4. **ShapeViewport.jsx**  
   - **Description:** A React component that renders all shapes in the viewport.  
   - **Purpose:** Handles shape rendering, rotation, dragging, and contextual actions like deletion.

5. **ShapeCreationModal.jsx**  
   - **Description:** A modal React component for creating new shapes dynamically.  
   - **Purpose:** Allows users to define shape properties (e.g., type, color, dimensions) and add them to the viewport.

6. **README.md**  
   - **Description:** Documentation for the project.  
   - **Purpose:** Provides an overview of the project, setup instructions, features, challenges, and solutions.  

---

### File References in Code
Each file is used in its corresponding role within the project structure. For example:
- `App.jsx` imports `Toolbar.jsx`, `LeftMenu.jsx`, and `ShapeViewport.jsx` to construct the main application layout.
- `ShapeViewport.jsx` interacts with the shapes array to render dynamic shapes, including polygons and triangles.

---

### Included Input Files
1. **Input Example 1**  
   - Rectangle, 0, 0, 0, 50, 50, ff0000; //Rectangle 
   - Rectangle, 70, 70, 1, 100, 200, 00ff00; //Rectangle 
   - Triangle, 200, 200, 1, 60, 60, 00ff00; //Triangle 
   - Polygon, 30, 30, 80, 130, 130, 30, 0000ff; //Polygon 
   - Polygon, 150, 50, 150, 100, 200, 200, 150, 200, 50, 250, 20, 150, 50, 50, 0000ff; //Complex Polygon 
   - Triangle, 200, 200, 0, 60, 60, f0ffff; 
   - Polygon, 300, 300, 350, 400, 400, 350, 350, 300, 00f0ff;
   
2. **Input Example 2**  
   - Rectangle, 100, 100, 0, 200, 100, ff0000, 45; // Rotated by 45 degrees
   - Rectangle, 300, 300, 1, 150, 200, 00ff00; // No rotation
   - Rectangle, 50, 50, 0, 50, 50, 0000ff, 90; // Rotated by 90 degrees
   - Rectangle, 400, 400, 2, 120, 80, ffff00; // No rotation, larger z-index
   - Triangle, 200, 200, 0, 120, 120, ff00ff, 30; // Rotated by 30 degrees
   - Triangle, 300, 300, 1, 60, 90, 00eeff; // No rotation
   - Triangle, 400, 400, 0, 100, 150, 00ff00, 120; // Rotated by 120 degrees
   - Polygon, 300, 300, 350, 400, 400, 350, 350, 300, ff8800, 60; // Rotated by 60 degrees
   - Polygon, 150, 150, 200, 250, 250, 200, 200, 150, 0011ff; // No rotation
   - Polygon, 400, 400, 450, 500, 550, 450, 500, 400, 009900, 45; // Rotated by 45 degrees
   - Rectangle, 0, 0, 0, 50, 50, ff00ff, 0; // Zero rotation
   - Triangle, 0, 0, 0, 0, 0, ff0000; // Degenerate triangle
   - Polygon, 0, 0, 0, 0, 0, 0, 0, ffff00, 90; // Degenerate polygon
   - Rectangle, 600, 600, 0, 200, 100, aa00aa, 180; // Rotated by 180 degrees
   - Triangle, 711, 607, 0, 100, 50, bb00ff; // No rotation, flat triangle
   - Polygon, 200, 200, 300, 300, 200, 400, 100, 300, cc00cc, 270; // Rotated by 270 degrees
   - Rectangle, 500, 500, 1, 100, 50, 333333; // Extra comments at the end;
   - Triangle, 685, 409, 0, 80, 120, 444444, 15; // Comments;
   - Polygon, 832, 498, 932, 598, 882, 648, 832, 698, 555555


---

These files ensure that your application can be tested with the included examples and provide a clear understanding of the project structure and functionality.


# Project Dependencies and Installation Guide

## **Dependencies Used in the Project**

### **Main Dependencies**
1. **React**: Core library for building the UI.
   - Installed using:
     ```bash
     npx create-react-app shape-viewer
     ```

2. **React DOM**: Used for rendering React components into the DOM.
   - Automatically included with React setup.

3. **file-saver**: For handling file downloads (used in the Save As feature).
   - Installed using:
     ```bash
     npm install file-saver
     ```

4. **react-color**: For the dynamic color picker in the shape creation modal.
   - Installed using:
     ```bash
     npm install react-color
     ```

---

### **Dev Dependencies**

1. **npm**: Comes bundled with Node.js for managing packages.

2. **Babel and Webpack**: Part of the React boilerplate for transpiling modern JavaScript and bundling the application.



---

### **Other Tools and Utilities**
1. **VS Code**:
   - The primary code editor for writing and debugging the project.
   - Installed from [VS Code official website](https://code.visualstudio.com/).

2. **Browser DevTools**:
   - Used for testing and debugging in the browser.

3. **Git**:
   - Version control for managing code changes.
   - Installed from [Git official website](https://git-scm.com/).

---

## **Running the application**

Once you download the project, you can install all required dependencies in one go by running:
```bash
1.   **npm install**

2. **Run the development server**
   
     ```bash
     npm start
     ```

3. **Open the browser and navigate to:**
     ```http://localhost:3000
     
     ```

