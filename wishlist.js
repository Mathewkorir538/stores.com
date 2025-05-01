document.addEventListener("DOMContentLoaded", () => {
    const wishlistItemsContainer = document.getElementById("wishlist-items");

    
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

   
    function renderWishlist() {
        wishlistItemsContainer.innerHTML = "";

        wishlist.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("wishlist-item");
            itemElement.innerHTML = `
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            wishlistItemsContainer.appendChild(itemElement);
        });
    }

   
    wishlistItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-btn")) {
            const index = event.target.getAttribute("data-index");
            wishlist.splice(index, 1); 
            localStorage.setItem("wishlist", JSON.stringify(wishlist)); 
            renderWishlist(); 
        }
    });

   
    renderWishlist();
});