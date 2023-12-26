// Construction de la balise image ou video en fonction du type de media
// eslint-disable-next-line no-unused-vars
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

        if (mediaType.image) {
            currentMedia = this.media.image;
            createdElement = document.createElement('img');
        } else if (mediaType.video) {
            currentMedia = this.media.video;
            createdElement = document.createElement('video');
        }

        const mediaSource = currentMedia;
    //    console.log('mediaType:', mediaType);
    //    console.log('mediaSource:', mediaSource);

    //    console.log(mediaSource);
    //    console.log(this.media);

        const mediaElement = createdElement;
        mediaElement.alt = this.media.title;
        mediaElement.classList.add('imgDesign');
        mediaElement.setAttribute('id', 'newImgTag');
        mediaElement.src = `assets/images/${this.modifiedName}/${mediaSource}`;
        mediaElement.autoplay = true; // Adjust autoplay based on your requirements

        // Move imgIcon declaration here
        const imgIcon = document.createElement("img");
        imgIcon.alt = "Like";
        imgIcon.setAttribute("id", "ImgIconClick");
        imgIcon.src = "assets/icons/heart.svg";

        imgIcon.addEventListener('click', () => {
            // Call the updateLike function when the button is clicked
            this.updateLike(imgIcon);
        });

        this.totalLikes += this.media.likes;

        const imgDiv = document.createElement('article');
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

        mediaElement.onclick = function (event) {
            openLightbox(event, this);
          };

        return imgDiv;
    }

    // Function to update like count and display
    updateLike(imgIcon) {
        var prevSibling = imgIcon.previousElementSibling;

        // Check if the previous sibling is a <p> element and hasn't been updated before
        if (prevSibling && prevSibling.tagName === "P" && !prevSibling.hasAttribute("data-updated")) {
            // Update the content of the previous sibling
            prevSibling.textContent++;
            this.totalLikes++; // Use this to reference the class property
            // Set an attribute to mark the previous sibling as updated

            const totalLikesElement = document.querySelector(".countLike");
            totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1;
            // totalLikesElement.textContent = parseInt(totalLikesElement.textContent) + 1;
            prevSibling.setAttribute("data-updated", "true");
        }

        // Update your UI or do other actions as needed
       // console.log("Likes: " + this.totalLikes);
        // Update the totalLikesElement text content (You need to have totalLikesElement declared and accessible here)
        // h6.textContent = this.totalLikes;

        
    }
}
