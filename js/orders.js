async function fetchOrders() {
  try {
    const response = await fetch("http://localhost:5000/orders");
    const orders = await response.json();
    displayOrders(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

function displayOrders(orders) {
  const ordersBody = document.getElementById("ordersBody");
  ordersBody.innerHTML = "";

  orders.forEach((order) => {
    const orderRow = document.createElement("tr");
    orderRow.className = "product-table__row";

    const orderDetails = order.items
      .map(
        (item) => `
          <div>
            <strong>${item.name}</strong> - Кількість: ${item.quantity} - Ціна: ${item.price} &#8372;
          </div>
        `
      )
      .join("");

    orderRow.innerHTML = `
          <td class="product-table__cell">${orderDetails}</td>
          <td class="product-table__cell">${order.total} &#8372;</td>
          <td class="product-table__cell product-table__cell--actions">
            <button class="remove-button" onclick="removeOrder('${order._id}')">Видалити</button>
          </td>
        `;

    ordersBody.appendChild(orderRow);
  });
}

async function removeOrder(orderId) {
  try {
    const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete order");
    }

    fetchOrders();
  } catch (error) {
    console.error("Error deleting order:", error);
  }
}

window.onload = fetchOrders;
