

document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicators li');

    if (items.length === 0 || indicators.length === 0) {
        console.error("Carousel items or indicators not found.");
        return;
    }

    let currentIndex = 0;
    const totalItems = items.length;
    const intervalTime = 4000;
    
    // Function to activate a specific slide
    function activateSlide(index) {
        items.forEach((item, i) => {
            item.classList.remove('active');
            indicators[i].classList.remove('active');
        });
        items[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            clearInterval(autoSlide);  // Stop auto slide
            activateSlide(index);
            currentIndex = index;
            autoSlide = setInterval(nextSlide, intervalTime);  // Restart auto slide
        });
    });

    // Function to go to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        activateSlide(currentIndex);
    }

    // Auto slide every 4 seconds
    let autoSlide = setInterval(nextSlide, intervalTime);
});




// product Details

function productDetailPage(){
    const powerItems=document.querySelectorAll(".power-tools-list");
    const handItems=document.querySelectorAll(".hand-tools-list");
    const accessoriesItems=document.querySelectorAll(".accessories-tools-list");
    const safetyItems=document.querySelectorAll(".safety-tools-list");
    const DIYItems=document.querySelectorAll(".DIY-tools-list");
    

// Redirecting to Product Details Page function

    function redirectToProductDetailsPage(itemType,itemName,itemPrice,itemImageSrc){
        const url = `Product_Details.html?itemType=${encodeURIComponent(itemType)}
                                        &itemName=${encodeURIComponent(itemName)}
                                        &itemPrice=${encodeURIComponent(itemPrice)}
                                        &itemImageSrc=${encodeURIComponent(itemImageSrc)}`;
        window.location.href= url;
    }

// Handling Item Click function

    function handelItemClick(event){
        const clickedItem = event.target.closest('.power-tools-list, .hand-tools-list, .accessories-tools-list, .safety-tools-list, .DIY-tools-list');
        if (!clickedItem)return;

        // condition ? valueIfTrue : valueIfFalse
            const itemType = clickedItem.classList.contains("power-tools-list") ? "power-tools"
                            :clickedItem.classList.contains("hand-tools-list") ? "hand-tools"
                            :clickedItem.classList.contains("accessories-tools-list") ? "accessories-tools"
                            :clickedItem.classList.contains("safety-tools-list") ? "safety-tools" :  "DIY-tools";

        // Redirect to product details page if clicked on buttons
        if(event.target.closest('.power-tools-view-btn') || event.target.closest('.hand-tools-view-btn') || event.target.closest('.accessories-tools-view-btn') || event.target.closest('.safety-tools-view-btn')  || event.target.closest('.DIY-tools-view-btn')){
            return;
        }
        const itemName = clickedItem.querySelector(`.${itemType}-details h3`).textContent;
        const itemPrice= clickedItem.querySelector(`.${itemType}-details span`).textContent;
        const itemImageSrc=clickedItem.querySelector(`.icons3`).getAttribute('src');

        redirectToProductDetailsPage(itemType, itemName, itemPrice, itemImageSrc);
    }

    powerItems.forEach(function (item) {
        item.addEventListener("click", handelItemClick);
    });

    handItems.forEach(function (item) {
        item.addEventListener("click", handelItemClick);
    });

    accessoriesItems.forEach(function (item) {
        item.addEventListener("click", handelItemClick);
    });

    safetyItems.forEach(function (item) {
        item.addEventListener("click", handelItemClick);
    });

    DIYItems.forEach(function (item) {
        item.addEventListener("click", handelItemClick);
    });


    // Get the query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemName = urlParams.get('itemName');
    const itemPrice = urlParams.get('itemPrice');
    const itemType = urlParams.get('itemType');
    const itemImageSrc = urlParams.get('itemImageSrc');

    // Display the item details in the .product div element
    if (itemName && itemPrice && itemType && itemImageSrc) {
        const productDetails = document.querySelector(".product-wrapper");
        const productHTML = `
            <div class="product-list">
                <div class="item-image">
                    <img src="${itemImageSrc}" alt="${itemName}">
                </div>

                <div class="item-details">
                    <h3>${itemName}</h3>
                    <p> ${itemType}</p>
                    
                    <span> ${itemPrice}</span>
                    
                    <div class="${itemType}-cart-btn">
                        <img src="./asset/nav-list/shopping-bag.png" alt="Add to bag" class="icons">
                                    <span>Add to Cart</span>
                                </div>


                </div>
                
                
            </div>
        `;
        productDetails.innerHTML = productHTML;
    }
}
productDetailPage();


// Function to add a product to the cart
function addToCart(product) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const existingProduct = cartItems.find(item => item.name === product.name);

    if (existingProduct) {
        // If the product exists, increase the quantity
        existingProduct.quantity += 1;
    } else {
        // Add new product with quantity 1
        cartItems.push({ ...product, quantity: 1 });
    }

    // Save updated cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Notify the user
    alert(`${product.name} has been added to the cart!`);
}

// Function to handle "Add to Cart" button clicks
function setupAddToCartButtons() {
    const cartButtons = document.querySelectorAll('.power-tools-cart-btn, .hand-tools-cart-btn, .accessories-tools-cart-btn, .safety-tools-cart-btn, .DIY-tools-cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const clickedButton = event.target.closest('.power-tools-list, .hand-tools-list, .accessories-tools-list, .safety-tools-list, .DIY-tools-list');
            if (!clickedButton) return;

            const product = {
                name: clickedButton.querySelector('h3').textContent,
                price: clickedButton.querySelector('span').textContent,
                image: clickedButton.querySelector('.icons3').getAttribute('src')
            };

            addToCart(product);
            event.stopPropagation();  // Prevent navigation if button is inside a link
        });
    });
}

// Function to display cart items on the cart page
function displayCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartContainer = document.querySelector('.cart-items-container');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty</p>';
        totalItemsElement.textContent = '0';
        totalPriceElement.textContent = '0';
        return;
    }

    let totalItems = 0;
    let totalPrice = 0;

    cartContainer.innerHTML = cartItems.map(item => {
        totalItems += item.quantity;
        totalPrice += parseFloat(item.price.replace('Rs ', '')) * item.quantity;

        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
        `;
    }).join('');

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = 'Rs ' + totalPrice.toFixed(2);
}

// Call the setupAddToCartButtons when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Check if the current page is the cart page
    if (document.querySelector('.cart-items-container')) {
        displayCartItems();
    }

    // Setup add to cart buttons for product pages
    setupAddToCartButtons();
});


// Toggle between Login and Registration forms
function showRegistration() {
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('registration-box').style.display = 'block';
}

function showLogin() {
    document.getElementById('registration-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
}

// Form validation (optional)
document.getElementById('registration-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    if (password !== confirmPassword) {
        document.getElementById('reg-error').textContent = "Passwords do not match!";
    } else {
        document.getElementById('reg-error').textContent = "";
        alert("Registration Successful");
    }
});

document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username && password) {
        document.getElementById('login-error').textContent = "";
        alert("Login Successful");
    } else {
        document.getElementById('login-error').textContent = "Invalid username or password!";
    }
});











