// ANNIMATION DES COMPTEURS AU SCROLL

// selectionne tous les elements ayant la classe "counter"
const counters = document.querySelectorAll(".counter");
// creation dun observateur qui detecte lorsque lelement devient visible
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    // verifie si lelement est visible a lecran
    if (entry.isIntersecting) {
      // element actuellement observe
      const counter = entry.target;
      // recupere la valeur cible depuis lattribut data-target
      const target = +counter.getAttribute("data-target");
      // valeur de depart du compteur
      let count = 0;
      // fonction danimation du compteur
      const update = () => {
        // augmentation progressive
        count += target / 100;
        // continue lanimation tant que la cible nest pas atteinte
        if (count < target) {
          counter.innerText = Math.ceil(count);
          // demande au navigateur dexecuter la prochaine frame;
          requestAnimationFrame(update);
        } else {
          // affiche la valeur finale exacte
          counter.innerText = target;
        }
      };
      // lance lanimation
      update();
      // arrete dobserver lelement apres son animation
      observer.unobserve(counter);
    }
  });
});
// observe chaque compteur de la page
counters.forEach(c => observer.observe(c));
// VALIDATION DU FORMULAIRE DE CONTACT

// recuperation du formulaire
const form = document.getElementById("contactForm");
// ecoute levenement de soumission
form.addEventListener("submit", function (e) {
  // empeche lenvoi automatique du formulaire
  e.preventDefault();
  // variable de controle de variation
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

