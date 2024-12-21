// Import the required Firebase functions
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmiLbt-SgIRN4yjoCX6iGTsdvQ4HDz554",
  authDomain: "brian-inventory-management.firebaseapp.com",
  projectId: "brian-inventory-management",
  storageBucket: "brian-inventory-management.appspot.com",
  messagingSenderId: "276972422558",
  appId: "1:276972422558:web:c1ef8577015f3a9097428f",
  measurementId: "G-HW9K6R9WKM",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the "inventory" Firestore collection
const inventoryCollection = collection(db, "inventory");

// DOM elements
const addItemForm = document.getElementById("add-item-form");
const inventoryList = document.getElementById("inventory-list");

// Function to load and display inventory from Firestore
async function loadInventory() {
  inventoryList.innerHTML = ""; // Clear the current list

  try {
    const querySnapshot = await getDocs(inventoryCollection);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("div");
      listItem.innerHTML = `
        <strong>${data.itemName}</strong> - 
        Quantity: ${data.quantity} - 
        Location: ${data.location}
      `;
      inventoryList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error loading inventory: ", error);
  }
}

// Function to handle adding an item to Firestore
addItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form input values
  const itemName = document.getElementById("item-name").value;
  const quantity = parseInt(document.getElementById("quantity").value, 10);
  const location = document.getElementById("location").value;

  try {
    // Add the new item to Firestore
    await addDoc(inventoryCollection, {
      itemName,
      quantity,
      location,
    });

    alert("Item added successfully!");
    addItemForm.reset(); // Clear the form
    loadInventory(); // Refresh the inventory list
  } catch (error) {
    console.error("Error adding item: ", error);
  }
});

// Load the inventory list when the page loads
loadInventory();
