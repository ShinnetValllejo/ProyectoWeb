let url = new URL(window.location.href);
const id = url.searchParams.get("id");
const user = url.searchParams.get("user");

const title = document.getElementById("title");
const price = document.getElementById("price");
const rooms = document.getElementById("rooms");
const city = document.getElementById("city");
const country = document.getElementById("country");
const adress = document.getElementById("adress");
const thumbnail = document.getElementById("thumbnail");
const excerpt = document.getElementById("excerpt");
const state = document.getElementById("state");
const action = document.getElementById("action");

document.addEventListener('DOMContentLoaded', async e => {

    const res = await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/apartment/get/${id}`);
    await res
    .json()
    .then((data) => {
        title.innerText = data.title
        price.innerText = data.price
        rooms.innerText = data.rooms
        city.innerText = data.city
        country.innerText = data.country
        adress.innerText = data.adress
        thumbnail.src = data.thumbnail
        excerpt.innerText = data.excerpt
        state.innerText = data.state ? "Disponible" : "Reservado o Desactivado"
        action.innerHTML = data.admin == user ? `<a href="/editApto?id=${id}&user=${user}" class="btn btn-danger">Editar</a>` : `<a href="/reserva?id=${id}&user=${user}" class="btn btn-primary">Reservar</a>`
       });
  
})

