$(document).ready(function() {
  // Link to your CSV file
  const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRnbPKpvjGhZCULOZIH3hrPv8djM1Jkk7z3I_R0IC9OsoUd5rcCU16LMZ2qV61b69eKgvmdIaE_oSOK/pub?output=csv';
  
  // Fetch the CSV data
  $.ajax({
    url: sheetUrl,
    dataType: 'text',
  }).done(function(data) {
    // Parse the CSV data
    const rows = data.split("\n");
    const inventoryList = $("#inventory-list");

    rows.forEach(function(row, index) {
      if(index === 0) return; // Skip header row

      const cells = row.split(",");
      const category = cells[0]; // First column is category
      const item = cells[1]; // Second column is item
      const quantity = cells[2]; // Third column is quantity

      // Create HTML content to display
      let categoryHtml = `<div><h2>${category}</h2><ul>`;
      categoryHtml += `<li>${item}: ${quantity}</li></ul></div>`;

      // Append to inventory list
      inventoryList.append(categoryHtml);
    });
  }).fail(function() {
    alert('Failed to load data from Google Sheets.');
  });
});
