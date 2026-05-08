const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");

      let count = 0;
      const update = () => {
        count += target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
      observer.unobserve(counter);
    }
  });
});

counters.forEach(c => observer.observe(c));

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  // Inputs
  const nom = document.getElementById("nom");
  const prenom = document.getElementById("prenom");
  const email = document.getElementById("email");
  const sujet = document.getElementById("sujet");
  const message = document.getElementById("message");

  // Reset erreurs
  document.querySelectorAll("small").forEach(el => el.textContent = "");
  document.getElementById("successMsg").textContent = "";

  // Nom
  if (nom.value.trim() === "") {
    errorNom.textContent = "Nom requis";
    valid = false;
  }

  // Prénom
  if (prenom.value.trim() === "") {
    errorPrenom.textContent = "Prénom requis";
    valid = false;
  }

  // Email regex
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email.value)) {
    errorEmail.textContent = "Email invalide";
    valid = false;
  }

  // Sujet
  if (sujet.value === "") {
    errorSujet.textContent = "Choisir un sujet";
    valid = false;
  }

  // Message
  if (message.value.length < 20) {
    errorMessage.textContent = "Minimum 20 caractères";
    valid = false;
  }

  // Succès
  if (valid) {
    document.getElementById("successMsg").textContent = "Message envoyé avec succès !";
    form.reset();
  }
});

