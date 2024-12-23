// Function to fetch inventory data from Google Sheets
function fetchInventory() {
  // Fetch the data from the Google Apps Script URL
  fetch('https://script.google.com/macros/s/AKfycbxCa5AAv_8afVPLFWjJKoE5cy1mELiByasJmJlbr3ETv4y1SL2R_uPEwu1f-i-R01Xy/exec')
    .then(response => response.json())
    .then(data => {
      // Check if we received an error or data
      if (data.error) {
        console.error('Error fetching inventory:', data.error);
        return;
      }

      // Process the fetched inventory data
      const inventoryContainer = document.getElementById('inventory');
      inventoryContainer.innerHTML = '';

      // Create inventory categories and items dynamically
      data.forEach(item => {
        const category = item[0];  // Assuming Category is in column A
        const name = item[1];  // Assuming Item Name is in column B
        const qty = item[2];  // Assuming Quantity is in column C

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('inventory-item');
        itemDiv.innerHTML = `<strong>Category:</strong> ${category} <br> <strong>Item:</strong> ${name} <br> <strong>Qty:</strong> ${qty}`;
        inventoryContainer.appendChild(itemDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching inventory:', error);
    });
}

// Function to handle adding new stock to Google Sheets
function addStock() {
  const category = document.getElementById('category').value;
  const itemName = document.getElementById('itemName').value;
  const qty = document.getElementById('quantity').value;

  if (!category || !itemName || !qty) {
    alert('Please fill in all fields.');
    return;
  }

  // Prepare the data to send to the Google Apps Script (add a new row)
  const url = `https://script.google.com/macros/s/AKfycbxCa5AAv_8afVPLFWjJKoE5cy1mELiByasJmJlbr3ETv4y1SL2R_uPEwu1f-i-R01Xy/exec?category=${encodeURIComponent(category)}&itemName=${encodeURIComponent(itemName)}&quantity=${encodeURIComponent(qty)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Stock added successfully!');
        // Fetch updated inventory after adding new stock
        fetchInventory();
      } else {
        alert('Error adding stock.');
      }
    })
    .catch(error => {
      console.error('Error adding stock:', error);
      alert('Error adding stock.');
    });
}

// Function to handle repair log submission
function submitRepair() {
  const category = document.getElementById('repairCategory').value;
  const assetNumber = document.getElementById('assetNumber').value;
  const repairDescription = document.getElementById('repairDescription').value;
  const usedParts = document.getElementById('usedParts').checked ? document.getElementById('partName').value : '';

  if (!category || !assetNumber || !repairDescription) {
    alert('Please fill in all fields.');
    return;
  }

  // Prepare the data to send to Google Apps Script (add a new repair entry)
  const url = `https://script.google.com/macros/s/AKfycbxCa5AAv_8afVPLFWjJKoE5cy1mELiByasJmJlbr3ETv4y1SL2R_uPEwu1f-i-R01Xy/exec?category=${encodeURIComponent(category)}&assetNumber=${encodeURIComponent(assetNumber)}&repairDescription=${encodeURIComponent(repairDescription)}&usedParts=${encodeURIComponent(usedParts)}&partName=${encodeURIComponent(usedParts ? usedParts : '')}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Repair log submitted successfully!');
      } else {
        alert('Error submitting repair log.');
      }
    })
    .catch(error => {
      console.error('Error submitting repair log:', error);
      alert('Error submitting repair log.');
    });
}

// Function to initialize the page (load inventory and set event listeners)
function init() {
  // Load inventory data when the page loads
  fetchInventory();

  // Set event listener for adding stock
  document.getElementById('addStockButton').addEventListener('click', addStock);

  // Set event listener for submitting repair log
  document.getElementById('submitRepairButton').addEventListener('click', submitRepair);
}
if (e.parameter.category.toLowerCase() === row[0].toLowerCase()) {
  // Do something
}


// Initialize the page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
