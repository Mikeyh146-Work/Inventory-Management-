// Function to add new item to Google Sheets
function addNewItem(category, itemName, openingStock) {
  const spreadsheetId = '1KUrgcWTWvhZcL2Is4zXwp9MJ25HtmHlGxtesnGg_Eo8'; // Your Spreadsheet ID
  const range = 'Sheet1!A:A'; // Read column A to determine the last used row

  // Get current data from the sheet to determine the next available row
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(function(response) {
    const existingData = response.result.values;
    const nextRow = existingData ? existingData.length + 1 : 1; // Next available row

    const newRow = [
      category,  // Column A
      itemName,  // Column B
      openingStock // Column C
    ];

    // Append the new item data to the sheet
    const appendRange = `Sheet1!A${nextRow}:C${nextRow}`;
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: appendRange,
      valueInputOption: "RAW",
      values: [newRow]
    }).then(function() {
      displayMessage("Item added successfully!", "green");

      // Clear form fields after submission
      document.getElementById("category").value = "";
      document.getElementById("item-name").value = "";
      document.getElementById("opening-stock").value = "";
    }).catch(function(error) {
      displayMessage("Error adding item to sheet!", "red");
      console.log("Error adding item:", error);
    });
  }).catch(function(error) {
    displayMessage("Error reading data from sheet!", "red");
    console.log("Error reading data from sheet:", error);
  });
}
