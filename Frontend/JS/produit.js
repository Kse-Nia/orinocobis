let params = new URL(document.location).searchParams;
let id = params.get("id");

let docHtml = document.getElementById("produitContent");
let selecChoice = document.getElementById("lense");

fetch(`https://orinocuapi.herokuapp.com/api/cameras/${id}`)
  .then((response) => response.json())
  //
  .then((data) => {

    docHtml.innerHTML += `
    <div class="card  text-dark flex justify-content-center">
    <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    <img src=${
      data.imageUrl
    } class="card-img-top img-thumbnail " alt="présentation de l'appareil photo">
    <div class="mask" style="background-color: rgba(251, 251, 251, 0.15)"></div>
    <div class="card-body text-center">
      <h3 class="card-title">${data.name}</h3>
      <p class="card-text text-dark">${data.description}</p>
      <p class="card-text text-dark fw-bolder">${data.price / 100} € </p>
      <div class="select-box d-flex flex-column ">
      <select name="selection" id="lense">
      ${data.lenses.map(
        (lense) => `<option value="${lense}">${lense}</option>`
      )}
      <input id="addToCart" class="btn btn-primary mt-3" type="submit" value="Ajouter au panier">
      </select>
      </div>
    </div>
    </div>
  </div>`;

    document.getElementById("addToCart").addEventListener("click", onAddToCart);

    function onAddToCart(event) {
      event.preventDefault();
      const camera = getCamera();

      camera.push({
        idSelect: data._id,
        imageUrl: data.imageUrl,
        name: data.name,
        price: data.price / 100,
        quantity: 1,
      });
      localStorage.setItem("camera", JSON.stringify(camera));
    }

    function getCamera() {
      const camera = localStorage.getItem("camera");

      if (!camera) {
        return [];
      }

      try {
        const parsedCamera = JSON.parse(camera);
        return parsedCamera;
      } catch (e) {
        return [];
      }
    }
  });