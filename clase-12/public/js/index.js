
const socket = io();
const productsList = document.getElementById("productsList");
const addForm = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");

// Agregar productos
addForm.addEventListener("submit", async (e) => {

  e.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title, price, description})
  })

  addForm.reset();

})
// Eliminar productos

deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  deleteForm.reset();
})

// Recibir los productos

socket.on("products", (data) => {
  console.log(data);
  // productsList.innerHTML = "";
  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">ID: ${product.id}</p>
        <p class="card-text">${product.description}</p>
        <p class="card-text">$${product.price}</p>
      </div>
    `;

    productsList.appendChild(card);
  })
})