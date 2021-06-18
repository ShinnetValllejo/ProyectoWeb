const id = document.getElementById("id").value;
document.addEventListener('DOMContentLoaded', async e => {
    const res = await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/apartments/get-available`);
    await res.json()
    .then((data) => {
        const aparmbx = document.getElementById("apartbx");
        data.map( apartment => {
            aparmbx.innerHTML += `<div class="card mb-3" style="max-width: calc(50% - 30px); padding:0">
            <div class="row g-0">
              <div class="col-md-5">
                <img style="object-fit: cover; width: 100%; height: 100%;" src="${apartment.images}" alt="...">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <h5 class="card-title">${apartment.title}</h5>
                  <ul class="list-group">
                    <li class="list-group-item card-text"><strong>Localizacion: </strong>${apartment.country}, ${apartment.city}</li>
                    <li class="list-group-item card-text"><strong>Precio: </strong>${apartment.price}</li>
                    <li class="list-group-item card-text"><strong>Descripcion: </strong>${apartment.excerpt}</li>
                    </ul>
                    <br>  
                    <a href="/detalle?id=${apartment._id}&user=${id}" class="btn btn-primary">Ver Detalles</a>
                  <p class="card-text"><small class="text-muted">Disponible para arriendo</small></p>
                </div>
              </div>
            </div>
          </div>
          <br>`
        })
    })
});

