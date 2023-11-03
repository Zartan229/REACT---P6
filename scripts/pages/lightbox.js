    let currentImage; // Cette variable stockera l'image actuellement affichée dans la lightbox.
    let imageArray; // Cette variable stockera un tableau d'éléments d'image pour la lightbox.
    let overlay; // Cette variable stockera l'élément HTML de la superposition (overlay) de la lightbox.
    let container; // Cette variable stockera l'élément HTML du conteneur de la lightbox.
    let mainImage; // Cette variable stockera l'élément HTML de l'image principale dans la lightbox.
    let currentIndex = 0;// Cette variable stockera l'index de l'image principale.

// Fonction javascript pour ouvrir la lightBox
function openLightbox(event, clickedImage) {


    // Créer la superposition (overlay) de la lightbox si elle n'existe pas
    if (!overlay) {
        overlay = document.createElement('div'); //  Créer un élément div pour la superposition de la lightbox.
        overlay.className = 'lightboxOverlay'; // Ajouter une classe CSS à la superposition.
        overlay.onclick = closeLightbox; // Associer la fonction closeLightbox à un clic sur la superposition.
        document.body.appendChild(overlay); // Ajouter la superposition à la fin du corps du document.

        // Créer le conteneur de la lightbox
        container = document.createElement('div'); // Créer un élément div pour le conteneur de la lightbox.
        container.className = 'lightboxContainer'; // Ajouter une classe CSS au conteneur.
        overlay.appendChild(container); // Ajouter le conteneur à la superposition.

        // Create a container for thumbnail images
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.className = 'lightboxThumbnails';
        container.appendChild(thumbnailContainer);

        // Collecte tout les liens dans un tableau
        imageArray = Array.from(document.querySelectorAll('.imgDesign')); // Capture tout les images et les places dans un tableau


        // Créer l'élément image principale
        mainImage = document.createElement('img'); 
        mainImage.className = 'lightboxImage'; 

        // Créer l'image pour le svg précédent
        // Créer l'image pour le svg suivant
        const prevIcon = document.createElement('img'); // Créer une image pour le thumbnail.
        prevIcon.src = 'assets/icons/left.svg'
        prevIcon.classList.add('icon'); 
        prevIcon.onclick = function() {
            showPrevImage();
            prevIcon.classList.add('clicked'); 
            setTimeout(() => {
                prevIcon.classList.remove('clicked'); 
            }, 500);
        };

        // Créer l'image pour le svg suivant
        const nextIcon = document.createElement('img'); // Créer une image pour le thumbnail.
        nextIcon.src = 'assets/icons/right.svg'
        // Ajout une classe et gère le délai du changement de couleur
        nextIcon.classList.add('icon'); 
        nextIcon.onclick = function() {
            showNextImage();
            nextIcon.classList.add('clicked'); 
            setTimeout(() => {
                nextIcon.classList.remove('clicked'); 
            }, 500);
        };

        const pTitle = document.createElement("p");
        pTitle.textContent = clickedImage.alt;
        pTitle.classList.add('titleOverlay')
        // Append les bouton de navigation au container et l'image principale au millieu
        container.appendChild(prevIcon); 
        container.appendChild(mainImage);
        container.appendChild(nextIcon); 
        container.appendChild(pTitle);
    }

    // Ajout la source et le message alt a l'image principale
    mainImage.src = clickedImage.src; // Ajoute la source de l'image cliquer
    mainImage.alt = clickedImage.alt; // Ajoute le message alt de l'image cliquer

    // Rend visible l'overlay lightBox
    overlay.style.display = 'block';

    // Prevent default link behavior
    event.preventDefault(); // Prevent the default behavior of the link when clicked.

}
function showImageAtIndex(index) {
    // Vérifie si l'indice est valide (dans les limites de l'array d'images)
    if (index >= 0 && index < imageArray.length) {
        // Obtient l'élément image (miniature) correspondant à l'indice donné
        const clickedImage = imageArray[index];

        // Met à jour la source (src) et le texte alternatif (alt) de l'image principale (mainImage)
        mainImage.src = clickedImage.src;
        mainImage.alt = clickedImage.querySelector('img').alt;

        // Met à jour la variable currentImage avec la nouvelle image affichée
        currentImage = clickedImage;
        currentIndex = index;

    }
}

// Fonction JavaScript pour afficher l'image précédente
function showPrevImage() {
    // Obtenir l'indice de l'image actuellement affichée dans imageArray
    const currentImageIndex = imageArray.indexOf(currentImage);

    // Calculer l'indice de l'image précédente
    let prevImageIndex = currentImageIndex - 1;

    // Vérifier si l'indice précédent est inférieur à zéro (arrivé au début)
    if (prevImageIndex < 0) {
        prevImageIndex = imageArray.length - 1;  // Aller à la fin du tableau
    }

   // Obtenir l'image précédente dans imageArray
    const prevImage = imageArray[prevImageIndex];

    // Mettre à jour la source (src) et le texte alternatif (alt) de l'image principale pour afficher l'image précédente
    mainImage.src = prevImage.src;
    mainImage.alt = prevImage.querySelector('img').alt;

 // Mettre à jour la variable currentImage avec l'image précédentee
    currentImage = prevImage;

    // Mettre à jour l'indice courant pour l'image précédente
    currentIndex = prevImageIndex;
}
// Fonction JavaScript pour afficher l'image suivante
function showNextImage() {
    // Obtenir l'indice de l'image actuellement affichée dans imageArray
    let currentImageIndex = imageArray.indexOf(currentImage);
    // Si l'indice n'est pas trouvé (éventualité rare), définir l'indice actuel à zéro
    if(currentImageIndex == -1)
    {
        currentImageIndex = 0;
    }
  // Calculer l'indice de l'image suivante
    let nextImageIndex = currentImageIndex + 1;

   // Vérifier si l'indice suivant est supérieur ou égal à la longueur du tableau (arrivé à la fin)
   if (nextImageIndex >= imageArray.length) {
        nextImageIndex = 0; // Go to the start of the array
    }

   // Obtenir l'image suivante dans imageArray
    const nextImage = imageArray[nextImageIndex];

    // Mettre à jour la source (src) et le texte alternatif (alt) de l'image principale pour afficher l'image suivante
    mainImage.src = nextImage.src;
    mainImage.alt = nextImage.alt;

    // Mettre à jour la variable currentImage avec l'image suivante
    currentImage = nextImage;

    // Mettre à jour l'indice courant pour l'image suivante
    currentIndex = nextImageIndex;


}

// Fonction JavaScript pour fermer la lightbox
function closeLightbox(event) {
    // Vérifie si l'élément ciblé par l'événement a la classe CSS 'lightbox-container'
    if (event.target.classList.contains('lightboxContainer')) {
        // Empêche le comportement de clic par défaut (par exemple, empêche un lien de se comporter comme un lien normal)
        event.preventDefault();

        // Supprime l'overlay du corps du document
        document.body.removeChild(overlay);

        // Réinitialise la variable overlay à null pour permettre la recréation de la lightbox si nécessaire
        overlay = null;
    }
}

