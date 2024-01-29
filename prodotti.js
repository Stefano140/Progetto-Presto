// NAVBAR SCROLL

let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 0){
        navbar.classList.add("navscroll")
    } else {
        navbar.classList.remove("navscroll")
    }
})

// CHIAMATA  - API
fetch("./prodotti.json").then( ( response) => response.json()).then( (data)=> {

    // CREAZIONE CARDS
    let prodottiWrapper = document.querySelector("#prodottiWrapper")

    function createcards(array){
    prodottiWrapper.innerHTML = ""
    array.sort((a, b) => a.prezzo - b.prezzo ).forEach((prodotto, i)=>{
        let colonna = document.createElement("div");
        colonna.classList.add("col-12","col-md-3");
        colonna.innerHTML = `
        <div class="card">
        <div class="overflow-hidden card-img-top">
          <img src="https://picsum.photos/20${i}" class="card-img-top transition" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">${prodotto.nome}</h5>
          <p class="card-text">Categoria: ${prodotto.categoria}</p>
          <p class="card-text">Prezzo: ${prodotto.prezzo} </p>
          <div class="d-flex justify-content-center">
            <a href="#" class="btn bg-P">Aggiungi al carrello</a>
          </div>
        </div>
      </div>
        `
        prodottiWrapper.appendChild(colonna)
    })
  }
  createcards(data)


// CREAZIONE PULSANTE

function setCategory(){
   let categorie = data.map((el)=> el.categoria)
   let categoryUnica = [];
   categorie.forEach((categoria)=>{
     

       if(!categoryUnica.includes(categoria)){
        categoryUnica.push(categoria)
       }
   })
   
   categoryUnica.forEach((categoryUnica)=>{
    let div = document.createElement("div");
            div.classList.add("form-check");
            div.innerHTML = `
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id=${categoryUnica}>
                            <label class="form-check-label" for=${categoryUnica}>
                            ${categoryUnica}
                            </label>
            `

      radioWrapper.appendChild(div)
   })
   
}

setCategory()

let radiobuttons= document.querySelectorAll(".form-check-input")

// FILTRO PER CATEGORIA
function filterBycategory(){
// traformazione della NodeList in un Array
  let radiobuttonarray = Array.from(radiobuttons) 
  let checked = radiobuttonarray.find((el)=> el.checked == true)
  if(checked.id == "All"){
    createcards(data)
    return data
  }else{
    let filtered = data.filter((el)=> el.categoria == checked.id)
    createcards(filtered)
    return filtered
  }
}

radiobuttons.forEach((radiobutton)=>{
  radiobutton.addEventListener("input", ()=>{
    globalFilter(); 
  })
})

let inputPrice = document.querySelector("#inputPrice")
let priceLabel = document.querySelector("#priceLabel")

// FUNZIONE PER STABILIRE PREZZO MAGGIORE E MINORE
function findMinMaxPrice(){
   let prezzi = data.map((el)=> el.prezzo)
   let max = Math.max(...prezzi)
   let min = Math.min(...prezzi)
   inputPrice.min = min
   inputPrice.max = max
   inputPrice.value = max
   priceLabel.innerHTML = max
   
}
findMinMaxPrice()
// FILTRO PER PREZZO
function filterByprice(array){
  let filtered = array.filter((el)=>el.prezzo <= inputPrice.value)
  return filtered
}

inputPrice.addEventListener("input", ()=>{
  priceLabel.innerHTML = inputPrice.value;
  globalFilter();

})

// FILTRO PER PAROLA

let inputWord = document.querySelector("#inputWord");

function filterByword(array){
   let filtered = array.filter((el)=> el.nome.toLowerCase().includes(inputWord.value.toLowerCase()))
   return filtered;
}

inputWord.addEventListener("input", ()=>{
  globalFilter()()
})

function globalFilter(){
  let filteredBycategory = filterBycategory();
  let filteredByprice = filterByprice(filteredBycategory);
  let filteredByword = filterByword(filteredByprice);
  createcards(filteredByword);
} 


























})