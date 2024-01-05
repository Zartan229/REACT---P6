import { MediaFactory } from "../factory/mediaFactory.js";

// Function to extract the photographer ID from the URL
async function GrabId() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  return id;
}

async function getMediaByPhotographerId() {
  try {
    // Get the photographer ID using GrabId
    const id = await GrabId();

    const response = await fetch("data/photographers.json"); // Replace with the correct file path or URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    // Filter media by photographerId
    const filteredMedia = data.media.filter((media) => media.photographerId == id);
    const filterPhotographer = data.photographers.find((photographer) => photographer.id == id);

    return { filteredMedia, filterPhotographer }; // Return the filtered data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}



async function showMediaPhotographer() {
  try {
    const { filteredMedia, filterPhotographer } = await getMediaByPhotographerId();


    const picture = `assets/photographers/${filterPhotographer.portrait}`;

    const box = document.querySelector(".photograph-header");
    const div = document.createElement("div");
    div.classList.add("photographer-profile");
    const h2 = document.createElement("h2");
    h2.textContent = filterPhotographer.name;
    const h3 = document.createElement("h3");
    h3.textContent = " " + filterPhotographer.city + ", " + filterPhotographer.country;
    const p = document.createElement("p");
    p.textContent = filterPhotographer.tagline;

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(p);

    // Insert the div as the first child of the box
    box.insertBefore(div, box.firstChild);

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.classList.add("user");
    img.alt = filterPhotographer.name;

    box.appendChild(img);

    const divSort = document.createElement("div");
    divSort.classList.add("divSort");

    box.insertAdjacentElement("afterend", divSort);
    const label = document.createElement("label");
    label.textContent = "Trier par";
    label.classList.add("label");

    divSort.appendChild(label);
    const divDrop = document.createElement("div");
    divDrop.classList.add("divDrop");

    const button = document.createElement("button");
    button.classList.add("dropdown");
    button.setAttribute("aria-haspopup", "true");
    button.textContent = "Popularité";

    label.insertAdjacentElement("afterend", divDrop);
    divDrop.appendChild(button);

    const ul = document.createElement("ul");
    ul.classList.add("listUl");
    const li1 = document.createElement("li");
    li1.textContent = "Popularité";
    const li2 = document.createElement("li");
    li2.textContent = "Date";
    const li3 = document.createElement("li");
    li3.textContent = "Titre";

    divDrop.appendChild(ul);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);

    // Add a click event listener to the ul
    divDrop.addEventListener("click", function (event) {
      if (ul.style.display === "flex") {
        ul.style.display = "none";
      } else {
        ul.style.display = "flex";
      }
      if (event.target.tagName === "LI") {
        const clickedLi = event.target;
        button.textContent = clickedLi.textContent; // Update the button text

        // Sort the media based on the selected option
        switch (clickedLi.textContent) {
          case "Popularité":
            filteredMedia.sort((a, b) => b.likes - a.likes);
            break;
          case "Date":
            filteredMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
          case "Titre":
            filteredMedia.sort((a, b) => a.title.localeCompare(b.title));
            break;
          default:
            // Default to sorting by popularity
            filteredMedia.sort((a, b) => b.likes - a.likes);
        }

        // Re-render the sorted media
        renderMedia(filteredMedia);
      }
    });

    const divImage = document.createElement("div");
    divImage.classList.add("divImage");
    divSort.insertAdjacentElement("afterend", divImage);

    const photographerName = filterPhotographer.name;

    var name = photographerName.split(" ")[0];

    var modifiedName = name.replace(/-/g, " ");

    var totalLikes = 0;

    // Initial render of media based on default sorting (by popularity)
    renderMedia(filteredMedia);

    function renderMedia(filteredMedia) {
      // Clear existing media items
      divImage.innerHTML = "";

      for (var i = 0; i < filteredMedia.length; i++) {
        const mediaFactoryInstance = new MediaFactory(filteredMedia[i], modifiedName, totalLikes);
         totalLikes = totalLikes + filteredMedia[i].likes;
         divImage.appendChild(mediaFactoryInstance.imgDiv);

      }
    }

    const rightBottomDiv = document.createElement("div");
    rightBottomDiv.classList.add("rightBottomDiv");

    const divFlex = document.createElement("div");
    divFlex.classList.add("divFlex");

    const h6 = document.createElement("h6");
    h6.textContent = totalLikes;
    h6.classList.add("countLike");
    const imgBlackHeart = document.createElement("img");
    imgBlackHeart.src = "assets/icons/heartBlack.svg";
    imgBlackHeart.alt = "Coeur noir, total favoris";

    const pEuro = document.createElement("p");
    pEuro.textContent = filterPhotographer.price + " / jour";

    const main = document.querySelector("main");
    main.insertAdjacentElement("afterend", rightBottomDiv);

    rightBottomDiv.appendChild(divFlex);
    divFlex.appendChild(h6);
    divFlex.appendChild(imgBlackHeart);
    rightBottomDiv.appendChild(pEuro);
  } catch (error) {
    console.error("There was a problem:", error);
  }
}

showMediaPhotographer();

