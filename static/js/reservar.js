const addreserva = async () => {
    const ingreso = document.getElementById("start").value;
    const salida = document.getElementById("end").value;
    let url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    const user = url.searchParams.get("user");
    if (
    ingreso == "" ||
    salida == ""
    ) {
      alert("Debes llenar todos los campos");
    } else {
      const res = await fetch(
        `http://shineapi.us-east-2.elasticbeanstalk.com/user/${user}/add-booking/${id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingreso,
            salida,
          }),
        }
      );
      await res
        .json()
        .then(async (data) => {
          if (typeof data["error"] != "undefined") {
            alert(data.error);
          } else {
                window.location = '/apartamentos';
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  