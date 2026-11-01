
// ========================================
// DOCTOR STEVE WIGS - JAVASCRIPT
// ========================================

// 1. PRODUCT DATABASE
const products = [
  {
    id: "wig-1",
    name: "Everyday Synthetic Wig",
    description: "An everyday style. Ask us about colours and length.",
    price: "Ask for price",
    image: "images/wig1.jpg"
  },
  {
    id: "wig-2",
    name: "Premium Style Wig",
    description: "Ask about available premium styles.",
    price: "Ask for price",
    image: "images/wig2.jpg"
  },
  {
    id: "wig-3",
    name: "Curly Style Wig",
    description: "Ask about curl patterns and available colours.",
    price: "Ask for price",
    image: "images/wig3.jpg"
  },
  {
    id: "wig-4",
    name: "Straight Style Wig",
    description: "Ask about length, texture and availability.",
    price: "Ask for price",
    image: "images/wig4.jpg"
  }
];

// 2. WHATSAPP BUSINESS NUMBER
const WHATSAPP_NUMBER = "254111405008";

// 3. SELECT HTML ELEMENTS
const productGrid = document.getElementById("productGrid");
const productSelect = document.getElementById("productSelect");
const searchInput = document.getElementById("search");
const orderForm = document.getElementById("orderForm");

// 4. CREATE WHATSAPP LINK
function makeWhatsAppLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);
}

// 5. DISPLAY PRODUCTS
function renderProducts(searchTerm = "") {

  const term = searchTerm.trim().toLowerCase();

  const filteredProducts = products.filter(product =>
    (product.name + " " + product.description)
      .toLowerCase()
      .includes(term)
  );

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {
    productGrid.innerHTML =
      '<p class="empty">No matching wigs found. Try another search.</p>';
    return;
  }

  filteredProducts.forEach(product => {

    const card = document.createElement("article");
    card.className = "product";

    // PRODUCT IMAGE
    const photo = document.createElement("div");
    photo.className = "product-photo";

    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.loading = "lazy";

    img.onerror = function () {
      photo.textContent = "Product image coming soon";
    };

    photo.appendChild(img);

    // PRODUCT INFORMATION
    const info = document.createElement("div");
    info.className = "product-info";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = product.price;

    // WHATSAPP BUTTON
    const button = document.createElement("a");
    button.className = "btn btn-green";
    button.textContent = "Enquire on WhatsApp";

    button.href = makeWhatsAppLink(
      "Hello Doctor Steve Wigs! I am interested in " +
      product.name +
      ". Please confirm the price and availability."
    );

    button.target = "_blank";
    button.rel = "noopener";

    info.append(title, description, price, button);
    card.append(photo, info);

    productGrid.appendChild(card);
  });
}

// 6. ADD PRODUCTS TO ORDER FORM
products.forEach(product => {

  const option = document.createElement("option");

  option.value = product.id;
  option.textContent = product.name;

  productSelect.appendChild(option);

});

// 7. PRODUCT SEARCH FUNCTION
searchInput.addEventListener("input", function () {

  renderProducts(searchInput.value);

});

// 8. CUSTOMER ORDER FORM
orderForm.addEventListener("submit", function (event) {

  event.preventDefault();

  // GET CUSTOMER DETAILS
  const name = document.getElementById("customerName").value.trim();

  const phone = document.getElementById("customerPhone").value.trim();

  const productId = productSelect.value;

  const quantity = Number(
    document.getElementById("quantity").value
  );

  const fulfilment =
    document.getElementById("fulfilment").value;

  const details =
    document.getElementById("message").value.trim();

  // FIND SELECTED PRODUCT
  const product = products.find(item =>
    item.id === productId
  );

  // VALIDATE INFORMATION
  if (!name || !phone || !product || !Number.isInteger(quantity) ||
      quantity < 1 || quantity > 20) {

    alert("Please enter valid information in all required fields.");

    return;
  }

  // CREATE WHATSAPP MESSAGE
  const message =
    "NEW ENQUIRY - DOCTOR STEVE WIGS\n\n" +

    "Customer Name: " + name + "\n" +

    "Customer Phone: " + phone + "\n" +

    "Product: " + product.name + "\n" +

    "Quantity: " + quantity + "\n" +

    "Collection/Delivery: " + fulfilment + "\n" +

    "Additional Details: " + (details || "None") + "\n\n" +

    "Please confirm the current price, availability and payment options.";

  // OPEN WHATSAPP
  window.open(
    makeWhatsAppLink(message),
    "_blank"
  );

});

// 9. AUTOMATIC COPYRIGHT YEAR
document.getElementById("year").textContent =
  new Date().getFullYear();

// 10. INITIALIZE WEBSITE
renderProducts();

console.log("Doctor Steve Wigs website loaded successfully!");
