const elementoOla = document.querySelector('.ola');
const frases = ["OLÁ MUNDO!", "HELLO WORLD!"];

let fraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Efeito digitação no hello world!
function efeitoDigitar() {
  const fraseAtual = frases[fraseIndex];

  if (isDeleting) {
    elementoOla.textContent = fraseAtual.substring(0, charIndex - 1);
    charIndex--;
  } else {
    elementoOla.textContent = fraseAtual.substring(0, charIndex + 1);
    charIndex++;
  }

  let velocidade = isDeleting ? 40 : 120;

  if (!isDeleting && charIndex === fraseAtual.length) {
    velocidade = 500; 
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    fraseIndex = (fraseIndex + 1) % frases.length;
    velocidade = 350;
  }

  setTimeout(efeitoDigitar, velocidade);
}

document.addEventListener('DOMContentLoaded', efeitoDigitar);

const canvas = document.getElementById('estrelas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 65;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  initStars();
  drawStars();
}

function initStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speedFactor: Math.random() * 0.5 + 0.2
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scrollY = window.scrollY;

  stars.forEach(star => {
    let starY = (star.y - scrollY * star.speedFactor) % canvas.height;
    if (starY < 0) starY += canvas.height;

    ctx.beginPath();
    ctx.arc(star.x, starY, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', () => {
  requestAnimationFrame(drawStars);
});

resizeCanvas();

//
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.revelar').forEach(elemento => {
  observer.observe(elemento);
});

const modal = document.getElementById('modalGithub');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const btnExpandir = document.getElementById('btnExpandir');
const btnFechar = document.querySelector('.fechar-modal');
 
document.querySelectorAll('.btn-github').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const card = btn.closest('.card');
    const tituloProjeto = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Projeto';
    const repoUrl = btn.getAttribute('data-repo') || btn.getAttribute('href');

    modalTitulo.textContent = tituloProjeto;
    modalDescricao.textContent = `Você está prestes a acessar o repositório completo do projeto "${tituloProjeto}".`;
    btnExpandir.setAttribute('href', repoUrl);

    modal.classList.add('ativo');
  });
});

btnFechar.addEventListener('click', () => {
  modal.classList.remove('ativo');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('ativo');
  }
});

const observerStacks = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const blocos = entry.target.querySelectorAll('.bloco');
            blocos.forEach((bloco) => {
                bloco.classList.add('virado');
            });
        }
    });
}, { threshold: 0.2 }); 

const secaoStacks = document.querySelector('.stacks');
if (secaoStacks) {
    observerStacks.observe(secaoStacks);
}

// Animação das estrelas no fundo da seção Stacks
const canvasStacks = document.getElementById("estrelasStacks");

if (canvasStacks) {
    const ctx = canvasStacks.getContext("2d");
    let estrelas = [];
    const qtdEstrelas = 80;

    function redimensionarCanvas() {
        canvasStacks.width = canvasStacks.parentElement.offsetWidth;
        canvasStacks.height = canvasStacks.parentElement.offsetHeight;
        criarEstrelas();
    }

    function criarEstrelas() {
        estrelas = [];
        for (let i = 0; i < qtdEstrelas; i++) {
            estrelas.push({
                x: Math.random() * canvasStacks.width,
                y: Math.random() * canvasStacks.height,
                raio: Math.random() * 1.8 + 0.5,
                alpha: Math.random(),
                velocidade: Math.random() * 0.02 + 0.005,
                direcao: Math.random() < 0.5 ? 1 : -1
            });
        }
    }

    function animarEstrelas() {
        ctx.clearRect(0, 0, canvasStacks.width, canvasStacks.height);

        estrelas.forEach((e) => {
            e.alpha += e.velocidade * e.direcao;
            if (e.alpha >= 1 || e.alpha <= 0.1) {
                e.direcao *= -1;
            }

            ctx.beginPath();
            ctx.arc(e.x, e.y, e.raio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(90, 169, 230, ${e.alpha})`;
            ctx.fill();
        });

        requestAnimationFrame(animarEstrelas);
    }

    window.addEventListener("resize", redimensionarCanvas);
    redimensionarCanvas();
    animarEstrelas();
}

function abrirEmail(event, email) {
    event.preventDefault();
    
    try {
        navigator.clipboard.writeText(email);
    } catch (err) {
        console.warn("Não foi possível copiar o email:", err);
    }

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const urlGmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    if (isMobile) {
        window.location.href = `googlegmail://co?to=${email}`;

        setTimeout(() => {
            window.location.href = urlGmailWeb;
        }, 600);
    } else {
        window.open(urlGmailWeb, '_blank');
        alert("Endereço de e-mail copiado (" + email + ")! Abrindo o Gmail...");
    }
}