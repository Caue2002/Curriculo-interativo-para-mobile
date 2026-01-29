const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");

/* POSIÇÃO */
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 3;

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

    const max = 40;
    const dist = Math.min(Math.sqrt(dx*dx + dy*dy), max);
    const ang = Math.atan2(dy, dx);

    const mx = Math.cos(ang) * dist;
    const my = Math.sin(ang) * dist;

    handle.style.transform = `translate(${mx - 22}px, ${my - 22}px)`;

    x += (mx / max) * velocidade;
    y += (my / max) * velocidade;

    atualizarPosicao();
});

/* COLISÕES */
function verificarColisoes() {
    verificarZona("zona-dados", conteudoDados);
    verificarZona("zona-formacao", conteudoFormacao);
    verificarZona("zona-experiencia", conteudoExperiencia);
    verificarZona("zona-redes", conteudoRedes);
    verificarZona("zona-carta", conteudoCarta);
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
    }
}
