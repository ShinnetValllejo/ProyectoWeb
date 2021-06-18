const title = document.getElementById("title");
const price = document.getElementById("price");
const rooms = document.getElementById("rooms");
const city = document.getElementById("city");
const country = document.getElementById("country");
const adress = document.getElementById("adress");
const thumbnail = document.getElementById("thumbnail");
const excerpt = document.getElementById("excerpt");
let url = new URL(window.location.href);
const id = url.searchParams.get("id");
const user = url.searchParams.get("user");

document.addEventListener('DOMContentLoaded', async e => {

    const res = await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/apartment/get/${id}`);
    await res
    .json()
    .then((data) => {
        title.value = data.title
        price.value = data.price
        rooms.value = data.rooms
        city.value = data.city
        country.value = data.country
        adress.value = data.adress
        thumbnail.value = data.thumbnail
        excerpt.value = data.excerpt
       });
})


const updateapto = async () => {

    if (
      title == "" ||
      price == "" ||
      rooms == "" ||
      city == "" ||
      adress == "" ||
      thumbnail == "" ||
      excerpt == ""
    ) {
      alert("Debes llenar todos los campos");
    } else {
        const res = await fetch(
            `http://shineapi.us-east-2.elasticbeanstalk.com/user/${user}/update/${id}`,
            {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              body: JSON.stringify({
                title: title.value,
                price: parseInt(price.value),
                city: city.value,
                images: thumbnail.value,
                excerpt: excerpt.value,
                rooms: rooms.value,
                country:country.value,
                thumbnail: thumbnail.value,
                adress:adress.value,
              }),
            },
          );
    
          await res
            .json()
            .then(data => {
              if (typeof data['error'] != 'undefined') {
                alert(data.error);
              } else {
                window.location = '/perfil';
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
    }
  };