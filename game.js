const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const popupFinal = document.getElementById("popup-final");

/* CONTEÚDOS DO CURRÍCULO (NÃO REMOVIDOS) */
function conteudoDados() {
    return `
        <h3>Dados & Objetivo</h3>
        <p>Nome: Cauê Ribeiro Ferreira</p>
        <p>Objetivo: Estágio em Tecnologia da Informação</p>
    `;
}

function conteudoFormacao() {
    return `
        <h3>Formação & Conhecimentos</h3>
        <p>Ensino Superior em andamento</p>
        <p>HTML, CSS, JavaScript e Java</p>
    `;
}

function conteudoExperiencia() {
    return `
        <h3>Experiência & Habilidades</h3>
        <p>Projetos acadêmicos e pessoais</p>
        <p>Comunicação e trabalho em equipe</p>
    `;
}

function conteudoRedes() {
    return `
        <h3>Redes Sociais</h3>
        <p>GitHub e LinkedIn</p>
    `;
}

function conteudoCarta() {
    return `
        <h3>Carta de Apresentação</h3>
        <p>Motivado a aprender, evoluir e contribuir com a equipe.</p>
    `;
}

/* POSIÇÃO */
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 2.5;

const vistos = new Set();
let popupMostrado = false;

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

    const t = e.touches[0];
    const r = joystick.getBoundingClientRect();

    const dx = t.clientX - (r.left + r.width / 2);
    const dy = t.clientY - (r.top + r.height / 2);

    const max = 35;
    const dist = Math.min(Math.hypot(dx, dy), max);
    const ang = Math.atan2(dy, dx);

    const mx = Math.cos(ang) * dist;
    const my = Math.sin(ang) * dist;

    handle.style.transform = `translate(${mx - 20}px, ${my - 20}px)`;

    x += (mx / max) * velocidade;
    y += (my / max) * velocidade;

    atualizarPosicao();
});

/* COLISÕES */
function verificarColisoes() {
    let emZona = false;

    emZona |= checarZona("zona-dados", conteudoDados);
    emZona |= checarZona("zona-formacao", conteudoFormacao);
    emZona |= checarZona("zona-experiencia", conteudoExperiencia);
    emZona |= checarZona("zona-redes", conteudoRedes);
    emZona |= checarZona("zona-carta", conteudoCarta);

    if (!emZona) {
        caixaInfo.style.display = "none";
    }

    if (vistos.size === 5 && !popupMostrado) {
        popupMostrado = true;
        popupFinal.style.display = "flex";
        setTimeout(() => popupFinal.style.display = "none", 5000);
    }
}

function checarZona(id, conteudo) {
    const z = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();

    if (p.right > z.left && p.left < z.right && p.bottom > z.top && p.top < z.bottom) {
        caixaInfo.style.display = "block";
        conteudoInfo.innerHTML = conteudo();
        vistos.add(id);
        return true;
    }
    return false;
}

atualizarPosicao();
