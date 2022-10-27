var str = window.location.href;
var url = new URL(str);
var search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) {
  var name = search_params.get('id');
 
}
let id = name
console.log(id)

const idOrder = document.querySelector("#orderId");
idOrder.innerHTML = id;