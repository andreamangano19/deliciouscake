// Mostra/Nasconde suggerimenti
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

// Controllo risposta case-insensitive
function checkAnswer(inputId) {
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(inputId + "-feedback");
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = input.dataset.answer.trim().toLowerCase();

  if (!userAnswer) {
    feedback.textContent = "⚠️ Inserisci una risposta!";
    feedback.className = "feedback warn";
    return;
  }

  if (userAnswer === correctAnswer) {
    feedback.textContent = "✅ Corretto!";
    feedback.className = "feedback ok";
  } else {
    feedback.textContent = "❌ Risposta errata. Riprova.";
    feedback.className = "feedback err";
  }
}
