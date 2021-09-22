// Définir les variables

const docHtml = document.getElementById("container");

fetch("https://orinocuapi.herokuapp.com/api/cameras")
  .then((response) => response.json())

  // Message d'erreur si les articles ne s'affichent pas / le server n'est pas lancé
  .catch((error) => {
    docHtml.innerHTML = "Erreur 404 - aucun article à afficher";
    docHtml.style.textAlign = "center";
    docHtml.style.padding = "20vh";
  })

  .then((data) => {
    // Formatage du prix pour l'afficher correctement
    data.price = data.price / 100;

    for (let i = 0; i < data.length; i++) {
      docHtml.innerHTML += `
      <div class="card  text-dark">
      <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
      <a href="produit.html?id=${data[i]._id}" />
      <img src=${
        data[i].imageUrl
      } class="card-img-top img-thumbnail" alt="un appareil photo">
      <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
      <div class="card-body text-center">
        <h3 class="card-title">${data[i].name}</h3>
        <p class="card-text text-dark">${data[i].description}</p>
        <p class="card-text text-dark fw-bolder">${data[i].price / 100} € </p>
      </div>
      </a>
      </div>
    </div>
      `;
    }
  });