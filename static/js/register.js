const register = async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const password = document.getElementById("password").value;
  const description = document.getElementById("description").value;

  if (
    name == "" ||
    email == "" ||
    country == "" ||
    city == "" ||
    description == "" ||
    password == ""
  ) {
    alert("Debes llenar todos los campos");
  } else {
    const res = await fetch(
      `http://shineapi.us-east-2.elasticbeanstalk.com/user/register`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          country: country,
          city: city,
          password: password,
          description: description,
        }),
      }
    );
    await res
      .json()
      .then(async (data) => {
        if (typeof data["error"] != "undefined") {
          alert(data.error);
        } else {
            const answ = await fetch(
                `/user/loggin`,
                {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data)
                }
            );

            await answ
                .json()
                .then(
                    () => {
                        window.location = '/perfil';
                })
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
};
