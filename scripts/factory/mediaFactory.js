import { openLightbox } from "../pages/lightbox.js";

// Construction de la balise image ou video en fonction du type de media
export class MediaFactory {
    constructor(media, modifiedName) {
        this.media = media;
        this.modifiedName = modifiedName;
        this.totalLikes = 0;
        this.imgDiv = this.createMediaFactory();
    }

    createMediaFactory() {
        const mediaType = this.media;
        let currentMedia, createdElement;
        // Si media type image, créer une balise image, sinon video créer une balise vidéo
        if (mediaType.image) {
            currentMedia = this.media.image;
            createdElement = document.createElement('img');
        } else if (mediaType.video) {
            currentMedia = this.media.video;
            createdElement = document.createElement('video');
        }

        const mediaSource = currentMedia;
        const mediaElement = createdElement;
        mediaElement.alt = this.media.title;
        mediaElement.classList.add('imgDesign');
        mediaElement.setAttribute('id', 'newImgTag');
        mediaElement.src = `assets/images/${this.modifiedName}/${mediaSource}`;
        mediaElement.autoplay = true; // Adjust autoplay based on your requirements
        mediaElement.setAttribute('tabindex', '0');//Pour la navigation 
        mediaElement.setAttribute('aria-label', this.media.title);

        
        const imgIcon = document.createElement("img");
        imgIcon.alt = "Like";
        imgIcon.setAttribute("id", "ImgIconClick");
        imgIcon.src = "assets/icons/heart.svg";
        imgIcon.setAttribute('role', 'button');
        imgIcon.setAttribute('tabindex', '0');

        imgIcon.addEventListener('click', () => {
            // Met a jour updateLike au clique
            this.updateLike(imgIcon);
        });

        

        this.totalLikes += this.media.likes;

        const imgDiv = document.createElement('article');
        imgDiv.setAttribute('role', 'article');
        
        const imgDivText = document.createElement('div');
        imgDivText.classList.add('imgDivText');
        const imgDivIcon = document.createElement('div');
        imgDivIcon.classList.add('imgDivIcon');
        const imgTitle = document.createElement('h4');
        imgTitle.textContent = this.media.title;
        const imgLikes = document.createElement('p');
        imgLikes.textContent = this.media.likes;

        imgDiv.appendChild(mediaElement);
        imgDiv.appendChild(imgDivText);
        imgDivText.appendChild(imgTitle);
        imgDivText.appendChild(imgDivIcon);
        imgDivIcon.appendChild(imgLikes);
        imgDivIcon.appendChild(imgIcon);

        // Add click event listener to the like button
        imgIcon.addEventListener('click', () => {
            // Call the updateLike function when the button is clicked
            this.updateLike(imgIcon);
        });
        //Ajoute onclick a mediaElement pour la lightbox 
        mediaElement.onclick = function (event) {
            openLightbox(event, this);
          };

        return imgDiv;
    }

    // Fonction pour mettre à jour le nombre de "j'aime" et l'afficher
    updateLike(imgIcon) {
        var prevSibling = imgIcon.previousElementSibling;

        // Vérifier si le précédent frère (sibling) est un élément <p> qui n'a pas été mis à jour auparavant
        if (prevSibling && prevSibling.tagName === "P" && !prevSibling.hasAttribute("data-updated")) {
            // Mettre à jour le contenu du frère précédent
            prevSibling.textContent++;
            this.totalLikes++; // Utiliser ceci pour référencer la propriété de classe
            // Définir un attribut pour indiquer que le frère précédent a été mis à jour

            const totalLikesElement = document.querySelector(".countLike");
            totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1;
            prevSibling.setAttribute("data-updated", "true");
        }
        
    }
}
