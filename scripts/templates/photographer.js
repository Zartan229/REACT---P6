export function photographerTemplate(data) {
  const { name, portrait, city, country, price, tagline, id } = data;
  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const a = document.createElement("a");
    a.setAttribute("aria-label", name);
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
    article.appendChild(pRice);
    return article;
  }


  return { name, picture, getUserCardDOM };

}

