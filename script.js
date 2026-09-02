
const productCount = document.getElementById('productCount');
const customerName = document.getElementById('customerName');
const insertProducts = document.getElementById('insertProducts');
const validationMessage = document.getElementById('validationMessage');
const productsContainer = document.getElementById('productsContainer');
const deliveryOption = document.getElementById('deliveryOption');
const calculateBtn = document.getElementById('calculateBtn');
const orderSummary = document.getElementById('orderSummary');
 
// Discount function
function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}
 
// Delivery fee function
function getDeliveryFee(option) {
    switch (option) {
        case "1": return 0;
        case "2": return 80;
        case "3": return 150;
        default: return 0;
    }
}
 
// Item amount function
function calculateItemAmount(price, quantity) {
    return Number(price) * Number(quantity);
}
 
// Insert product fields
insertProducts.addEventListener("click", function () {
    validationMessage.textContent = "";
    productsContainer.innerHTML = "";
 
    const count = Number(productCount.value);
    const customerNameValue = customerName.value.trim();
 
    if (customerNameValue === "" || isNaN(count) || count <= 0) {
        validationMessage.textContent = "Please enter the customer's name and a valid product count.";
        return;
    }
 
    for (let i = 0; i < count; i++) {
        const productList = document.createElement('div');
        productList.innerHTML = `
            <h3>Product ${i + 1}</h3>
            
            <label for="productName-${i}">Product Name:</label>
            <input type="text" id="productName-${i}" required>
            
            <br><br>
            
            <label for="productPrice-${i}">Price:</label>
            <input type="number" id="productPrice-${i}" min="0.01" step="0.01" required>
            
            <br><br>
            
            <label for="productQuantity-${i}">Quantity:</label>
            <input type="number" id="productQuantity-${i}" min="1" required>
        `;
        productsContainer.appendChild(productList);
    }
});
 
// Calculate order
calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    orderSummary.innerHTML = "<h2>Order Summary</h2>";
 
    const customerNameValue = customerName.value.trim();
    const count = Number(productCount.value);
 
    if (customerNameValue === "" || isNaN(count) || count <= 0) {
        validationMessage.textContent = "Please enter your name and a valid number of products.";
        return;
    }
 
    let subtotal = 0;
    let productDetails = "";
 
    for (let i = 0; i < count; i++) {
        const name = document.getElementById(`productName-${i}`).value.trim();
        const price = Number(document.getElementById(`productPrice-${i}`).value);
        const quantity = Number(document.getElementById(`productQuantity-${i}`).value);
 
        if (!name || isNaN(price) || price <= 0 || isNaN(quantity) || quantity <= 0) {
            validationMessage.textContent = `Please fill in valid details for Product ${i + 1} (name, price, and quantity).`;
            return;
        }
 
        const amount = calculateItemAmount(price, quantity);
        subtotal += amount;
 
        productDetails += `
            <p>
                <strong>${name}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${amount.toFixed(2)}
            </p>
            <hr>
        `;
    }
 
    const discount = calculateDiscount(subtotal);
    const deliveryFee = getDeliveryFee(deliveryOption.value);
    const finalAmount = subtotal - discount + deliveryFee;
 
    orderSummary.innerHTML += `
        <p>Customer: ${customerNameValue}</p>
        ${productDetails}
        <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
        <p>Discount Rate: ${(discount > 0 ? ((discount / subtotal) * 100).toFixed(0) + "%" : "No discount")}</p>
        <p>Discount: ₱${discount.toFixed(2)}</p>
        <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>
        <p>Delivery Type: ${deliveryOption.value === "1" ? "Store Pickup" :
            deliveryOption.value === "2" ? "Standard Delivery" :
                "Express Delivery"
        }</p>
        <p><strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong></p>
    `;
});