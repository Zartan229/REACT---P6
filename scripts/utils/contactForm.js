let fieldsAdded = false;

function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.classList.add("lightboxOverlay");
  modal.classList.add("lightboxContainer");

  // Function to create and append fields before the button
  function addFieldsBeforeButton() {
    if (fieldsAdded) {
      return; // Fields already added, exit the function
    }

    var form = document.getElementById("formSection");

    // Add "Nom" field before the button
    var divNom = createField("Nom", "nom");
    form.insertBefore(divNom, form.lastElementChild);

    // Add "Email" field before the button
    var divEmail = createField("Email", "email");
    form.insertBefore(divEmail, form.lastElementChild);

    // Add "Message" field before the button
    var divMessage = createField("Message", "message", true); // Use true to create a textarea for the message
    form.insertBefore(divMessage, form.lastElementChild);

    fieldsAdded = true;
  }

  // Function to create a field (label + input or textarea)
  function createField(labelText, inputName, isTextarea) {
    var div = document.createElement("div");
    var label = document.createElement("label");
    label.setAttribute("for", inputName);
    label.textContent = labelText;

    var inputElement = isTextarea ? document.createElement("textarea") : document.createElement("input");
    inputElement.setAttribute("id", inputName);
    inputElement.setAttribute("name", inputName);
    inputElement.setAttribute("aria-label", inputName); // Set aria-label attribute
    div.appendChild(label);
    div.appendChild(inputElement);

    return div;
  }

  // Améliorez la navigation au clavier
  const formFields = document.querySelectorAll("#formSection input, #formSection textarea");
  formFields.forEach(function (field, index, fields) {
    field.addEventListener("keydown", function (event) {
      if (event.key === "Tab" && !event.shiftKey) {
        // Si la touche "Tab" est pressée sans "Shift", passez au champ suivant
        fields[index + 1].focus();
        event.preventDefault();
      } else if (event.key === "Tab" && event.shiftKey) {
        // Si la touche "Tab" est pressée avec "Shift", passez au champ précédent
        fields[index - 1].focus();
        event.preventDefault();
      }
    });
  });

  // Ajoutez la gestion du clic en dehors du modal
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Ajoutez la gestion de la touche "Escape"
  window.addEventListener("keydown", function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
    }
  });

  // Ajoutez la gestion du focus
  function manageFocus() {
    const firstInput = document.getElementById("prenom"); // Remplacez avec l'ID du premier champ du formulaire
    firstInput.focus();
  }

  // Call the function to add fields before the button
  addFieldsBeforeButton();
  // Appelez la fonction pour gérer le focus
  manageFocus();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

function buttonModal(event) {
  // Access the form data
  var nomValue = document.getElementById("nom");
  var prenomValue = document.getElementById("prenom");
  var emailValue = document.getElementById("email");
  var messageValue = document.getElementById("message");

  // Check if elements exist
  if (nomValue && prenomValue && emailValue && messageValue) {
    // Log the form data to the console
    console.log("Nom:", nomValue.value);
    console.log("Prénom:", prenomValue.value);
    console.log("Email:", emailValue.value);
    console.log("Message:", messageValue.value);

    // Prevent the default form submission
    event.preventDefault();
  } else {
    console.error("One or more form elements not found.");
  }
}
