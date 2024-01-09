let currentElement; // Cette variable stockera l'image actuellement affichée dans la lightbox.
let elementArray; // Cette variable stockera un tableau d'éléments d'image pour la lightbox.
let overlay; // Cette variable stockera l'élément HTML de la superposition (overlay) de la lightbox.
let container; // Cette variable stockera l'élément HTML du conteneur de la lightbox.
let mainElement; // Cette variable stockera l'élément HTML de l'image principale dans la lightbox.
// eslint-disable-next-line no-unused-vars 
let currentIndex; // Cette variable stockera l'index de l'image principale.
let pTitle;
// Fonction javascript pour ouvrir la lightBox
// eslint-disable-next-line no-unused-vars 
export function openLightbox(event, clickedElement) {
  // Créer la superposition (overlay) de la lightbox si elle n'existe pas
  if (!overlay) {
    overlay = document.createElement("div"); //  Créer un élément div pour la superposition de la lightbox.
    overlay.setAttribute("aria-label", "Element closeup view");
    overlay.className = "lightboxOverlay"; // Ajouter une classe CSS à la superposition.



    overlay.onclick = closeLightbox; // Associer la fonction closeLightbox à un clic sur la superposition.
    document.querySelectorAll("body *:not(.lightboxOverlay *)").forEach(function (element) {
      element.setAttribute("tabindex", "-1");
    });
    
    // Set tabindex for modal elements to 0
    document.body.appendChild(overlay); // Ajouter la superposition à la fin du corps du document.



    // Créer le conteneur de la lightbox
    container = document.createElement("div"); // Créer un élément div pour le conteneur de la lightbox.
    container.className = "lightboxContainer"; // Ajouter une classe CSS au conteneur.
    container.setAttribute('aria-label', 'Image Closup View');
    overlay.appendChild(container); // Ajouter le conteneur à la superposition.

    // Create a container for thumbnail images
    const thumbnailContainer = document.createElement("div");
    thumbnailContainer.className = "lightboxThumbnails";
    container.appendChild(thumbnailContainer);

    // Collecte tout les liens dans un tableau
    elementArray = Array.from(document.querySelectorAll(".imgDesign")); // Capture tout les images et les places dans un tableau

    if (clickedElement.tagName == "VIDEO") {
      mainElement = document.createElement("video");
      mainElement.className = "lightboxImage";
    } else {
      // Créer l'élément image principale
      mainElement = document.createElement("img");
      mainElement.className = "lightboxImage";
    }

    mainElement.setAttribute('aria-label', mainElement.title);
    mainElement.setAttribute('tabindex', '0');
    // Créer l'image pour le svg précédent
    const prevIcon = document.createElement("img"); // Créer une image pour le thumbnail.
    prevIcon.src = "assets/icons/left.svg";
    prevIcon.alt = "Previous Image"
    prevIcon.classList.add("icon");
    prevIcon.setAttribute('aria-label', 'Previous Image');
    prevIcon.setAttribute('tabindex', '0');
    prevIcon.onclick = function () {
      showPrevImage();
      prevIcon.classList.add("clicked");
      setTimeout(() => {
        prevIcon.classList.remove("clicked");
      }, 500);
    };

    // Créer l'image pour le svg suivant
    const nextIcon = document.createElement("img"); // Créer une image pour le thumbnail.
    nextIcon.src = "assets/icons/right.svg";
    nextIcon.alt = "Next Image"
    nextIcon.setAttribute('aria-label', 'Next Image');
    nextIcon.classList.add("icon");
    nextIcon.setAttribute('tabindex', '0');
    nextIcon.onclick = function () {
      showNextImage();
      nextIcon.classList.add("clicked");
      setTimeout(() => {
        nextIcon.classList.remove("clicked");
      }, 500);
    };

    pTitle = document.createElement("p");
    pTitle.textContent = clickedElement.alt;
    pTitle.classList.add("titleOverlay");
    // Append les bouton de navigation au container et l'image principale au millieu
    container.appendChild(prevIcon);
    container.appendChild(mainElement);
    container.appendChild(nextIcon);
    container.appendChild(pTitle);
    mainElement.focus();
  }
  

// Function to handle arrow key navigation
function handleArrowKeys(event) {
  switch (event.key) {
    case "4":
      showPrevImage();
      break;
    case "6":
      showNextImage();
      break;
  }
}

  // Event listener for arrow key navigation
  document.addEventListener("keydown", function (event) {
    if (overlay && overlay.style.display !== "none") {
      handleArrowKeys(event);
      if (event.key === "Escape") {
        closeLightbox(event);
      }
    }
  });

  // Ajout la source et le message alt a l'image principale
  mainElement.src = clickedElement.src; // Ajoute la source de l'image cliquer
  mainElement.alt = clickedElement.alt; // Ajoute le message alt de l'image cliquer

  // Rend visible l'overlay lightBox
  overlay.style.display = "block";

  // Prevent default link behavior
  event.preventDefault(); // Prevent the default behavior of the link when clicked.
}
/*
// eslint-disable-next-line no-unused-vars 
function showImageAtIndex(index) {
  // Vérifie si l'indice est valide (dans les limites de l'array d'images)
  if (index >= 0 && index < elementArray.length) {
    // Obtient l'élément image (miniature) correspondant à l'indice donné
    const clickedElement = elementArray[index];

    // Met à jour la source (src) et le texte alternatif (alt) de l'image principale (mainElement)
    mainElement.src = clickedElement.src;
    mainElement.alt = clickedElement.querySelector("img").alt;

    // Met à jour la variable currentElement avec la nouvelle image affichée
    currentElement = clickedElement;
    currentIndex = index;
  }
}
*/
// Fonction JavaScript pour afficher l'image précédente
function showPrevImage() {
  // Obtenir l'indice de l'image actuellement affichée dans elementArray
  const currentElementIndex = elementArray.indexOf(currentElement);

  // Calculer l'indice de l'image précédente
  let prevElementIndex = currentElementIndex - 1;

  // Vérifier si l'indice précédent est inférieur à zéro (arrivé au début)
  if (prevElementIndex < 0) {
    prevElementIndex = elementArray.length - 1; // Aller à la fin du tableau
  }

  // Obtenir l'image précédente dans elementArray
  const prevImage = elementArray[prevElementIndex];

  mainElement.innerHTML = "";
  // Now, you can destroy the element
  mainElement.remove();
  if (prevImage.tagName === "VIDEO") {
    mainElement = document.createElement("video");
    mainElement.src = prevImage.src;
    mainElement.alt = prevImage.alt;
    mainElement.className = "lightboxImage";
  } else if (prevImage.tagName === "IMG") {
    mainElement = document.createElement("img");
    mainElement.src = prevImage.src;
    mainElement.alt = prevImage.alt;
    mainElement.className = "lightboxImage";
  }
  mainElement.setAttribute('aria-label', mainElement.title);
  mainElement.setAttribute('tabindex', '0');
  // Get the third element in the container
  var thirdElement = container.children[2];

  // Insert mainElement before the third element in the container
  container.insertBefore(mainElement, thirdElement);

  pTitle.innerHTML = "";
  // Now, you can destroy the element
  pTitle.remove();
  pTitle = document.createElement("p");
  pTitle.textContent = mainElement.alt;
  pTitle.classList.add("titleOverlay");
  // Insert mainElement before the third element in the container
  container.appendChild(pTitle);

  // Mettre à jour la variable currentElement avec l'image précédentee
  currentElement = prevImage;

  // Mettre à jour l'indice courant pour l'image précédente
  currentIndex = prevElementIndex;
}
// Fonction JavaScript pour afficher l'image suivante
function showNextImage() {
  // Obtenir l'indice de l'image actuellement affichée dans elementArray
  let currentElementIndex = elementArray.indexOf(currentElement);

  // Si l'indice n'est pas trouvé (éventualité rare), définir l'indice actuel à zéro
  if (currentElementIndex == -1) {
    currentElementIndex = 0;
  }
  // Calculer l'indice de l'image suivante
  let nextElementIndex = currentElementIndex + 1;

  // Vérifier si l'indice suivant est supérieur ou égal à la longueur du tableau (arrivé à la fin)
  if (nextElementIndex >= elementArray.length) {
    nextElementIndex = 0; // Go to the start of the array
  }

  // Obtenir l'image suivante dans elementArray
  const nextImage = elementArray[nextElementIndex];

  mainElement.innerHTML = "";
  // Now, you can destroy the element
  mainElement.remove();
  if (nextImage.tagName === "VIDEO") {
    mainElement = document.createElement("video");
    mainElement.src = nextImage.src;
    mainElement.alt = nextImage.alt;
    mainElement.className = "lightboxImage";
  } else if (nextImage.tagName === "IMG") {
    mainElement = document.createElement("img");
    mainElement.src = nextImage.src;
    mainElement.alt = nextImage.alt;
    mainElement.className = "lightboxImage";
  }
  // Get the third element in the container
  var thirdElement = container.children[2];
  mainElement.setAttribute('aria-label', mainElement.title);
  mainElement.setAttribute('tabindex', '0');
  // Insert mainElement before the third element in the container
  container.insertBefore(mainElement, thirdElement);

  pTitle.innerHTML = "";
  // Now, you can destroy the element
  pTitle.remove();
  pTitle = document.createElement("p");
  pTitle.textContent = mainElement.alt;
  pTitle.classList.add("titleOverlay");
  // Insert mainElement before the third element in the container
  container.appendChild(pTitle);
  // Mettre à jour la variable currentElement avec l'image suivante
  currentElement = nextImage;

  // Mettre à jour l'indice courant pour l'image suivante
  currentIndex = nextElementIndex;
}

// Fonction JavaScript pour fermer la lightbox
function closeLightbox(event) {
  if (event.target.classList.contains("lightboxContainer") || event.key === 'Escape') {
  // Vérifie si l'élément ciblé par l'événement a la classe CSS 'lightbox-container'
  document.querySelectorAll("body *:not(.lightboxOverlay *)").forEach(function (element) {
    // Reset tabindex to its original value or remove the attribute
    element.removeAttribute("tabindex");
    
  });

  document.querySelectorAll(".divImage *").forEach(function (element) {
    // Reset tabindex to its original value or remove the attribute
    element.setAttribute('tabindex', '0');
});



    event.preventDefault();

    // Supprime l'overlay du corps du document
    document.body.removeChild(overlay);

    // Réinitialise la variable overlay à null pour permettre la recréation de la lightbox si nécessaire
    overlay = null;
  }
}
