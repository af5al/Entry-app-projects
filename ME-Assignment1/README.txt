FashionHub - static HTML/CSS site (11 pages + 1 stylesheet)

1. Get the images: double-click download-assets.bat (Windows) or run ./download-assets.sh (Mac/Linux).
   It saves all 55 Figma images/icons into the assets/ folder. Figma's links expire 7 days after 17 Nov 2026.
2. Open index.html in a browser. Bootstrap 5.3 and Google Fonts (Inter, Montserrat) load from CDN, so stay online.

Pages
  index.html               Home (from Figma)
  products.html            Products catalog (from Figma)
  product-details.html     Product details (from Figma)
  cart.html                Shopping cart (from Figma)
  checkout.html            Checkout (from Figma)
  register.html            Register      - built in the same style; Figma frame could not be read
  login.html               Login         - built in the same style; Figma frame could not be read
  wishlist.html            Wishlist      - built in the same style; Figma frame could not be read
  order-confirmation.html  Order confirm - built in the same style; Figma frame could not be read
  about.html               About         - built in the same style; Figma frame could not be read
  contact.html             Contact       - built in the same style; Figma frame could not be read

css/style.css: one shared stylesheet. Page layouts use CSS Grid (12-column footer/cart/checkout,
bento category grid, product grid) and Flexbox (header, cards, forms). Bootstrap is only used
lightly for reset, spacing utilities (d-flex, gap-*) and form controls.
