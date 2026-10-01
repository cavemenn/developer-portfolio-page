const name = "Jeremy";
const greetings = `Welcome to ${name}'s portfolio website`;

alert(greetings)

const cats = [
String.raw`
 /\_/\
( o.o )    Hello there! Welcome to my portfolio
 > ^ <`,
String.raw`
_._     _,-'""@-._
(,-.@._,'(       |\@-/|
    @-.-' \ )-@( , o o)     "Waits patiently for job offer"
          @-    \@_@"'- `,
String.raw`
  \    /\
   )  ( ')
  (  /  )    Welcome. I have been waiting for you.
   \(__)|`
];

const asciiOutput = document.getElementById("ascii-output");
const asciiBtn = document.getElementById("ascii-btn");
let lastIndex = -1;

function showRandomCat() {
    let index;
    do {
        index = Math.floor(Math.random() * cats.length);
    } while (index === lastIndex);   // don't show the same cat twice in a row

    lastIndex = index;
    asciiOutput.textContent = cats[index].slice(1);   // slice(1) removes the newline after the opening backtick
}

asciiBtn.addEventListener("click", showRandomCat);
showRandomCat();   // show one when the page first loads

// ---- Theme toggle ----
const themeBtn = document.getElementById("theme-btn");

function updateIcon() {
  themeBtn.textContent =
    document.documentElement.dataset.theme === "dark" ? "☀️ Flashbang?" : "🌙 Dark mode";
}

themeBtn.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("theme", next);
  updateIcon();
});

updateIcon();

// ---- Scroll-spy for the nav ----
const navLinks = document.querySelectorAll("nav a");
const sections = [...navLinks].map(link =>
    document.querySelector(link.getAttribute("href"))
);

function updateActive() {
  const line = window.innerHeight * 0.35;   // trigger line, 35% down the screen
  let currentId = sections[0].id;           // default: About

  sections.forEach(section => {
    if (section.getBoundingClientRect().top <= line) {
        currentId = section.id;
    }
  });

  // at the very bottom, force the last section (Projects is short)
  const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;
  if (atBottom) currentId = sections[sections.length - 1].id;

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
  });
}

window.addEventListener("scroll", updateActive);
window.addEventListener("resize", updateActive);
updateActive();   // run once on load so About is active immediately
