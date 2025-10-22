document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitBtn = form.querySelector('button[type="submit"]');
  const msgBox = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // simple UI changes
    submitBtn.disabled = true;
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = "Envoi en cours...";

    // optional: checkbox value to send as 'Oui'/'Non'
    const confCheckbox = document.getElementById("confidentiality");
    const confValue = confCheckbox.checked ? "Oui" : "Non";

    // Add a hidden input with confidentiality if not present (EmailJS needs form fields)
    let hiddenInput = form.querySelector('input[name="confidentiality"]');
    if (!hiddenInput) {
      hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = "confidentiality";
      form.appendChild(hiddenInput);
    }
    hiddenInput.value = confValue;

    // send with EmailJS - replace service & template IDs
    emailjs
      .sendForm("service_5qcl6wr", "template_jq2zx4s", "#contactForm")
      .then(
        function (response) {
          // success
          msgBox.classList.remove("hidden");
          msgBox.classList.remove("text-red-600", "bg-red-100");
          msgBox.classList.add("text-green-700", "bg-green-100");
          msgBox.innerText = "Merci — votre message a été envoyé avec succès !";
          form.reset();
        },
        function (error) {
          // error
          msgBox.classList.remove("hidden");
          msgBox.classList.remove("text-green-700", "bg-green-100");
          msgBox.classList.add("text-red-600", "bg-red-100");
          msgBox.innerText = "Erreur lors de l'envoi. Réessayez plus tard.";
          console.error("EmailJS error:", error);
        }
      )
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        // optionally hide message after X seconds
        setTimeout(() => {
          if (msgBox) msgBox.classList.add("hidden");
        }, 8000);
      });
  });
});
