
const name = "Iphone16 Pro Max";
const basePrice = 45000; 
const discountPercent = 15; 
const taxRate = 18; 
const stockStatus = "in_stock"; 


function calculateDiscountedPrice(price, discount) {
  const discountAmount = (price * discount) / 100;
  return price - discountAmount;
}


function calculateTax(price, taxRate) {
  return (price * taxRate) / 100;
}


function calculateFinalPrice(price, discount, taxRate) {
  const discountedPrice = calculateDiscountedPrice(price, discount);
  const taxAmount = calculateTax(discountedPrice, taxRate);
  return discountedPrice + taxAmount;
}


function isFreeShipping(finalPrice) {
  if (finalPrice >= 500) {
    return "Free Shipping";
  } else {
    return "Shipping: Rs.49";
  }
}

function getStockMessage(status) {
  switch (status) {
    case "in_stock":
      return "In Stock";
    case "limited":
      return "Limited Stock";
    case "out_of_stock":
      return "Out of Stock";
    default:
      return "Unknown Status";
  }
}


const discountedPrice = calculateDiscountedPrice(basePrice, discountPercent);
const discountAmount = basePrice - discountedPrice;
const taxAmount = calculateTax(discountedPrice, taxRate);
const finalPrice = calculateFinalPrice(basePrice, discountPercent, taxRate);
const shippingInfo = isFreeShipping(finalPrice);
const availability = getStockMessage(stockStatus);


console.log("***=== Product Price Summary ===***");
console.log("Product Name:     " + name);
console.log("Base Price:       Rs." + basePrice.toFixed(2));
console.log("Discount (" + discountPercent + "%):   Rs." + discountAmount.toFixed(2));
console.log("Tax (" + taxRate + "%):        Rs." + taxAmount.toFixed(2));
console.log("Final Price:      Rs." + finalPrice.toFixed(2));
console.log("Shipping:         " + shippingInfo);
console.log("Availability:     " + availability);
console.log("***=======================***");