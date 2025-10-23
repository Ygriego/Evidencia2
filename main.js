const inputnombre = document.getElementById("nombre");
const botonbuscar = document.getElementById("botonbuscar");
const poblacion = document.getElementById("poblacion");  
const imagen = document.getElementById("imagen");        
const nombreComun = document.getElementById("nombreComun");
const nombreOficial = document.getElementById("nombreOficial");
const region = document.getElementById("region");
const subregion = document.getElementById("subregion");
const capital = document.getElementById("capital");

async function buscarbandera(){
  const link = (inputnombre.value || "").trim();

  if(!link) return;

  try{
    const url = "https://restcountries.com/v3.1/name/" + encodeURIComponent(link) +
      "?fields=name,flags,capital,region,subregion,population";
    const res = await fetch(url, { cache: "no-store" });
    if(!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const c = data[0];

    imagen.src = (c.flags && (c.flags.png || c.flags.svg)) || "";
    imagen.alt = (c.flags && c.flags.alt) || ("Bandera de " + (c.name?.common || link));

    nombreComun.textContent  = c.name?.common  || "—";
    nombreOficial.textContent= c.name?.official|| "—";
    region.textContent       = c.region        || "—";
    subregion.textContent    = c.subregion     || "—";
    capital.textContent      = Array.isArray(c.capital) ? c.capital.join(", ") : (c.capital || "—");
    poblacion.textContent    = (typeof c.population === "number") ? c.population.toLocaleString() : "—";

  }catch(err){
    alert("No se encontró el país o hubo un error: " + err.message);
  }
}

botonbuscar.addEventListener("click", (e)=>{
  e.preventDefault();
  buscarbandera();
});
