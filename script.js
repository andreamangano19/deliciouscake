function toggleHint(button) {
  const hint = button.nextElementSibling;
  if (hint.style.display === "none" || hint.style.display === "") {
    hint.style.display = "block";
    button.textContent = "Nascondi suggerimento";
  } else {
    hint.style.display = "none";
    button.textContent = "Mostra suggerimento";
  }
}
