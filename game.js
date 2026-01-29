const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const comemoracao = document.getElementById("comemoracao");

/*CONTROLE DE TÓPICOS VISITADOS  */
const topicosVisitados = {
    dados: false,
    formacao: false,
    experiencia: false,
    redes: false,
    carta: false
};

let popupMostrado = false;

/*  POSIÇÃO */
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 2.5;

function atualizarPosicao() {
    personagem.style.left = x + "px";
    personagem.style.top = y + "px";
    verificarColisoes();
}

/* JOYSTICK */
function configurarJoystick(id, callback) {
    const joystick = document.getElementById(id);
    const handle = joystick.querySelector(".joystick-handle");
    let ativo = false;

    joystick.addEventListener("touchstart", () => ativo = true);
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
        const dist = Math.min(Math.sqrt(dx*dx + dy*dy), max);
        const ang = Math.atan2(dy, dx);

        const mx = Math.cos(ang) * dist;
        const my = Math.sin(ang) * dist;

        handle.style.transform = `translate(${mx - 21}px, ${my - 21}px)`;
        callback(mx / max, my / max);
    });
}

/* Movimento */
configurarJoystick("joystick-esquerdo", (dx, dy) => {
    x += dx * velocidade * 2;
    y += dy * velocidade * 2;
    atualizarPosicao();
});

configurarJoystick("joystick-direito", () => {});

/* COLISÕES  */
function verificarColisoes() {
    verificarZona("zona-dados", dados, "dados");
    verificarZona("zona-formacao", formacao, "formacao");
    verificarZona("zona-experiencia", experiencia, "experiencia");
    verificarZona("zona-redes", redes, "redes");
    verificarZona("zona-carta", carta, "carta");
}

function verificarZona(id, funcConteudo, chave) {
    const zona = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();

    if (
        p.right > zona.left &&
        p.left < zona.right &&
        p.bottom > zona.top &&
        p.top < zona.bottom
    ) {
        caixaInfo.style.display = "block";
        conteudoInfo.innerHTML = funcConteudo();
        comemoracao.style.display = "block";

        if (!topicosVisitados[chave]) {
            topicosVisitados[chave] = true;
            verificarConclusao();
        }
    }
}

/* VERIFICA SE TODOS FORAM VISTOS  */
function verificarConclusao() {
    const todosVistos = Object.values(topicosVisitados).every(v => v);

    if (todosVistos && !popupMostrado) {
        popupMostrado = true;
        mostrarPopupParabens();
    }
}

/* POPUP FINAL  */
function mostrarPopupParabens() {
    const popup = document.createElement("div");
    popup.id = "popup-parabens";
    popup.innerHTML = `
        <h2>Parabéns!</h2>
        <p>Você explorou todo o meu currículo interativo.</p>
        <p>Obrigado por visitar.</p>
    `;
    document.body.appendChild(popup);

    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
        popup.remove();
    }, 5000);
}

/* CONTEÚDOS */
function dados() {
return `
<h3>Dados Pessoais</h3>
<p>Nacionalidade: Brasileira</p>
<p>Nascimento: 25/10/2002</p>
<p>Endereço: Zona Sul – São Paulo</p>
<p>Celular: (11) 9 1422-2424</p>
<p>E-mail: caueribeiroferreira@gmail.com</p>
`;
}

function formacao() {
return `
<h3>Formação</h3>
<p>Análise e Desenvolvimento de Sistemas – Uninter</p>
<p>2025 – 2027</p>
<p>Excel Básico – Fundação Bradesco</p>
`;
}

function experiencia() {
return `
<h3>Experiência</h3>
<p>Hairline (2024–2025)</p>
<p>Cocadinha (2023)</p>
`;
}

function redes() {
return `
<h3>Redes</h3>
<p>GitHub: Caue2002</p>
<p>LinkedIn: ribeiroferreiracaue</p>
`;
}

function carta() {
return `
<h3>Carta</h3>
<p>
Sou estudante de Análise e Desenvolvimento de Sistemas,
buscando iniciar carreira em TI com aprendizado contínuo.
</p>
`;
}
