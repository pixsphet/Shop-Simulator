function displayProducts() {
  const table = document.getElementById("products-table");
  table.innerHTML = "";
  products.forEach(p => {
    const row = `<tr>
      <td class="px-4 py-2">${p.id}</td>
      <td class="px-4 py-2">${p.name}</td>
      <td class="px-4 py-2">${p.price.toLocaleString()} ฿</td>
      <td class="px-4 py-2 ${p.stock === 0 ? 'text-red-500' : ''}">${p.stock}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

function displayCart() {
  const table = document.getElementById("cart-table");
  table.innerHTML = "";
  user.shoppingCart.forEach(item => {
    const row = `<tr>
      <td class="px-4 py-2">${item.productId}</td>
      <td class="px-4 py-2">${item.quantity}</td>
    </tr>`;
    table.innerHTML += row;
  });
}

function processOrder(customer, productList) {
  const summary = document.getElementById("summary");
  const summaryList = document.getElementById("summary-list");
  const summaryTotal = document.getElementById("summary-total");
  summaryList.innerHTML = "";

  const enrichedCart = customer.shoppingCart.map(item => {
    const product = productList.find(p => p.id === item.productId);
    if (!product || product.stock < item.quantity) {
      summaryList.innerHTML += `<li class='text-red-600'>❌ ${product?.name || 'ไม่พบ'} ไม่พร้อมจำหน่าย</li>`;
      return null;
    }
    return {
      ...product,
      quantity: item.quantity,
      subtotal: product.price * item.quantity
    };
  }).filter(item => item !== null);

  const total = enrichedCart.reduce((sum, item) => sum + item.subtotal, 0);
  enrichedCart.sort((a, b) => b.price - a.price);

  enrichedCart.forEach(item => {
    summaryList.innerHTML += `<li>${item.name} x ${item.quantity} = ${item.subtotal.toLocaleString()} ฿</li>`;
  });

  summaryTotal.textContent = `💸 ราคารวมสุทธิ ${total.toLocaleString()} ฿`;
  summary.classList.remove("hidden");
}

displayProducts();
displayCart();
