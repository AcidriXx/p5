
//creation des obption et ajout des différente couleur de l'objet 
function optionColor(color) {
  let option = document.createElement('option');
  option.value = option.text = color;
  document.querySelector('#colors').appendChild(option);
}

//chemin pour les nouveaux elements html

let titleKanap  = document.getElementById("title");
let priceKanap  = document.getElementById("price");
let descriptionKanap  = document.getElementById("description");


//recuperation de l'id dans l'URL
var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) 
{
  var name = search_params.get('id');
}
let id = name



//recuperation du produit avec fetch avec son id 
const getKanap = async function () {
    let response = await fetch(`http://localhost:3000/api/products/${id}`)
    if (response.ok) {
      let data = await response.json()
      
      
      for (let i = 0 ; i < data.colors.length; i++){   
        optionColor(data.colors[i])
        
    }; 
    
      //creation de l'element img 
      let img = document.createElement('img');
      img.src = data.imageUrl;
      document.querySelector('.item__img').appendChild(img);

      //declaration des variables
      let titleData = data.name;
      let priceData = data.price;
      let descriptionData = data.description;

      //creation des elements html
      titleKanap.innerHTML = titleData;
      priceKanap.innerHTML = priceData;
      descriptionKanap.innerHTML = descriptionData;

    } else {
      console.error(response.status)
    }
    
  } 

getKanap()



//recuperation des donne pour le panier 
const colorPanier = document.querySelector("#colors");
const numberPanier = document.querySelector("#quantity");

//boutton pour ajouter au panier
const btn_panier = document.querySelector("#addToCart");




//ajout événement au click 
btn_panier.addEventListener("click", (e)=>{
  

  const choiceColor = colorPanier.value;
  const choiceNumber = numberPanier.value;

  if(colorPanier.value == "")
  {
    alert("Mettez une couleur valide.")
    return false;
  }
  if(numberPanier.value == "" || numberPanier.value <= 0)
  {
    alert("Mettez un nombre d'article(s) valide.")
    return false;
  } 
  else
  {
    alert("Votre produit a été ajouté au panier")
  }
  

  let optionProduit = {
    idProduct: id,
    quantity: parseInt(choiceNumber),
    colorProduct: choiceColor, 
  } 

  let productLocalStorage = JSON.parse(localStorage.getItem("product"))
  console.log(productLocalStorage);

  if (productLocalStorage === null) 
  {
    productLocalStorage = [];
    productLocalStorage.push(optionProduit);
    console.log(productLocalStorage);
    localStorage.setItem("product", JSON.stringify(productLocalStorage));
  } 
   else if (productLocalStorage !== null) 
   {

      for (i = 0; i < productLocalStorage.length ; i++) 
      {
        if (productLocalStorage[i].idProduct === optionProduit.idProduct && productLocalStorage[i].colorProduct === optionProduit.colorProduct) 
        {
            productLocalStorage[i].quantity += optionProduit.quantity,
            localStorage.setItem("product", JSON.stringify(productLocalStorage)),
            (productLocalStorage = JSON.parse(localStorage.getItem("product")));
        }
      }

      for (i = 0; i < productLocalStorage.length; i++) 
      {
        if((productLocalStorage[i].idProduct === optionProduit.idProduct && productLocalStorage[i].colorProduct !== optionProduit.colorProduct) || productLocalStorage[i].idProduct !== optionProduit.idProduct) 
        {
          return (
              console.log("new"),
              productLocalStorage.push(optionProduit),
              localStorage.setItem("product", JSON.stringify(productLocalStorage)),
              (productLocalStorage = JSON.parse(localStorage.getItem("product")))
          )
        }
      }
    
      if(productLocalStorage.length == [])
      {
          productLocalStorage.push(optionProduit);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
      }
    } 
});

