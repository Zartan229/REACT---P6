let fieldsAdded = false;
// eslint-disable-next-line no-unused-vars 
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

  document.querySelectorAll("body *:not(#contact_modal *)").forEach(function (element) {
    element.setAttribute("tabindex", "-1");
  });

  // Set tabindex for modal elements to 0
  const modalElements = document.querySelectorAll("#contact_modal *");
  modalElements.forEach(function (element) {
    element.setAttribute("tabindex", "0");
  });

  // Add focus event listener to the modal
  modal.addEventListener("focusout", function (event) {
    const firstInput = document.getElementById("prenom"); // Replace with the ID of the first input field
    if (!modal.contains(event.relatedTarget)) {
      // If the focus leaves the modal, set focus back to the first input field
      firstInput.focus();
    }
  });


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
    if (event.key === "Tab") {
      if (!event.shiftKey && index < fields.length - 1) {
        // If the "Tab" key is pressed without "Shift" and not at the last field
        fields[index + 1].focus();
        event.preventDefault();
      } else if (event.shiftKey && index > 0) {
        // If the "Tab" key is pressed with "Shift" and not at the first field
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

  // Call the function to add fields before the button
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
