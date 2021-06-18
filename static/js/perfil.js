const activar = async (id) => {
    await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/apartment/active/${id}`);
    location.reload();
}

const desactivar = async (id) => {
    await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/apartment/deactivate/${id}`);
    location.reload();
}

const deleteAparment = async (id) => {
    await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/apartmenst/delete/${id}`)
    location.reload();
}

document.addEventListener('DOMContentLoaded', async e => {

    const id = document.getElementById("id").value;
    const apartments = []
    const res = await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/user/${id}/get-apartments`);
    const data = await res.json()
    .then((data) => {
        
        const country = document.getElementById("myapartments");

        data.map( apartment => {
            country.innerHTML += `<div class="card" style="border-radius:10px; overflow:hidden;">
            <div class="card-horizontal" style="align-items: center; gap:10px">
                <div class="img-square-wrapper">
                    <img style="width: 300px ; height: 180px ;"   class="" src="${apartment.images}" alt="Card image cap">
                </div>
                <div class="card-body">
                    <h4 class="card-title">${apartment.title}</h4>
                    <p class="card-text">Apartamento con ${apartment.rooms} habitaciones / ${apartment.excerpt}</p>
                    <a href="/detalle?id=${apartment._id}&user=${id}" class="btn btn-primary">Ver Detalle</a>
                    <a href="/editApto?id=${apartment._id}&user=${id}" class="btn btn-secondary">Editar</a>
                    <a onclick="deleteAparment('${apartment._id}')" class="btn btn-danger">Eliminar</a>
                    <a onclick="${apartment.state ? "desactivar( '" + apartment._id + "')": "activar( '" + apartment._id + "')"}" class="btn btn-${apartment.state ? "danger" : "primary"}">${apartment.state ? "desactivar" : "activar"}</a>                             
                </div>
            </div>
        </div>
        <br>`
        })
    })
});

