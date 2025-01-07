/**
 * Parses the shape file content into an array of shape objects.
 * @param {string} fileContent - The content of the shape file.
 * @returns {Array} Array of parsed shape objects.
 */
export const parseShapeFile = (fileContent) => {
  // Split file content into lines, ignoring empty lines and lines starting with '//'
  const lines = fileContent.split('\n').filter((line) => {
    return line.trim() !== '' && !line.trim().startsWith('//');
  });

  return lines.map((line) => {
    const cleanLine = line.split(';')[0].trim(); // Remove inline comments
    const parts = cleanLine.split(',').map((item) => item.trim()); // Split and trim parts

    // Standardize type format (capitalize first letter, lowercase the rest)
    const t_type = parts[0].toLowerCase();
    const type = t_type.charAt(0).toUpperCase() + t_type.slice(1);

    // Determine if the last value is a rotation or a color
    const lastValue = parts[parts.length - 1];
    const isHexColor = /^#?[0-9A-Fa-f]{6}$/.test(lastValue); // Check if value is a hexadecimal color
    const isRotation = !isHexColor && !isNaN(parseFloat(lastValue)); // Check if value is a valid number
    const rotation = isRotation ? parseFloat(lastValue) : 0; // Default rotation to 0 if not provided

    // Determine the position of the color in the parts array
    const colorIndex = isRotation ? parts.length - 2 : parts.length - 1;
    const color = `#${parts[colorIndex]}`; // Extract color

    if (type === 'Polygon') {
      // Parse polygon vertices
      const vertices = [];
      const verticesEndIndex = isRotation ? parts.length - 2 : parts.length - 1;

      for (let i = 1; i < verticesEndIndex; i += 2) {
        const vx = parseInt(parts[i], 10);
        const vy = parseInt(parts[i + 1], 10);
        if (!isNaN(vx) && !isNaN(vy)) {
          vertices.push([vx, vy]);
        }
      }

      // Construct and return the polygon object
      return {
        type,
        points: vertices,
        color,
        rotation,
        x: Math.min(...vertices.map(([vx]) => vx)), // Top-left x-coordinate
        y: Math.min(...vertices.map(([, vy]) => vy)), // Top-left y-coordinate
        zIndex: 1, // Default z-index for polygons
      };
    } else if (type === 'Rectangle') {
      // Parse rectangle properties
      return {
        type,
        x: parseInt(parts[1], 10),
        y: parseInt(parts[2], 10),
        zIndex: parseInt(parts[3], 10) || 0,
        width: parseInt(parts[4], 10),
        height: parseInt(parts[5], 10),
        color,
        rotation,
      };
    } else if (type === 'Triangle') {
      // Parse triangle properties and calculate vertices
      const x = parseInt(parts[1], 10);
      const y = parseInt(parts[2], 10);
      const width = parseInt(parts[4], 10);
      const height = parseInt(parts[5], 10);

      const vertices = [
        [x, y],
        [x + width, y + height],
        [x - width, y + height],
      ];

      // Construct and return the triangle object
      return {
        type,
        points: vertices,
        color,
        rotation,
        x,
        y,
        zIndex: parseInt(parts[3], 10) || 0,
      };
    }

    // Return null for unsupported types or invalid input
    return null;
  }).filter((shape) => shape !== null); // Filter out invalid shapes
};
