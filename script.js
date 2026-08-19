const elementoOla = document.querySelector('.ola');
const frases = ["OLÁ MUNDO!", "HELLO WORLD!"];

let fraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function efeitoDigitar() {
  const fraseAtual = frases[fraseIndex];

  if (isDeleting) {
    // Remove um caractere
    elementoOla.textContent = fraseAtual.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Adiciona um caractere
    elementoOla.textContent = fraseAtual.substring(0, charIndex + 1);
    charIndex++;
  }

  // Velocidade de digitação (mais rápido ao apagar)
  let velocidade = isDeleting ? 40 : 120;

  if (!isDeleting && charIndex === fraseAtual.length) {
    // Pausa com o texto completo antes de começar a apagar
    velocidade = 500; 
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Troca para a próxima frase após apagar tudo
    isDeleting = false;
    fraseIndex = (fraseIndex + 1) % frases.length;
    velocidade = 350; // Pausa rápida antes de começar a próxima
  }

  setTimeout(efeitoDigitar, velocidade);
}

// Inicia o efeito assim que a página carregar
document.addEventListener('DOMContentLoaded', efeitoDigitar);

const canvas = document.getElementById('estrelas');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 65; // Quantidade de estrelas no triângulo

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
      speedFactor: Math.random() * 0.5 + 0.2 // Fator de velocidade para o efeito paralaxe
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scrollY = window.scrollY;

  stars.forEach(star => {
    // Calcula o deslocamento vertical proporcional ao scroll
    let starY = (star.y - scrollY * star.speedFactor) % canvas.height;
    if (starY < 0) starY += canvas.height;

    ctx.beginPath();
    ctx.arc(star.x, starY, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
}

// Eventos de rolagem e redimensionamento da janela
window.addEventListener('resize', resizeCanvas);
window.addEventListener('scroll', () => {
  requestAnimationFrame(drawStars);
});

// Renderização inicial ao carregar a página
resizeCanvas();

// Observador que detecta quando os elementos entram na tela
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    // Se o elemento estiver visível na viewport, adiciona a classe 'ativo'
    if (entry.isIntersecting) {
      entry.target.classList.add('ativo');
    }
  });
}, {
  threshold: 0.15 // Dispara a animação quando 15% do elemento surgir na tela
});

// Registra todos os elementos que têm a classe 'revelar'
document.querySelectorAll('.revelar').forEach(elemento => {
  observer.observe(elemento);
});

const modal = document.getElementById('modalGithub');
const modalTitulo = document.getElementById('modalTitulo');
const modalDescricao = document.getElementById('modalDescricao');
const btnExpandir = document.getElementById('btnExpandir');
const btnFechar = document.querySelector('.fechar-modal');

// Adiciona o evento em todos os botões/ícones do GitHub
document.querySelectorAll('.btn-github').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault(); // Impede a navegação direta imediata

    // Pega as informações do card pai
    const card = btn.closest('.card');
    const tituloProjeto = card.querySelector('h3') ? card.querySelector('h3').textContent : 'Projeto';
    const repoUrl = btn.getAttribute('data-repo') || btn.getAttribute('href');

    // Preenche os dados no modal
    modalTitulo.textContent = tituloProjeto;
    modalDescricao.textContent = `Você está prestes a acessar o repositório completo do projeto "${tituloProjeto}".`;
    btnExpandir.setAttribute('href', repoUrl);

    // Abre o modal
    modal.classList.add('ativo');
  });
});

// Fechar no X
btnFechar.addEventListener('click', () => {
  modal.classList.remove('ativo');
});

// Fechar ao clicar fora da caixa do modal
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
}, { threshold: 0.2 }); // Dispara quando 20% da seção aparecer na tela

const secaoStacks = document.querySelector('.stacks');
if (secaoStacks) {
    observerStacks.observe(secaoStacks);
}

// Animação das estrelas no fundo da seção Stacks
const canvasStacks = document.getElementById("estrelasStacks");

if (canvasStacks) {
    const ctx = canvasStacks.getContext("2d");
    let estrelas = [];
    const qtdEstrelas = 80; // Quantidade de estrelas no fundo

    // Ajusta o tamanho real do canvas ao tamanho da tela/seção
    function redimensionarCanvas() {
        canvasStacks.width = canvasStacks.parentElement.offsetWidth;
        canvasStacks.height = canvasStacks.parentElement.offsetHeight;
        criarEstrelas();
    }

    // Cria as estrelas com posições, tamanhos e opacidades aleatórias
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

    // Função de animação (efeito de piscar)
    function animarEstrelas() {
        ctx.clearRect(0, 0, canvasStacks.width, canvasStacks.height);

        estrelas.forEach((e) => {
            // Altera a opacidade para dar o efeito de cintilar
            e.alpha += e.velocidade * e.direcao;
            if (e.alpha >= 1 || e.alpha <= 0.1) {
                e.direcao *= -1;
            }

            ctx.beginPath();
            ctx.arc(e.x, e.y, e.raio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(90, 169, 230, ${e.alpha})`; // Azul suave `#5aa9e6`
            ctx.fill();
        });

        requestAnimationFrame(animarEstrelas);
    }

    window.addEventListener("resize", redimensionarCanvas);
    redimensionarCanvas();
    animarEstrelas();
}

function copiarEmail(event, email) {
    // Copia o endereço de e-mail para a área de transferência da pessoa
    navigator.clipboard.writeText(email);

    // Exibe um aviso amigável para o usuário
    alert("Endereço de e-mail copiado (" + email + ")! Abrindo o Gmail...");
}