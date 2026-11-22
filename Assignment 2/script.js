let productName = "Smartphone";
let basePrice = 800;
let discountPercent = 10;
let taxRate = 15;
let stockStatus = "in_stock";   

const calculateDiscountedPrice = (price, discount) => {
    return price - (price * (discount / 100));
}

const calculateTax = (price, taxRate) => {
    return price * (taxRate / 100);
}

const calculateFinalPrice = (price, discount, taxRate) => {
    const discountedPrice = calculateDiscountedPrice(price, discount);
    const taxAmount = calculateTax(discountedPrice, taxRate);
    return discountedPrice + taxAmount;
}

const isFreeShipping = (finalPrice) => {
    return finalPrice >= 500 ? 'Free Shipping' : 'Shipping: Rs.49';
}

const getStockMessage = (status) => {
    switch (status) {
        case 'in_stock':
            return 'In Stock';
        case 'limited':
            return 'Limited Stock';
        case 'out_of_stock':
            return 'Out of Stock';
        default:
            return 'Unknown Status';
    }
}

// Calling all functions
const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);

const taxAmount = calculateTax(discountedPrice, taxRate);

const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);

const shippingMessage = isFreeShipping(finalPrice);

const stockMessage = getStockMessage(stockStatus);

// Printing the complete price summary
console.log("----- PRODUCT PRICE SUMMARY -----");
console.log("Product Name:", productName);
console.log("Base Price: Rs.", basePrice);
console.log("Discount:", discountPercent + "%");
console.log("Discounted Price: Rs.", discountedPrice);
console.log("Tax Rate:", taxRate + "%");
console.log("Tax Amount: Rs.", taxAmount);
console.log("Final Price: Rs.", finalPrice.toFixed(2));
console.log("Shipping:", shippingMessage);
console.log("Stock Status:", stockMessage);
console.log("---------------------------------");
