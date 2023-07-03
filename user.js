let form = document.querySelector("#registration-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let name = form.elements.name.value;
  let age = form.elements.age.value;
  let place = form.elements.place.value;
  let batch = form.elements.batch.value;
  let profession = form.elements.profession.value;

  let response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      age,
      place,
      batch,
      profession,
    }),
  });
  console.log(response);
  if (response.ok) {
    alert("Successfully Registered");
    form.reset();
  } else {
    alert("Registration Failed");
  }
});
