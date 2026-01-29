const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");
const popupFinal = document.getElementById("popup-final");

/* CONTEÚDOS (SEUS DADOS — RESTAURADOS) */
function conteudoDados() {
    return `
        <h3>Dados & Objetivo</h3>
        <p>Nome: Cauê Ribeiro Ferreira</p>
        <p>Objetivo: Estágio em Tecnologia da Informação</p>
        <p>Perfil focado em aprendizado contínuo e desenvolvimento profissional.</p>
    `;
}

function conteudoFormacao() {
    return `
        <h3>Formação & Conhecimentos</h3>
        <p>Ensino Superior em andamento na área de TI</p>
        <p>Conhecimentos em lógica de programação, HTML, CSS, JavaScript e Java</p>
    `;
}

function conteudoExperiencia() {
    return `
        <h3>Experiência & Habilidades</h3>
        <p>Projetos acadêmicos e pessoais</p>
        <p>Boa comunicação, trabalho em equipe e organização</p>
    `;
}

function conteudoRedes() {
    return `
        <h3>Redes Sociais</h3>
        <p>GitHub: github.com/seuusuario</p>
        <p>LinkedIn: linkedin.com/in/seuperfil</p>
    `;
}

function conteudoCarta() {
    return `
        <h3>Carta de Apresentação</h3>
        <p>Sou uma pessoa dedicada, curiosa e motivada a crescer na área de tecnologia,
        buscando aplicar meus conhecimentos e aprender na prática.</p>
    `;
}

/* POSIÇÃO */
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 2.5;

const vistos = new Set();

/* ATUALIZA POSIÇÃO */
function atualizarPosicao() {
    personagem.style.left = x + "px";
    personagem.style.top = y + "px";
    verificarColisoes();
}

/* JOYSTICK */
const joystick = document.getElementById("joystick");
const handle = joystick.querySelector(".joystick-handle");
let ativo = false;

joystick.addEventListener("touchstart", e => {
    ativo = true;
    e.preventDefault();
});

joystick.addEventListener("touchend", () => {
    ativo = false;
    handle.style.transform = "translate(-50%, -50%)";
});

joystick.addEventListener("touchmove", e => {
    if (!ativo) return;

    const touch = e.touches[0];
    const rect = joystick.getBoundingClientRect();

    const dx = touch.clientX - (rect.left + rect.width / 2);
    const dy = touch.clientY - (rect.top + rect.height / 2);

    const max = 35;
    const dist = Math.min(Math.sqrt(dx * dx + dy * dy), max);
    const ang = Math.atan2(dy, dx);

    const mx = Math.cos(ang) * dist;
    const my = Math.sin(ang) * dist;

    handle.style.transform = `translate(${mx - 20}px, ${my - 20}px)`;

    x += (mx / max) * velocidade;
    y += (my / max) * velocidade;

    x = Math.max(0, Math.min(window.innerWidth, x));
    y = Math.max(0, Math.min(window.innerHeight, y));

    atualizarPosicao();
});

/* COLISÕES */
function verificarColisoes() {
    verificarZona("zona-dados", conteudoDados);
    verificarZona("zona-formacao", conteudoFormacao);
    verificarZona("zona-experiencia", conteudoExperiencia);
    verificarZona("zona-redes", conteudoRedes);
    verificarZona("zona-carta", conteudoCarta);

    if (vistos.size === 5) {
        popupFinal.style.display = "flex";
        setTimeout(() => popupFinal.style.display = "none", 5000);
    }
}

function verificarZona(id, conteudo) {
    const zona = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();

    if (
        p.right > zona.left &&
        p.left < zona.right &&
        p.bottom > zona.top &&
        p.top < zona.bottom
    ) {
        caixaInfo.style.display = "block";
        conteudoInfo.innerHTML = conteudo();
        comemoracao.style.display = "block";
        vistos.add(id);
    }
}

atualizarPosicao();
