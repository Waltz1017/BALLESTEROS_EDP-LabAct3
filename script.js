const productCount = document.getElementById('productCount');
const customerName = document.getElementById('customerName');
const insertProducts = document.getElementById('insertProducts');
const validationMessage = document.getElementById('validationMessage');
const productsContainer = document.getElementById('productsContainer');
const deliveryOption = document.getElementById('deliveryOption');
const calculateBtn = document.getElementById('calculateBtn');
const orderSummary = document.getElementById('orderSummary');

productCountInput.addEventListener("change", () => {
  productContainer.innerHTML = "";
  const count = Number(productCountInput.value);

  for (let i = 0; i < count; i++) {
    const productHTML = `
      <h4>Product ${i+1}</h4>
      <label>Product Name:</label>
      <input type="text" id="productName-${i}"><br>
      <label>Price:</label>
      <input type="number" id="productPrice-${i}"><br>
      <label>Quantity:</label>
      <input type="number" id="productQuantity-${i}"><br><br>
    `;
    productContainer.insertAdjacentHTML("beforeend", productHTML);
  }
});

function calculateItemAmount(price, quantity) {
    const amount = price * quantity;
    return amount;
}

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

function getDeliveryFee(option) {

    switch (option) {
        case "1":
            return 0;
        case "2":
            return 80;
        case "3":
            return 150;
        default:
            return 0;
    }
}



calculateBtn.addEventListener("click", function () {
    validationMessage.textContent = "";
    orderSummary.innerHTML = "";

    const customerName = document.getElementById("customerName").value.trim();
    const productCount = Number(productCount.value);

    if (!customerName || productCount <= 0) {
        validationMessage.textContent = "Please enter a valid name and product count.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    const count = Number(document.getElementById("productCount").value);

    for (let i = 0; i < count; i++) {
        const name = document.getElementById(`productName-${i}`).value;
        const price = document.getElementById(`productPrice-${i}`).value;
        const quantity = document.getElementById(`productQuantity-${i}`).value;

        if (price <= 0 || quantity <= 0) {
            validationMessage.textContent = "Price and quantity are invalid.";
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
    const deliveryOption = document.getElementById("deliveryOption").value;
    const deliveryFee = getDeliveryFee(deliveryOption);
    const finalAmount = subtotal - discount + deliveryFee;

    orderSummary.innerHTML = `
            <h2>MINI STORE CHECKOUT SYSTEM</h2>
            <p>Customer: ${customerName}</p>
            ${productDetails}
            <h3>ORDER SUMMARY</h3>
            <p>Subtotal: ₱${subtotal.toFixed(2)}</p>
            <p>Discount Rate: ${(discount > 0 ? ((discount / subtotal) * 100).toFixed(0) + "%" : "No discount")}</p>
            <p>Discount Amount: ₱${discount.toFixed(2)}</p>
            <p>Delivery Type: ${deliveryOption === "1" ? "Store Pickup" :
                                deliveryOption === "2" ? "Standard Delivery" :
                                "Express Delivery"}</p>
            <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>
            <p><strong>Final Amount: ₱${finalAmount.toFixed(2)}</strong></p>
        `;
});
