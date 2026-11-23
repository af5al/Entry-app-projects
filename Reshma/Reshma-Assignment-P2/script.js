const name = "Laptop";
const basePrice = 75000;
const discountPercent = 5;
const taxRate = 10;
const stockStatus ="in_Stock";


function calculateDiscountedPrice(price, discount){
    let discountPrice = price - (price*discount /100);
    return discountPrice;
}
const calculateTax = (price, taxRate) => price * taxRate / 100;
const calculateFinalPrice = (price, taxAmt) => price + taxAmt;

function isFreeShipping(finalPrice){
    if (finalPrice >= 500) {
    return "Free Shipping";
  } else {
    return "Shipping: Rs.49";
  }
}

function getStockMessage(status){
    if (status === "in_Stock") {
    return "In Stock";
  } else if (status === "limited") {
    return "Limited Stock";
  } else if (status === "out_of_stock") {
    return "Out of Stock";
  } else {
    return "Invalid Status";
  }
}

console.log("Base Price",basePrice)
const discountAmt = calculateDiscountedPrice(basePrice,discountPercent);
console.log("Discount Price : ",discountAmt);

const taxAmount = calculateTax(discountAmt, taxRate);
console.log("Tax Amount : ",taxAmount);

const finalPrice = calculateFinalPrice(discountAmt,taxAmount);
console.log("Final Price : ", finalPrice)

console.log("Shipping Details : ", isFreeShipping(finalPrice));
console.log("Stock Status: ",getStockMessage(stockStatus));
