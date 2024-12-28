// Fetch the list of parts from the Google Apps Script and populate the dropdown
async function loadParts() {
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzp3wCq6W0uDiK_h8TeiRs_qi31dz319rZWAZY1qHM/dev'); // Replace with your deployed script URL
    const parts = await response.json();

    const stockSelect = document.getElementById("partSelect"); // Ensure you have an element with this ID for parts selection

    // Populate the dropdown with parts names
    parts.forEach(part => {
      const option = document.createElement("option");
      option.value = part;
      option.textContent = part;
      stockSelect.appendChild(option);
    });

  } catch (error) {
    console.error('Error loading parts:', error);
  }
}

// Call loadParts when the page loads
window.addEventListener('load', loadParts);
