document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    const sortSelect = document.getElementById("sort");
    const addToCartButtons = document.querySelectorAll(".product-item button:first-of-type");
    const addToWishlistButtons = document.querySelectorAll(".product-item .wishlist-button");

   
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

   
    function saveWishlist() {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

  
    function sortProducts(criteria) {
        const products = Array.from(productList.children);

        products.sort((a, b) => {
            const nameA = a.querySelector("h3").textContent.toLowerCase();
            const nameB = b.querySelector("h3").textContent.toLowerCase();
            const priceA = parseFloat(a.querySelector("p").textContent.replace("Price: $", ""));
            const priceB = parseFloat(b.querySelector("p").textContent.replace("Price: $", ""));

            switch (criteria) {
                case "price-asc":
                    return priceA - priceB;
                case "price-desc":
                    return priceB - priceA;
                case "name-asc":
                    return nameA.localeCompare(nameB);
                case "name-desc":
                    return nameB.localeCompare(nameA);
                default:
                    return 0; 
            }
        });

      
        products.forEach((product) => productList.appendChild(product));
    }

    
    sortSelect.addEventListener("change", (event) => {
        sortProducts(event.target.value);
    });

  
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product-item");
            const name = productElement.querySelector("h3").textContent;
            const price = parseFloat(
                productElement.querySelector("p").textContent.replace("Price: $", "")
            );

           
            const existingItem = cart.find((item) => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            saveCart();
            alert(`${name} has been added to your cart!`);
        });
    });

   
    addToWishlistButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product-item");
            const name = productElement.querySelector("h3").textContent;
            const price = parseFloat(
                productElement.querySelector("p").textContent.replace("Price: $", "")
            );

            
            const existingItem = wishlist.find((item) => item.name === name);
            if (existingItem) {
                alert(`${name} is already in your wishlist!`);
            } else {
                wishlist.push({ name, price });
                saveWishlist();
                alert(`${name} has been added to your wishlist!`);
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");

    
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault(); 

        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

       
        console.log("Contact Form Submitted:");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);

       
        alert("Thank you for contacting us, " + name + "! We will get back to you soon.");
        contactForm.reset(); 
    });
});