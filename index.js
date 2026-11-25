// Product Variables
let productName = "Wireless Headphones";
let basePrice = 800;
let discountPercent = 10;
let taxRate = 18;
let stockStatus = "limited";

// Calculate Discounted Price
function calculateDiscountedPrice(price, discount) {
    return price - (price * discount / 100);
}

// Calculate Tax Amount
function calculateTax(price, taxRate) {
    return price * taxRate / 100;
}

// Calculate Final Price
function calculateFinalPrice(price, discount, taxRate) {
    let discountedPrice = calculateDiscountedPrice(price, discount);
    let taxAmount = calculateTax(discountedPrice, taxRate);
    return discountedPrice + taxAmount;
}

//  Check Free Shipping
function isFreeShipping(finalPrice) {
    if (finalPrice >= 500) {
        return "Free Shipping";
    } else {
        return "Shipping: Rs.49";
    }
}

// Get Stock Message
function getStockMessage(status) {
    switch (status) {
        case "in_stock":
            return "In Stock";
        case "limited":
            return "Limited Stock";
        case "out_of_stock":
            return "Out of Stock";
        default:
            return "Invalid Stock Status";
    }
}

// Function Calls
let discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
let taxAmount = calculateTax(discountedPrice, taxRate);
let finalPrice = calculateFinalPrice(
    basePrice,
    discountPercent,
    taxRate
);
let shippingMessage = isFreeShipping(finalPrice);
let stockMessage = getStockMessage(stockStatus);

// Price Summary
console.log("----- PRODUCT PRICE SUMMARY -----");
console.log("Product Name:", productName);
console.log("Base Price: Rs.", basePrice);
console.log("Discount Percentage:", discountPercent + "%");
console.log("Discounted Price: Rs.", discountedPrice);
console.log("Tax Amount: Rs.", taxAmount);
console.log("Final Price: Rs.", finalPrice);
console.log("Shipping:", shippingMessage);
console.log("Stock Status:", stockMessage);