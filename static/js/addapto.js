const addapto = async () => {
    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;
    const rooms = document.getElementById("rooms").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const adress = document.getElementById("adress").value;
    const thumbnail = document.getElementById("thumbnail").value;
    const excerpt = document.getElementById("excerpt").value;
    const id = document.getElementById("id").value;

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
        `http://shineapi.us-east-2.elasticbeanstalk.com/user/${id}/add-apartment`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            price,
            rooms,
            city,
            country,
            adress,
            thumbnail,
            images: thumbnail,
            excerpt
          }),
        }
      );
      await res
        .json()
        .then(async (data) => {
          if (typeof data["error"] != "undefined") {
            alert(data.error);
          } else {
                window.location = '/perfil';
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  