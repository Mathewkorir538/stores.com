document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".product-item button:first-of-type");

  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

  
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
});