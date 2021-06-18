const Submit = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email == "" || password == "") {
    alert("debes llenar todos los campos");
  } else {
      console.log(email,password)
    const res = await fetch(
      `http://shineapi.us-east-2.elasticbeanstalk.com/user/login`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
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
