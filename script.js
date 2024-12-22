// Firebase Configuration and Initialization
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Get the inventory collection and display it
const inventoryList = document.querySelector('.inventory-list');

function fetchInventory() {
  db.collection("inventory").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const inventoryItem = document.createElement('div');
      inventoryItem.classList.add('inventory-item');
      
      inventoryItem.innerHTML = `
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Part Name:</strong> ${data.partName}</p>
        <p><strong>Opening Stock:</strong> ${data.openingStock}</p>
        <p><strong>Current Stock:</strong> ${data.currentStock}</p>
      `;
      
      inventoryList.appendChild(inventoryItem);
    });
  }).catch((error) => {
    console.error("Error fetching inventory data: ", error);
  });
}

// Load inventory on page load
document.addEventListener('DOMContentLoaded', fetchInventory);
