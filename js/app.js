// Array untuk menyimpan item keranjang
let cart = [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(productName, productPrice, productQty) {
  const total = productPrice * productQty;
  const product = { name: productName, price: productPrice, qty: productQty, total: total };
  cart.push(product);
  renderCart();
}

// Fungsi untuk render item di keranjang
function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const row = `
      <tr>
        <td class="border px-4 py-2">${item.name}</td>
        <td class="border px-4 py-2">${item.price}</td>
        <td class="border px-4 py-2">${item.qty}</td>
        <td class="border px-4 py-2">${item.total}</td>
        <td class="border px-4 py-2">
          <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="removeItem(${index})">Hapus</button>
        </td>
      </tr>
    `;
    cartItems.innerHTML += row;
  });

  updateTotal();
}

// Fungsi untuk menghitung total harga
function updateTotal() {
  const totalPriceElement = document.getElementById('total-price');
  const total = cart.reduce((sum, item) => sum + item.total, 0);
  totalPriceElement.innerText = `IDR ${total}`;
}

// Fungsi untuk menghapus item dari keranjang
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

// Event listener untuk form tambah produk
document.getElementById('product-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const productName = document.getElementById('product-name').value;
  const productPrice = parseFloat(document.getElementById('product-price').value);
  const productQty = parseInt(document.getElementById('product-qty').value);

  if (productName && productPrice && productQty) {
    addToCart(productName, productPrice, productQty);

    // Reset form
    document.getElementById('product-form').reset();
  }
});

// Event listener untuk tombol checkout
document.getElementById('checkout').addEventListener('click', function () {
  if (cart.length > 0) {
    alert(`Total belanja: IDR ${cart.reduce((sum, item) => sum + item.total, 0)}`);
    cart = [];
    renderCart();
  } else {
    alert('Keranjang masih kosong.');
  }
});