const apiBaseURL = "https://script.google.com/macros/s/AKfycbxCa5AAv_8afVPLFWjJKoE5cy1mELiByasJmJlbr3ETv4y1SL2R_uPEwu1f-i-R01Xy/exec"; // Replace with your deployment ID

document.addEventListener("DOMContentLoaded", () => {
    fetchInventory();
    fetchCategories();
    
    document.getElementById("addStockForm").addEventListener("submit", handleAddStock);
    document.getElementById("repairsForm").addEventListener("submit", handleRepairs);
});

function fetchInventory() {
    fetch(`${apiBaseURL}?sheet=Inventory&action=read`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) throw new Error(data.error);
            populateInventory(data.data);
        })
        .catch((error) => console.error("Error fetching inventory:", error));
}

function fetchCategories() {
    fetch(`${apiBaseURL}?sheet=Inventory&action=categories`)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) throw new Error(data.error);
            populateDropdowns(data.categories);
        })
        .catch((error) => console.error("Error fetching categories:", error));
}

function handleAddStock(event) {
    event.preventDefault();
    const category = document.getElementById("addCategory").value;
    const itemName = document.getElementById("addItem").value;
    const quantity = document.getElementById("addQuantity").value;

    fetch(`${apiBaseURL}?sheet=Inventory&action=add`, {
        method: "POST",
        body: JSON.stringify({ category, itemName, quantity }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) throw new Error(data.error);
            alert("Stock added successfully!");
            fetchInventory();
        })
        .catch((error) => console.error("Error adding stock:", error));
}

function handleRepairs(event) {
    event.preventDefault();
    const category = document.getElementById("repairCategory").value;
    const assetId = document.getElementById("assetId").value;
    const repairDescription = document.getElementById("repairDescription").value;
    const usedParts = document.querySelector('input[name="usedParts"]:checked').value;
    const partName = usedParts === "yes" ? document.getElementById("partName").value : "";

    fetch(`${apiBaseURL}?sheet=Repairs&action=add`, {
        method: "POST",
        body: JSON.stringify({ category, assetId, repairDescription, partName }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) throw new Error(data.error);
            alert("Repair log submitted successfully!");
        })
        .catch((error) => console.error("Error submitting repair log:", error));
}

function populateInventory(data) {
    const inventoryContainer = document.getElementById("inventoryContainer");
    inventoryContainer.innerHTML = "";

    Object.keys(data).forEach((category) => {
        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = category;
        inventoryContainer.appendChild(categoryHeader);

        const itemsList = document.createElement("ul");
        data[category].forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item["Item Name"]} (Qty: ${item["Qty"]})`;
            itemsList.appendChild(listItem);
        });

        inventoryContainer.appendChild(itemsList);
    });
}

function populateDropdowns(categories) {
    const repairCategory = document.getElementById("repairCategory");
    const addCategory = document.getElementById("addCategory");

    repairCategory.innerHTML = "";
    addCategory.innerHTML = "";

    categories.forEach((category) => {
        const option1 = document.createElement("option");
        option1.value = category;
        option1.textContent = category;

        const option2 = option1.cloneNode(true);

        repairCategory.appendChild(option1);
        addCategory.appendChild(option2);
    });
}
