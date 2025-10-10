// Laboratory Activity 4 - Product Inventory System (with Table/Card toggle)
// By: Borabo, Jah Christopher Borabo

let inventory = [];
let viewMode = 'table'; // 'table' or 'card'

// Product class with unique id
class Product {
  constructor(name, qty, price) {
    this.id = Date.now().toString(36) + Math.random().toString(36).slice(2); // unique id
    this.name = name;
    this.qty = qty;
    this.price = price;
  }

  // compute final total (discount then tax)
  getTotal() {
    let total = this.qty * this.price; // base total
    if (total > 5000) total *= 0.9; // 10% discount if large order
    const tax = total * 0.12; // 12% VAT
    return (total + tax).toFixed(2);
  }
}

// --- UI & CRUD functions ---

function addProduct() {
  const name = document.getElementById('pname').value.trim();
  const qty = parseInt(document.getElementById('pqty').value);
  const price = parseFloat(document.getElementById('pprice').value);

  if (!name || isNaN(qty) || isNaN(price)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  const product = new Product(name, qty, price);
  inventory.push(product);
  console.log("Added:", product);
  updateTable();
  clearInputs();
}

function deleteProductById(id) {
  const idx = inventory.findIndex(p => p.id === id);
  if (idx === -1) return;
  if (confirm("Delete this product?")) {
    const removed = inventory.splice(idx, 1)[0];
    console.log("Deleted:", removed);
    updateTable(); 
  }
}

function filterLowStock() {
  const filtered = inventory.filter(item => item.qty <= 5);
  display(filtered);
}

function sortByName() {
  inventory.sort((a, b) => a.name.localeCompare(b.name));
  updateTable();
}

function resetList() {
  updateTable();
}

function searchProduct() {
  const term = document.getElementById("search").value.toLowerCase();
  const result = inventory.filter(p => p.name.toLowerCase().includes(term));
  display(result);
}

function updateTable() {
  display(inventory);
}

function display(list) {
  // Table view
  const tbody = document.querySelector("#productTable tbody");
  tbody.innerHTML = "";

  // Card view
  const cardsRow = document.getElementById('cardsRow');
  cardsRow.innerHTML = "";

  list.forEach((item) => {
    // TABLE ROW
    const tr = document.createElement("tr");
    if (item.qty <= 5) tr.classList.add("low-stock");

    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>₱${item.price.toFixed(2)}</td>
      <td>₱${item.getTotal()}</td>
      <td><button onclick="deleteProductById('${item.id}')">Delete</button></td>
    `;
    tbody.appendChild(tr);

    // CARD
    const card = document.createElement("div");
    card.className = "card";
    if (item.qty <= 5) card.classList.add("low-stock");
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Qty:</strong> ${item.qty}</p>
      <p><strong>Price:</strong> ₱${item.price.toFixed(2)}</p>
      <p><strong>Total (tax+disc):</strong> ₱${item.getTotal()}</p>
      <p><button onclick="deleteProductById('${item.id}')">Delete</button></p>
    `;
    cardsRow.appendChild(card);
  });

  // Summary (based on displayed list)
  const totalItems = list.length;
  const totalValue = list.reduce((sum, p) => sum + parseFloat(p.getTotal()), 0);
  document.getElementById("summary").innerHTML =
    `Total Products: ${totalItems} | Total Inventory Value: ₱${totalValue.toFixed(2)}`;

  // Toggle visibility according to viewMode
  if (viewMode === 'table') {
    document.getElementById('productTable').style.display = '';
    document.getElementById('cardContainer').style.display = 'none';
  } else {
    document.getElementById('productTable').style.display = 'none';
    document.getElementById('cardContainer').style.display = '';
  }
}

function clearInputs() {
  document.getElementById("pname").value = "";
  document.getElementById("pqty").value = "";
  document.getElementById("pprice").value = "";
}

function toggleView() {
  viewMode = (viewMode === 'table') ? 'card' : 'table';
  updateTable();
}

// initialize sample data (optional) — remove or comment out if you want empty start
(function seed() {
  inventory.push(new Product('Laptop', 3, 45000));
  inventory.push(new Product('Mouse', 15, 350));
  inventory.push(new Product('Keyboard', 7, 700));
  inventory.push(new Product('Mango', 12, 80));
  inventory.push(new Product('Notebook', 2, 120));
  updateTable();
})();