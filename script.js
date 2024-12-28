document.getElementById("repairForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const repairData = {
    repairedItem: document.getElementById("repairItem").value,
    assetID: document.getElementById("assetID").value,
    repairDetails: document.getElementById("repairDetails").value,
    stockUsed: document.querySelector('input[name="stockUsed"]:checked').value,
    stockItems: Array.from(stockList.children).map((item) => ({
      part: item.querySelector("select").value,
      quantity: item.querySelector("input").value,
    })),
  };

  try {
    // Replace YOUR_WEB_APP_URL with the actual URL for your deployed Google Apps Script
    const response = await fetch("https://script.google.com/macros/s/AKfycbxeQ7euXjMfVkd6Kjs7slZo5k-FQNZiY2_wgKgtIg6dFLr_Ig_2Of9_x5vpP8D9lJrq/exec", {
      method: "POST",
      body: JSON.stringify(repairData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    if (result.status === "success") {
      alert(result.message);
      e.target.reset(); // Reset the form
      stockList.innerHTML = ""; // Clear the stock list
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    alert(`Failed to submit repair: ${error.message}`);
  }
});
