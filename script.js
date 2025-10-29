// CONFIGURAZIONE SUPABASE
const SUPABASE_URL = 'https://gqpaxboyiigupwqprgxv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxcGF4Ym95aWlndXB3cXByZ3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2ODE5MDQsImV4cCI6MjA3NzI1NzkwNH0.RyDT5fn1FryTuxyC15UM5TFrRXU-NojeQNj22E2_OuM';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let correctCount = 0;
let totalQuestions = 0;

// Carica domande da Supabase
async function loadQuestions() {
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*')
    .order('order_num', { ascending: true, nullsFirst: true })
    .order('id', { ascending: true });

  if (error) {
    document.getElementById('questions-container').innerHTML = 
      `<p class="feedback err">Errore: ${error.message}</p>`;
    console.error(error);
    return;
  }

  totalQuestions = questions.length;
  correctCount = 0;

  const container = document.getElementById('questions-container');
  container.innerHTML = '';

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = `
      <h3>${index + 1}. ${q.question}</h3>
      <input type="text" id="input-${q.id}" placeholder="La tua risposta...">
      
      <button class="hint-btn" onclick="toggleHint('hint-${q.id}', this)">
        Mostra suggerimento
      </button>
      <button class="check-btn" onclick="checkAnswer(${q.id}, '${q.answer.trim()}')">
        Verifica
      </button>
      
      <div class="hint" id="hint-${q.id}">
        <strong>Suggerimento:</strong> ${q.hint}
      </div>
      
      <p id="result-${q.id}" class="feedback"></p>
    `;
    container.appendChild(div);
  });

  updateScore();
}

// Mostra/Nascondi suggerimento
function toggleHint(id, button) {
  const hint = document.getElementById(id);
  if (hint.style.display === "block") {
    hint.style.display = "none";
    button.textContent = "Mostra suggerimento";
  } else {
    hint.style.display = "block";
    button.textContent = "Nascondi suggerimento";
  }
}

// Controlla risposta
function checkAnswer(id, correct) {
  const input = document.getElementById(`input-${id}`);
  const feedback = document.getElementById(`result-${id}`);
  const userAnswer = input.value.trim().toLowerCase();
  const correctAnswer = correct.toLowerCase();

  if (!userAnswer) {
    feedback.textContent = "Inserisci una risposta!";
    feedback.className = "feedback warn";
    return;
  }

  if (userAnswer === correctAnswer) {
    if (!feedback.dataset.checked) {
      correctCount++;
      feedback.dataset.checked = true;
    }
    feedback.textContent = "CORRETTO!";
    feedback.className = "feedback ok";
  } else {
    feedback.textContent = "Sbagliato. Riprova.";
    feedback.className = "feedback err";
  }

  updateScore();
}

// Aggiorna punteggio
function updateScore() {
  const el = document.getElementById('score-container');
  el.innerHTML = `Punteggio: <span style="color:#00ff88">${correctCount}</span> / ${totalQuestions}`;

  if (correctCount === totalQuestions && totalQuestions > 0) {
    el.innerHTML += ' – MISSIONE COMPIUTA!';

    // Messaggio temporaneo
    const msg = document.createElement('p');
    msg.innerHTML = '<strong style="color:#00d4ff;">Redirect in corso...</strong>';
    msg.style.marginTop = '15px';
    el.appendChild(msg);

    // REDIRECT AUTOMATICO dopo 2 secondi
    setTimeout(() => {
      window.location.href = 'congratulations.html';
    }, 2000);
  }
}

// Avvia
loadQuestions();
