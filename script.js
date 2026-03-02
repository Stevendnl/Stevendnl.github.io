const homeSection = document.getElementById("home");
const contentSection = document.getElementById("content");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let flatChapters = [];
let currentIndex = -1;

function flattenCourses() {
  courses.forEach(course => {
    course.chapters.forEach(chapter => {
      flatChapters.push({
        courseTitle: course.title,
        ...chapter
      });
    });
  });
}

function renderHome() {
  homeSection.innerHTML = "<h2>Accueil</h2>";

  flatChapters.forEach((chapter, index) => {
    const div = document.createElement("div");
    div.className = "course-item";
    div.innerHTML = `<strong>${chapter.courseTitle}</strong> — ${chapter.title}`;
    div.onclick = () => openChapter(index);
    homeSection.appendChild(div);
  });
}

function openChapter(index) {
  currentIndex = index;
  const chapter = flatChapters[index];

  homeSection.classList.add("hidden");
  contentSection.classList.remove("hidden");

  contentSection.innerHTML = `
    <h2>${chapter.courseTitle}</h2>
    <h3>${chapter.title}</h3>
    ${chapter.content}
  `;

  if (chapter.quiz) {
    renderQuiz(chapter.quiz);
  }
}

function renderQuiz(quiz) {
  const quizDiv = document.createElement("div");
  quizDiv.innerHTML = `<h4>${quiz.question}</h4>`;

  quiz.options.forEach((option, i) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.className = "quiz-option";
    btn.onclick = () => {
      if (i === quiz.answer) {
        alert("Bonne réponse !");
      } else {
        alert("Mauvaise réponse.");
      }
    };
    quizDiv.appendChild(btn);
  });

  contentSection.appendChild(quizDiv);
}

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    openChapter(currentIndex - 1);
  }
};

nextBtn.onclick = () => {
  if (currentIndex < flatChapters.length - 1) {
    openChapter(currentIndex + 1);
  }
};

flattenCourses();
renderHome();
