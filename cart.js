document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");

  
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

 
    function renderCart() {
        cartItemsContainer.innerHTML = ""; 
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    
    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart(); 
        }
    });

   
    renderCart();
});