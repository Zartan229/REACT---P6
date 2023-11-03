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

    // Process the filtered data
    console.log(filteredMedia);
    console.log(filterPhotographer);

    return { filteredMedia, filterPhotographer }; // Return the filtered data
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}

async function showMediaPhotographer() {
  try {
    const { filteredMedia, filterPhotographer } = await getMediaByPhotographerId();

    console.log(filteredMedia);
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
      if (event.target.tagName === "LI") {
        // Check if the clicked element is an li
        const clickedLi = event.target;
        button.textContent = clickedLi.textContent; // Update the button text
        ul.style.display = "none"; // Close the ul by hiding it
      }
    });

    // Add a click event listener to the button
    button.addEventListener("click", function () {
      if (ul.style.display === "flex") {
        ul.style.display = "none";
      } else {
        ul.style.display = "flex";
      }
    });





    

    const divImage = document.createElement('div');
    divImage.classList.add("divImage");
    divSort.insertAdjacentElement("afterend", divImage);
  

    const photographerName = filterPhotographer.name; 
    
    var name = photographerName.split(' ')[0];
    
    var modifiedName = name.replace(/-/g, ' ');
    
    console.log(modifiedName);
    var totalLikes = 0;

    for (var i = 0; i < filteredMedia.length; i++) {
      const image = filteredMedia[i].image;
      const imgDiv = document.createElement("div");
      const imgTag = document.createElement("img");
      const imgDivText = document.createElement("div");
      imgDivText.classList.add("imgDivText");
      const imgDivIcon = document.createElement("div");
      imgDivIcon.classList.add("imgDivIcon")
      const imgTitle = document.createElement("h4");
      const imgLikes = document.createElement("p");
      imgLikes.textContent = filteredMedia[i].likes;
      const imgIcon = document.createElement("img")
      imgIcon.src = 'assets/icons/heart.svg'
      const imgGen = `assets/images/${modifiedName}/${image}`;
      imgTag.src = imgGen;
      imgTag.classList.add("imgDesign");
      imgTag.setAttribute('id', 'newImgTag');
      imgTag.alt = filteredMedia[i].title;
      imgTitle.textContent = filteredMedia[i].title;
      imgTag.onclick = function(event) {
        openLightbox(event, this);
      };
      totalLikes = totalLikes + filteredMedia[i].likes
      
      
      
      divImage.appendChild(imgDiv);
      imgDiv.appendChild(imgTag);
      imgDiv.appendChild(imgDivText);
      imgDivText.appendChild(imgTitle);
      imgDivText.appendChild(imgDivIcon);
      imgDivIcon.appendChild(imgLikes);
      imgDivIcon.appendChild(imgIcon);
    }

    console.log(totalLikes)
    const rightBottomDiv = document.createElement("div");
    rightBottomDiv.classList.add("rightBottomDiv");

    const divFlex = document.createElement("div");
    divFlex.classList.add("divFlex");

    const h6 = document.createElement("h6");
    h6.textContent = totalLikes;
    const imgBlackHeart = document.createElement("img");
    imgBlackHeart.src = 'assets/icons/heartBlack.svg'
    imgBlackHeart.alt = 'Coeur noir, total favoris'

    const pEuro = document.createElement("p")
    pEuro.textContent = filterPhotographer.price + " / jour"

    const main = document.querySelector("main")
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

/*
a.href = `./photographer.html?id=${id}`;
const img = document.createElement("img");
img.setAttribute("src", picture);
img.alt = name;
const h2 = document.createElement("h2");
h2.textContent = name;
const h3 = document.createElement("h3");
h3.textContent = " " + city + ", " + country;
const p = document.createElement("p");
p.textContent = tagline;
const pRice = document.createElement("p");
pRice.textContent = price + "€/jour";
article.appendChild(a);
a.appendChild(img);
a.appendChild(h2);
article.appendChild(h3);
article.appendChild(p);
*/
