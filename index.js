function handleFormSubmit(event) {
  event.preventDefault();
  const vegitableDetails = {
    vegName: event.target.vegName.value,
    price: event.target.price.value,
    quantity: event.target.quantity.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/fb470870f4b845c685101c1578108330/Vegetable",
      vegitableDetails
    )
    .then((response) => displayVegitables(response.data))
    .catch((error) => console.log(error));

  document.getElementById("vegName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("quantity").value = "";
}

// function to displa data on Screen:

function displayVegitables(vegitableDetails) {
  const vegItem = document.createElement("li");
  // adding veg to list
  vegItem.appendChild(
    document.createTextNode(
      `${vegitableDetails.vegName}     Rs: ${vegitableDetails.price}     ${vegitableDetails.quantity} Kg  `
    )
  );
  const vegitableLists = document.querySelector("ul"); // Remember this

  // ##adding input field to list:
  const customerInput = document.createElement("input");

  customerInput.type = "number";
  customerInput.id = "vegitableLists"; // remember this to access it
  customerInput.name = "customerValue";
  customerInput.placeholder = "0";
  vegItem.appendChild(customerInput);
  vegitableLists.appendChild(vegItem);

  //## Buy Button
  const buyBtn = document.createElement("button");
  buyBtn.classList = "btn btn-outline-info";
  buyBtn.appendChild(document.createTextNode("Buy"));
  vegItem.appendChild(buyBtn);

  //## Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList = "btn btn-outline-info";
  deleteBtn.appendChild(document.createTextNode("Delete"));
  vegItem.appendChild(deleteBtn);

  //## Delete functionality:

  deleteBtn.addEventListener("click", function (event) {
    vegitableLists.removeChild(event.target.parentElement);
    axios
      .delete(
        `https://crudcrud.com/api/fb470870f4b845c685101c1578108330/Vegetable/${vegitableDetails._id}`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });

  //## Buy Button functionality:
  buyBtn.addEventListener("click", function (event) {
    const customerQuantity = document.getElementById("vegitableLists").value;
    let vegStock = vegitableDetails.quantity;

    vegStock = vegStock - customerQuantity;
    //## crucial part
    axios
      .put(
        `https://crudcrud.com/api/fb470870f4b845c685101c1578108330/Vegetable/${vegitableDetails._id}`,
        {
          vegName: vegitableDetails.vegName,
          price: vegitableDetails.price,
          quantity: vegStock, // Send updated quantity along with vegName and price
        }
        // Send updated quantity only
      )
      .then((response) => {
        // Update displayed quantity after successful update
        vegitableDetails.quantity = vegStock;
        vegItem.firstChild.textContent = `${vegitableDetails.vegName} Rs: ${vegitableDetails.price} ${vegStock} Kg `;
        console.log(response.data); // Log the response
      })
      .catch((error) => {
        console.log(error); // Log any errors
      });

    console.log(vegStock);
  });
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("https://crudcrud.com/api/fb470870f4b845c685101c1578108330/Vegetable")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        displayVegitables(res.data[i]);
      }
    })
    .catch((err) => console.log(err));
});
