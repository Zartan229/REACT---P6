import { photographerTemplate } from "../templates/photographer.js";
  
  async function getPhotographers() {
    try {
      const response = await fetch('data/photographers.json'); // Replace with the correct file path or URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Process the data
      console.log(data);
      return data; // Return the data
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error for further handling if needed
    }
  }
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
          // eslint-disable-next-line no-undef
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
