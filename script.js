/* eslint-disable no-console */
const questions = [
  {
    text: "Qual a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Belo Horizonte"],
    answer: 2
  },
  {
    text: "Qual linguagem roda no navegador?",
    options: ["Python", "C#", "JavaScript", "Ruby"],
    answer: 2
  },
  {
    text: "Qual número é primo?",
    options: ["4", "6", "9", "11"],
    answer: 3
  }
];

let currentIndex = 0;
const userAnswers = [];

const questionSection = document.getElementById('question-section');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const resultSection = document.getElementById('result-section');
const scoreEl = document.getElementById('score');
const answersList = document.getElementById('answers-list');
const restartBtn = document.getElementById('restart-btn');

function renderQuestion() {
  const q = questions[currentIndex];
  const selected = userAnswers[currentIndex];

  const html = `
    <fieldset>
      <legend>${currentIndex + 1}. ${q.text}</legend>
      ${q.options
        .map(
          (opt, i) => `
        <input type="radio" name="option" id="opt${i}" value="${i}" ${
            selected === i ? 'checked' : ''
          }>
        <label for="opt${i}">${opt}</label>`
        )
        .join('')}
    </fieldset>
  `;
  questionSection.innerHTML = html;
  prevBtn.disabled = currentIndex === 0;
  nextBtn.textContent = currentIndex === questions.length - 1 ? 'Ver Resultado' : 'Próxima';
}

function getSelectedOption() {
  const radios = document.getElementsByName('option');
  for (const r of radios) {
    if (r.checked) return Number(r.value);
  }
  return null;
}

prevBtn.addEventListener('click', () => {
  const sel = getSelectedOption();
  if (sel !== null) userAnswers[currentIndex] = sel;
  if (currentIndex > 0) currentIndex--;
  renderQuestion();
});

nextBtn.addEventListener('click', () => {
  const sel = getSelectedOption();
  if (sel === null) {
    alert('Selecione uma opção antes de continuar.');
    return;
  }
  userAnswers[currentIndex] = sel;

  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  let correct = 0;
  answersList.innerHTML = '';
  questions.forEach((q, idx) => {
    const isCorrect = userAnswers[idx] === q.answer;
    if (isCorrect) correct++;
    const li = document.createElement('li');
    li.textContent = `${idx + 1}. ${q.text} – Sua resposta: ${
      q.options[userAnswers[idx]]
    } (${isCorrect ? 'Correta' : 'Errada'})`;
    answersList.appendChild(li);
  });
  scoreEl.textContent = `Você acertou ${correct} de ${questions.length} perguntas.`;
  document.getElementById('quiz-form').hidden = true;
  resultSection.hidden = false;
}

restartBtn.addEventListener('click', () => {
  currentIndex = 0;
  userAnswers.length = 0;
  resultSection.hidden = true;
  document.getElementById('quiz-form').hidden = false;
  renderQuestion();
});

// Inicializa
renderQuestion();