function displayInventory() {
  inventoryRef.get().then((querySnapshot) => {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = ''; // Clear existing content

    if (querySnapshot.empty) {
      inventoryList.innerHTML = '<p id="empty-message">No inventory items found.</p>';
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data(); // Get items and QTY
      const category = doc.id; // Get the document name (category)
      const categoryDiv = document.createElement('div');

      // Create category header
      let categoryHtml = <h2>${category}</h2><ul>;
      for (const item in data) {
        categoryHtml += <li>${item}: ${data[item]}</li>;
      }
      categoryHtml += </ul>;

      // Append category data to the page
      categoryDiv.innerHTML = categoryHtml;
      inventoryList.appendChild(categoryDiv);
    });
  }).catch((error) => {
    const inventoryList = document.getElementById('inventory-list');
    inventoryList.innerHTML = '<p id="error-message">Error retrieving inventory data. Please try again later.</p>';
    console.error("Error retrieving inventory: ", error);
  });
}
