let fieldsAdded = false;
// eslint-disable-next-line no-unused-vars 
function displayModal() {
  
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.classList.add("lightboxOverlay");
  modal.classList.add("lightboxContainer");
  

  
// Fonction pour créer et ajouter des champs avant le bouton
  function addFieldsBeforeButton() {
    if (fieldsAdded) {
      return; // Les champs ont déjà été ajoutés, quitter la fonction
    }

    var form = document.getElementById("formSection");


    var divNom = createField("Nom", "nom");
    form.insertBefore(divNom, form.lastElementChild);


    var divEmail = createField("Email", "email");
    form.insertBefore(divEmail, form.lastElementChild);

 
    var divMessage = createField("Message", "message", true);
    form.insertBefore(divMessage, form.lastElementChild);

    fieldsAdded = true;
  }

  document.querySelectorAll("body *:not(#contact_modal *)").forEach(function (element) {
    element.setAttribute("tabindex", "-1");
  });

  
// Définir l'attribut tabindex à 0 pour les éléments modaux
  const modalElements = document.querySelectorAll("#contact_modal *");
  modalElements.forEach(function (element) {
    element.setAttribute("tabindex", "0");
  });

  // Ajouter un écouteur d'événements de focus au modal
  modal.addEventListener("focusout", function (event) {
    const firstInput = document.getElementById("prenom");
    if (!modal.contains(event.relatedTarget)) {
      firstInput.focus();
    }
  });



  function createField(labelText, inputName, isTextarea) {
    var div = document.createElement("div");
    var label = document.createElement("label");
    label.setAttribute("for", inputName);
    label.textContent = labelText;

    var inputElement = isTextarea ? document.createElement("textarea") : document.createElement("input");
    inputElement.setAttribute("id", inputName);
    inputElement.setAttribute("name", inputName);
    inputElement.setAttribute("aria-label", inputName); 
    div.appendChild(label);
    div.appendChild(inputElement);

    return div;
  }

// Améliorez la navigation au clavier
const formFields = document.querySelectorAll("#formSection input, #formSection textarea");
formFields.forEach(function (field, index, fields) {
  field.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      if (!event.shiftKey && index < fields.length - 1) {
        // Si la touche "Tab" est pressée sans la touche "Shift" et que ce n'est pas le dernier champ
        fields[index + 1].focus();
        event.preventDefault();
      } else if (event.shiftKey && index > 0) {
        // Si la touche "Tab" est pressée avec la touche "Shift" et que ce n'est pas le premier champ
        fields[index - 1].focus();
        event.preventDefault();
      }
    }
  });
});

  // Ajoutez la gestion du clic en dehors du modal
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.target === modal) {
      closeModal()
    }
  });

  // Ajoutez la gestion de la touche "Escape"
  window.addEventListener("keydown", function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.key === "Escape" && modal.style.display === "block") {
      closeModal()
    }
  });

  // Ajoutez la gestion du focus
  function manageFocus() {
    const firstInput = document.getElementById("prenom"); // Remplacez avec l'ID du premier champ du formulaire
    firstInput.focus();
  }

 
  addFieldsBeforeButton();
  // Appelez la fonction pour gérer le focus
  manageFocus();
}
// eslint-disable-next-line no-unused-vars 
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  document.querySelectorAll("body *").forEach(function (element) {
    element.setAttribute('tabindex', '0');
    
  })

}
// eslint-disable-next-line no-unused-vars 
function buttonModal(event) {
  // Accéder aux données du formulaire
  var nomValue = document.getElementById("nom");
  var prenomValue = document.getElementById("prenom");
  var emailValue = document.getElementById("email");
  var messageValue = document.getElementById("message");


  if (nomValue && prenomValue && emailValue && messageValue) {
    console.log("Nom:", nomValue.value);
    console.log("Prénom:", prenomValue.value);
    console.log("Email:", emailValue.value);
    console.log("Message:", messageValue.value);
    event.preventDefault();
  } else {
    console.error("One or more form elements not found.");
  }
}
