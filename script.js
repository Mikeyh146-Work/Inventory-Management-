// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// References to HTML elements
const addStockForm = document.getElementById('addStockForm');
const newItemForm = document.getElementById('newItemForm');
const categoryDropdown = document.getElementById('category');
const partDropdown = document.getElementById('part');
const quantityInput = document.getElementById('quantity');
const newCategoryDropdown = document.getElementById('newCategory');
const newPartNameInput = document.getElementById('newPartName');
const openingStockInput = document.getElementById('openingStock');

// Populate part dropdown based on category selection
categoryDropdown.addEventListener('change', async () => {
  const selectedCategory = categoryDropdown.value;
  const partsRef = db.collection('inventory').doc(selectedCategory).collection('parts');
  const snapshot = await partsRef.get();
  partDropdown.innerHTML = ''; // Clear existing options

  snapshot.forEach(doc => {
    const part = doc.data();
    const option = document.createElement('option');
    option.value = part.name;
    option.textContent = part.name;
    partDropdown.appendChild(option);
  });
});

// Handle adding stock quantity
addStockForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const partName = partDropdown.value;
  const quantityToAdd = parseInt(quantityInput.value, 10);

  const selectedCategory = categoryDropdown.value;
  const partRef = db.collection('inventory').doc(selectedCategory).collection('parts').doc(partName);

  const doc = await partRef.get();
  if (doc.exists) {
    const existingQuantity = doc.data().quantity || 0;
    await partRef.update({ quantity: existingQuantity + quantityToAdd });
    alert("Stock updated successfully!");
  } else {
    alert("Part not found in inventory.");
  }

  quantityInput.value = ''; // Clear the input
});

// Handle adding new stock item
newItemForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newCategory = newCategoryDropdown.value;
  const newPartName = newPartNameInput.value;
  const openingStock = parseInt(openingStockInput.value, 10);

  const newPartRef = db.collection('inventory').doc(newCategory).collection('parts').doc(newPartName);

  await newPartRef.set({
    name: newPartName,
    quantity: openingStock
  });

  alert("New part added successfully!");

  newPartNameInput.value = '';
  openingStockInput.value = ''; // Clear the input
});

