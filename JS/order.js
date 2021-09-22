function orderConfirmation() {
  let data = JSON.parse(localStorage.getItem("sendOrder"));
  let orderContainer = document.getElementsByClassName("produitContent")[0];
  orderContainer.innerHTML += `
<div class="orderConfirmationText mx-auto text-center lh-lg">
    <p>Votre commande <span class="fw-bolder"> N° ${data.orderId}</span>vient d'être prise en compte.</p>
    <p>Merci <span class="fw-bolder">${data.contact.firstName}</span> d'avoir effectué votre achat sur notre site.</p>
</div>
`;

  console.log(data.orderId);
}
orderConfirmation();