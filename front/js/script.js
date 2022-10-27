//fonction pour ajouter les element article ; img; name et description au html// 

function newProduct(imageUrl, altTxt, name, description, _id) {
    const newItems = document.createElement('a');
    newItems.setAttribute("href",`product.html?id=${_id}`)
    newItems.innerHTML =    `<article>
                             <img src="${imageUrl}" alt="${altTxt}">
                              <h3 class="productName">${name}</h3>
                              <p class="productDescription">${description}</p>
                            </article>`;
    
   
    document.querySelector('.items').appendChild(newItems);  

}


// fonction async pour recuperer les donnes de l'api//
async function getProducts() {
    let productsArray =  await fetch("http://localhost:3000/api/products")
    
    .then(res => res.json());

    if(productsArray)
    {
        for(i = 0 ; i< productsArray.length; i++)
        {
            newProduct(productsArray[i].imageUrl, productsArray[i].altTxt, productsArray[i].name, productsArray[i].description, productsArray[i]._id)
        }
    }
}

getProducts();
