let navbar = document.querySelector(".navbar")

window.addEventListener("scroll", ()=>{
    if(window.scrollY > 0){
        navbar.classList.add("navscroll")
    } else {
        navbar.classList.remove("navscroll")
    }
})

// CHIAMATE ASINCRONE - setInterval()

let numUtenti = document.querySelector("#numUtenti")
let numProdotti = document.querySelector("#numProdotti")
let numMessaggi = document.querySelector("#numMessaggi")


function creazioneNumeri(numeroFinale, element, frequenza){
    let counter = 0

    let intervalloNumeri = setInterval( ()=>{
        if(counter < numeroFinale){
            counter++
            element.innerHTML = counter;

        } else {
            clearInterval(intervalloNumeri)
        }
    }, frequenza )
    
}




// INTERSECTION OBSERVER
let primoBox = document.querySelector("#primoBox")

let isIntersecato = false;

let observer = new IntersectionObserver( (entries)=>{
    entries.forEach( (entry)=>{
        if(entry.isIntersecting && isIntersecato == false){
            creazioneNumeri(100, numUtenti, 100)
            creazioneNumeri(500, numProdotti, 50)
            creazioneNumeri(1000, numMessaggi, 20)
            isIntersecato = true;
            setTimeout(() => {
                isIntersecato = false;
            }, 5000);
        }
    } )
} )

observer.observe(primoBox)

// ULTIMI ANNUNCI 
let ultimiannunciWrapper = document.querySelector("#ultimiannunciWrapper")

let annunci = [
    {name: "Audi", categoria: "Auto", prezzo: 17000, img: "https://picsum.photos/200/150"},
    {name: "Ps5", categoria: "Market", prezzo: 499, img: "https://picsum.photos/201/150"},
    {name: "Airpods Pro", categoria: "Market", prezzo: 180, img: "https://picsum.photos/202/150"},
    {name: "Casa vacanze", categoria: "Case", prezzo: 220000, img: "https://picsum.photos/203/150"},
    {name: "Mercedes", categoria: "Auto", prezzo: 1000, img: "https://picsum.photos/204/150"},
    {name: "Mercedes", categoria: "Auto", prezzo: 1000, img: "https://picsum.photos/204/150"},
]

annunci.forEach((annuncio, i)=>{
    if(i >= annunci.length -3){
    let colonna = document.createElement("div");
    colonna.classList.add("col-12","col-md-3");
    colonna.innerHTML = `
    <div class="card position-relative">
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger z-3">NEW</span>
    <div class="overflow-hidden card-img-top">
      <img src="${annuncio.img}" class="card-img-top transition" alt="...">
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">${annuncio.name}</h5>
      <p class="card-text">Categoria: ${annuncio.categoria}</p>
      <p class="card-text">Prezzo: ${annuncio.prezzo} </p>
      <div class="d-flex justify-content-center">
        <a href="#" class="btn bg-P">Aggiungi al carrello</a>
      </div>
    </div>
  </div>
    `
    ultimiannunciWrapper.appendChild(colonna)
    }
})