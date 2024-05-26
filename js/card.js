async function postOrder(cart) {
  try {
    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    const result = await response.json();
    console.log("Order successfully placed:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='cart__title'>Ваш кошик порожній</p>";
    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart__item";
    cartItem.innerHTML = `
          <div class="cart__item-content">
            <img src="../images/offer${item.id}.webp" alt="Offer ${item.id}">
            <div class="info">
              <h3>${item.name}</h3>
              <p>Ціна: ${item.price} &#8372;</p>
              <p>Кількість: ${item.quantity}</p>
            </div>
          </div>
          <button class="cart__button" onclick="removeFromCart(${item.id})">
            Видалити
          </button>
        `;
    cartContainer.appendChild(cartItem);
  });
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

async function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length > 0) {
    await postOrder(cart);
    alert("Ваше замовлення успішно оформлено!");
    localStorage.removeItem("cart");
    loadCart();
  } else {
    alert("Ваш кошик порожній");
  }
}

window.onload = loadCart;
