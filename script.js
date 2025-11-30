// Helpers
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* BALLOONS */
function spawnBalloons(count = 18) {
  const stage = document.getElementById("balloon-stage");
  const colors = ["#6ea8ff","#ff9aa2","#b3ffd9","#ffd36e","#cfa0ff","#9be7ff"];

  for (let i = 0; i < count; i++) {
    let b = document.createElement("div");
    b.className = "balloon";

    let color = colors[Math.floor(Math.random() * colors.length)];
    b.style.background = color;

    b.style.left = rand(5, 90) + "vw";
    b.style.animationDuration = rand(3.5, 5) + "s";
    b.style.animationDelay = rand(0, 0.7) + "s";

    stage.appendChild(b);
  }
}

/* MAIN ANIMATION SEQUENCE */
async function runSequence() {

  spawnBalloons(20);
  await wait(3500);

  document.getElementById("cake-stage").classList.remove("hidden");
  await wait(600);

  const countText = document.getElementById("count");

  for (let i = 3; i >= 1; i--) {
    countText.textContent = i;
    countText.style.transform = "scale(1.2)";
    await wait(650);
    countText.style.transform = "scale(1)";
    await wait(80);
  }

  document.getElementById("countdown").textContent = "Blow!";
  await wait(600);

  const flame = document.getElementById("flame");
  flame.style.transition = "opacity .7s, transform .7s";
  flame.style.opacity = 0;
  flame.style.transform = "translateY(-8px) scale(0.6)";
  await wait(900);

  const final = document.getElementById("final-message");
  final.classList.remove("hidden");

  await wait(1300);

  const overlay = document.getElementById("overlay");
  overlay.style.transition = "opacity .7s ease";
  overlay.style.opacity = 0;

  await wait(800);
  overlay.style.display = "none";

  const main = document.getElementById("main-content");
  main.classList.remove("hidden");
  main.style.opacity = 0;
  main.style.transition = "opacity .8s ease, transform .8s ease";
  await wait(20);
  main.style.opacity = 1;
  main.style.transform = "translateY(0)";
}

/* SPECIAL MESSAGE */
document.addEventListener("DOMContentLoaded", () => {
  runSequence();

  const btn = document.getElementById("openMsgBtn");
  const msg = document.getElementById("specialMsg");

  btn.addEventListener("click", () => {
    msg.classList.toggle("show");
  });
});
