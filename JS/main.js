// Element references
var productName = document.getElementById("productName");
var productDescription = document.getElementById("productDescription");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var btnAddProduct = document.getElementById("btnAddProduct");
var productTable = document.getElementById("productTable");
var searchInput = document.getElementById("searchInput");

// Initialize products array from local storage or as an empty array
var products = JSON.parse(localStorage.getItem("products")) || [];

// Initial setup
btnAddProduct.innerHTML = "Add Product";
displayProducts(products);

// Main action handler
function action() {
    if (btnAddProduct.innerHTML === "Add Product") {
        addProduct();
    } else {
        editProduct();
    }
}

// Get product details from input fields
function getProduct() {
    var product = {
        name: productName.value,
        price: productPrice.value,
        description: productDescription.value,
        category: productCategory.value,
    }
    return product;
}

// Add a new product
function addProduct() {
    var product = getProduct();
    if (product) {
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(products);
        clearProductInputs();
    }
}

// Update an existing product
var currentIndex = -1; // Track the current index for updates

function updateProduct(index) {
    currentIndex = index;
    var product = products[index];
    productName.value = product.name;
    productPrice.value = product.price;
    productDescription.value = product.description;
    productCategory.value = product.category;

    btnAddProduct.innerHTML = "Update Product";
}

// Validate product fields
function validateProductFields() {
    nameRegex();
    priceRegex();
}

// Edit a product
function editProduct() {
    var product = getProduct();
    if (product) {
        products.splice(currentIndex, 1, product);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts(products);
        clearProductInputs();
        btnAddProduct.innerHTML = "Add Product";
    }
}

// Delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
}

// Display products in the table
function displayProducts(arr) {
    productTable.innerHTML = "";
    var cartona = ``;
    for (var i = 0; i < arr.length; i++) {
        cartona += `<tr class="">
                    <td>${i + 1}</td>
                    <td>${arr[i].name}</td>
                    <td>${arr[i].price}</td>
                    <td>${arr[i].category}</td>
                    <td>${arr[i].description}</td>
                    <td>
                        <button class="btn btn-warning" onclick="updateProduct(${i})">Update</button>
                        <button class="btn btn-danger" onclick="deleteProduct(${i})">Delete</button>
                    </td>
                  </tr>`;
    }
    productTable.innerHTML = cartona;
}

// Clear input fields
function clearProductInputs() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
    productName.classList.remove("is-invalid");
    productPrice.classList.remove("is-invalid");
    productCategory.classList.remove("is-invalid");
    productDescription.classList.remove("is-invalid");
    validateProductFields();
}

// Search products by name
function search() {
    var filter = [];
    var compare = searchInput.value.toLowerCase();
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(compare)) {
            filter.push(products[i]);
        }
    }
    displayProducts(filter);
}

// Regex validation for name
function nameRegex() {
    var name = productName.value;
    var regex = /^[A-Z][a-z\s\-'\d]+$/;
    if (!regex.test(name)) {
        productName.classList.add("is-invalid");
        btnAddProduct.disabled = true;
    } else {
        productName.classList.remove("is-invalid");
        btnAddProduct.disabled = false;
    }
}

// Regex validation for price
function priceRegex() {
    var price = productPrice.value;
    var regex = /^\d+(\.\d{1,2})?$/;
    if (!regex.test(price)) {
        productPrice.classList.add("is-invalid");
        btnAddProduct.disabled = true;
    } else {
        productPrice.classList.remove("is-invalid");
        btnAddProduct.disabled = false;
    }
}
