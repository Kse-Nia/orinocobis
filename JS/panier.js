// Variables:

let recup = JSON.parse(localStorage.getItem("camera"));
let affichagePanier = document.getElementById("table");
let containerPanier = document.getElementById("containerCart");

let delateCart = document.getElementById("btnDelate");
let confirmCart = document.getElementById("btnConfirm");

// -------------------------------------------- Injection code HTML Panier -------------------------------------------- //

if (recup === null) {
  let emptyCartText = document.createTextNode("Votre panier est vide");
  affichagePanier.appendChild(emptyCartText);
} else {
  affichagePanier.innerHTML += `
<tr>
    <th class="produit">Produit</th>
    <th>Nom</th>
    <th>Quantité</th>
    <th>Prix</th>
</tr>`;

  let resultTotal = 0;
  let totalCommand = 0;

  for (let i = 0; i < recup.length; i++) {
    resultTotal = recup[i].price * recup[i].quantity;
    totalCommand = totalCommand + resultTotal;

    if (recup === null) {
      affichagePanier.innerHTML += `
    <tr>
        <td>Votre panier est vide</td>
    </tr>
    `;
    } else {
      affichagePanier.innerHTML += `
    <tr class="text-center">
    <td><img src=${recup[i].imageUrl} class="card-img-cart img-fluid" alt="un appareil photo"></td>
        <td>${recup[i].name}</td>
        <td>${recup[i].quantity}</td>
        <td>${recup[i].price} €</td>
        <td><button id="deleteItem" class="m-2 rounded-start"><i class="fas fa-trash-alt"></i></button></td>
        </tr>
        `;
    }
  }
  let affichageTotalPanier = document.getElementById("tableTotalPanier");
  affichageTotalPanier.innerHTML += `
<tr>
    <th  class="p-2">Total de la commande: </th>
    <td class="p-2">${totalCommand} €</td>
</tr>
`;
}

// -------------------------------------------- Supprimer un seul article du panier --------------------------------------------//

let btnDeleteItem = document.querySelectorAll("#deleteItem");

for (let i = 0; i < btnDeleteItem.length; i++) {
  btnDeleteItem[i].addEventListener("click", (event) => {
    event.preventDefault(); // Pour éviter rechargement auto de la page

    // recup = recup.filter((element) => element.idSelect !== idDelate);
    recup.splice(i, 1);
    localStorage.setItem("camera", JSON.stringify(recup)); // Variable vers le localStorage

    // Rechargement de la page + alerte

    alert("Produit supprimé du panier");
    window.location.href = "panier.html";
  });
}

// -------------------------------------------- Supprimer tout le panier --------------------------------------------
let clearCart = document.getElementById("btnDeleteCart");

clearCart.addEventListener("click", () => {
  let questionCart = confirm("Voulez-vous vraiment supprimer le panier?");
  if (questionCart) {
    localStorage.clear();
    location.reload(true);
  } else {
    //false
  }
});

// ***** Affichage du formulaire ou non ***** //

if (!recup) {
  let displayValidation = document.getElementsByClassName("displayValidation");
  displayValidation[0].style.display = "none";
}

// -------------------------------------------- Partie Regex formulaire de validation  --------------------------------------------//

let form = document.querySelector("#submitForm");

// ** Partie prénom ** //

form.firstname.addEventListener("change", function () {
  validFirstName(this);
});

const validFirstName = function (inputfirstname) {
  let firstNameRegex = new RegExp(
    "^(([a-zA-ZÀ-ÿ]+[s-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$",
    "g"
  );
  let testFirstName = firstNameRegex.test(inputfirstname.value);
  let small1 = inputfirstname.nextElementSibling;
  if (testFirstName) {
    small1.innerHTML = "Prénom valide";
    return true;
  } else {
    small1.innerHTML = "Prénom non valide";
    return false;
  }
};

// ** Partie nom ** //

form.name.addEventListener("change", function () {
  validName(this);
});

const validName = function (inputName) {
  let nameRegex = new RegExp(
    "^(([a-zA-ZÀ-ÿ]+[s-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$",
    "g"
  );
  let testName = nameRegex.test(inputName.value);
  let small2 = inputName.nextElementSibling;
  if (testName) {
    small2.innerHTML = "Nom valide";
    return true;
  } else {
    small2.innerHTML = "Nom non valide";
    return false;
  }
};

// ** Partie mail ** //

form.email.addEventListener("change", function () {
  validEmail(this);
});

const validEmail = function (inputEmail) {
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}.[a-z]{2,4}$",
    "g"
  );
  let testEmail = emailRegex.test(inputEmail.value);
  let small = inputEmail.nextElementSibling;
  if (testEmail) {
    small.innerHTML = "Mail valide";
    return true;
  } else {
    small.innerHTML = "Erreur - veillez entrer une adresse mail valide";
    return false;
  }
};

// ** Partie ville ** //

form.city.addEventListener("change", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegex = new RegExp("^[a-zA-z] ?([a-zA-z]|[a-zA-z] )*[a-zA-z]$", "g");
  let testCity = cityRegex.test(inputCity.value);
  let small3 = inputCity.nextElementSibling;
  if (testCity) {
    small3.innerHTML = "Ville valide";
    return true;
  } else {
    small3.innerHTML = "Ville non valide";
    return false;
  }
};

// ** Partie Adresse  ** //

form.address.addEventListener("change", function () {
  validAddress(this);
});

const validAddress = function (inputAddress) {
  let addressRegex = new RegExp("^.{6,}$", "g");
  let testAddress = addressRegex.test(inputAddress.value);
  let small4 = inputAddress.nextElementSibling;
  if (testAddress) {
    small4.innerHTML = "Adresse valide";
    return true;
  } else {
    small4.innerHTML = "Veillez entrer votre adresse";
    return false;
  }
};

// -------------------------------------------- Partie POST - validation de la commande  --------------------------------------------//

const orderValidationBtn = document.getElementById("btnConfirm");

orderValidationBtn.addEventListener("click", (event) => {

  // récupération données formulaire
  const contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
  };

  let products = [];

  for (i = 0; i < recup.length; i++) {
    products.push(recup[i].idSelect);
  };

  const sendOrder = {
    contact,
    products,
  };

  // Envoie vers le serveur
  fetch("http://localhost:3000/api/cameras/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendOrder),
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("sendOrder", JSON.stringify(data));
      document.location.href = "order.html";
      localStorage.removeItem("camera");
    });
});