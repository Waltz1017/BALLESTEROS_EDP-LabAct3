const productCount = document.getElementById('productCount');
const customerName = document.getElementById('customerName');
const insertProducts = document.getElementById('insertProducts');
const validationMessage = document.getElementById('validationMessage');
const productsContainer = document.getElementById('productsContainer');
const deliveryOption = document.getElementById('deliveryOption');
const calculateBtn = document.getElementById('calculateBtn');
const orderSummary = document.getElementById('orderSummary');

function calculateDiscount(subtotal) {
    let discount = 0;

    if (subtotal >= 5000) {
        discount = 0.10;
    } else if (subtotal >= 3000) {
        discount = 0.07;
    } else if (subtotal >= 1000) {
        discount = 0.05;
    } else {
        discount = 0;
    }
    return subtotal * discount;
}

function getDeliveryFee(option) {

    switch (option) {
        case "selfPickup":
            deliveryFee = 0;
            break;
        case "standard":
            deliveryFee = 80;
            break;
        case "express":
            deliveryFee = 150;
            break;
        default:
            deliveryFee = 0;
    }
    return deliveryFee;
}

function calculateItemAmount(price, quantity) {
    const itemPrice = Number(price);
    const itemQuantity = Number(quantity);
    return itemPrice * itemQuantity;

}

insertProducts.addEventListener("click", function () {
    validationMessage.textContent = "";
    productsContainer.innerHTML = "";

    const count = Number(document.getElementById("productCount").value);

    if (customerName.value.trim() === "" || count <= 0) {
        validationMessage.textContent = "Please enter the customer's name and a valid product count.";
        return;
    } else {
        for (let i = 0; i < count; i++) {
            const productList = document.createElement('div');
            productList.innerHTML = `
            <h3>Product ${i + 1}</h3>
            
            <label for="productName-${i}">Product Name:</label>
            <input type="text" id="productName-${i}" required>
            
            <br><br>
            
            <label for="productPrice-${i}">Product Price:</label>
            <input type="number" id="productPrice-${i}" min="1" step="0.01" required>
            
            <br><br>
            
            <label for="productQuantity-${i}">Quantity:</label>
            <input type="number" id="productQuantity-${i}" min="1" required>
        `;
            productsContainer.appendChild(productList);
        }
    }
});

calculateBtn.addEventListener("click", function () {
    let subtotal = 0;
    let productDetails = "";

    const count = Number(document.getElementById("productCount").value);
    const deliveryFee = getDeliveryFee(deliveryOption.value);

    if (customerName.value.trim() === "" || count <= 0) {
        validationMessage.textContent = "Please enter your name or number of products";
    } else {
        for (let i = 0; i < count; i++) {
            const nameInput = document.getElementById(`productName-${i}`);
            const priceInput = document.getElementById(`productPrice-${i}`);
            const quantityInput = document.getElementById(`productQuantity-${i}`);

            const productNameValue = nameInput.value.trim();
            const price = Number(priceInput.value);
            const quantity = Number(quantityInput.value);

            const itemAmount = calculateItemAmount(price, quantity);
            subtotal += itemAmount;

            productDetails += `
                <p>
                    <strong>${productNameValue}</strong><br>
                    Price: ₱${price.toFixed(2)}<br>
                    Quantity: ${quantity}<br>
                    Amount: ₱${itemAmount.toFixed(2)}
                </p>
                <hr>
            `;
        }

        const discount = calculateDiscount(subtotal);

        const finalAmount = subtotal - discount + deliveryFee;

        orderSummary.innerHTML = `
            <h2>Order Summary</h2>
            ${productDetails}
            <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
            <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>
            <p>Discount: ₱${discount.toFixed(2)}</p>
            <p><strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong></p>
        `;
    }
});
