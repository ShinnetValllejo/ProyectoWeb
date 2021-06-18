const deleteBook = async (id, user) => {
    await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/user/${user}/delete-booking/${id}`)
    location.reload();
}

document.addEventListener('DOMContentLoaded', async e => {

    const id = document.getElementById("id").value;
    const res = await fetch(`http://shineapi.us-east-2.elasticbeanstalk.com/user/${id}/mis-reservas`);
    await res.json()
    .then((data) => {
        
        const country = document.getElementById("myapartments");

        data.map( reserva => {
            country.innerHTML += `<div class="card" style="border-radius:10px; overflow:hidden;">
            <div class="card-horizontal" style="align-items: center; gap:10px">
                <div class="img-square-wrapper">
                    <img style="width: 300px ; height: 250px ; object-fit:cover" src="${reserva.apartment.thumbnail}" alt="Card image cap">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${reserva.apartment.title} - Laureles</h5>
                    <ul class="list-group">
                        <li class="list-group-item card-text"><strong>Fecha Ingreso: </strong>${reserva.ingreso}</li>
                        <li class="list-group-item card-text"><strong>Fecha salida: </strong>${reserva.salida}</li>
                        <li class="list-group-item card-text"><strong>Nombre del Reservante: </strong>${reserva.client.name} / ${reserva.client.country}, ${reserva.client.city}</li>
                    </ul>
                    <br>
                    <a onclick="deleteBook('${reserva._id}','${reserva.client._id}')" class="btn btn-danger">Cancelar Reserva</a>                      
                </div>
            </div>
        </div>
        <br>`
        })
    })
});

