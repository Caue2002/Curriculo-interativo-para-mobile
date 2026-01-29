// Programa principal
const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const popupFinal = document.getElementById("popup-final");

// Dados Pessoais
function conteudoDados() {
return `
# Dados Pessoais
_________________________________________
Nacionalidade: Brasileira 
Data de nascimento: 25/10/2002 
Endereço: Zona Sul, São Paulo - SP, 04951-050 
Celular (WhatsApp): (11) 9 1422-2424 
E-mail: caueribeiroferreira@gmail.com

# Objetivo Profissional
__________________________________________
Desenvolvedor de Software 
Analista de Dados 
Analista de Segurança da Informação / Cibernética 
`;
}
// Formação Acadêmica
function conteudoFormacao() {
return `
#Formação Acadêmica
___________________________________________
Faculdade Uninter 
Tecnólogo em Análise e Desenvolvimento de Sistemas 
07/2025 a 12/2027 
Ensino Médio: Completo

#Conhecimentos Técnicos
___________________________________________
Front End: HTML, CSS, JavaScript 
UI/UX: Figma, Canva 
Back End: Python, Java 
Ferramentas: Word, Power BI, Inteligência Artificial 
Excel Básico: Fundação Bradesco (2016) 
`;
}
// Experiência Profissional
function conteudoExperiencia() {
return `
#Experiência Profissional
___________________________________________
Hairline Cabelos e Acessórios LTDA 
02/2024 – 05/2025 
Venda de produtos, operação de caixa, organização de estoque, atendimento ao cliente, auxílio no marketing e operador de vendas E-commerce. 
___________________________________________
Cocadinha Atacado e Varejo – Doceria 
03/2023 – 09/2023 
Organização de estoque, recebimento e armazenamento de mercadorias, auxílio na operação de caixa, atendimento ao cliente e serviços gerais.

#Habilidades
___________________________________________
Atitude positiva 
Facilidade de comunicação 
Ética, honestidade e integridade 
Pontualidade, flexibilidade e adaptação 
Inteligência emocional 
Iniciativa e proatividade 
Trabalho em equipe 
Interessado em evoluir 
Motivado a aprender coisas novas 
Raciocínio lógico 
`;
}
// Redes Sociais
function conteudoRedes() {
return `
#Redes Sociais
___________________________________________
[GitHub: github.com/Caue2002](https://github.com/Caue2002) 
[LinkedIn: linkedin.com/in/ribeiroferreiracaue](https://www.linkedin.com/in/ribeiroferreiracaue) 
`;
}
// Carta de Apresentação
function conteudoCarta() {
return `
#Carta de Apresentação
___________________________________________
Sou estudante de Análise e Desenvolvimento de Sistemas, com grande interesse em iniciar minha carreira na área de Tecnologia da Informação. 
Possuo conhecimentos em HTML, CSS, JavaScript, Python e Java, além de familiaridade com ferramentas como Power BI, Figma e conceitos de UI/UX. 
Busco uma oportunidade onde eu possa aplicar meus conhecimentos, aprender continuamente e contribuir com soluções eficientes na área de TI. 
`;
}

/*MOVIMENTO*/
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
const velocidade = 2.5;

const vistos = {
    "zona-dados": false,
    "zona-formacao": false,
    "zona-experiencia": false,
    "zona-redes": false,
    "zona-carta": false
};

let popupFinalMostrado = false;

/* Atualiza posição */
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
    let emAlgumaZona = false;
    emAlgumaZona = checarZona("zona-dados", conteudoDados) || emAlgumaZona;
    emAlgumaZona = checarZona("zona-formacao", conteudoFormacao) || emAlgumaZona;
    emAlgumaZona = checarZona("zona-experiencia", conteudoExperiencia) || emAlgumaZona;
    emAlgumaZona = checarZona("zona-redes", conteudoRedes) || emAlgumaZona;
    emAlgumaZona = checarZona("zona-carta", conteudoCarta) || emAlgumaZona;

if (!emAlgumaZona) {
    caixaInfo.style.display = "none";
}

if (Object.values(vistos).every(v => v) && !popupFinalMostrado) {
    popupFinalMostrado = true;
    popupFinal.style.display = "flex";
    setTimeout(() => {
    popupFinal.style.display = "none";
    }, 5000);
}
}

function checarZona(id, conteudo) {
    const zona = document.getElementById(id).getBoundingClientRect();
    const p = personagem.getBoundingClientRect();
    const colidiu = p.right > zona.left && p.left < zona.right && p.bottom > zona.top && p.top < zona.bottom;

if (colidiu) {
    caixaInfo.style.display = "block";
    conteudoInfo.innerHTML = conteudo();
    vistos[id] = true;
    return true;
}
return false;
}

/* Inicial */
atualizarPosicao();

/* espelhamento e progresso === */

  //  Criar a barra de progresso dinamicamente
(function () {
    const progresso = document.createElement('div');
    progresso.id = 'progresso';
    progresso.innerHTML = '<div class="barra" aria-hidden="true"></div>';
    document.body.appendChild(progresso);
    const barra = progresso.querySelector('.barra');

function atualizarBarra() {
    const total = Object.keys(vistos).length;      // 5 zonas
    const lidos = Object.values(vistos).filter(Boolean).length;
    const pct = (lidos / total) * 100;
    barra.style.width = pct + '%';
}

atualizarBarra();
setInterval(atualizarBarra, 200);

  //Espelhar o personagem quando mover para a esquerda/direita
const img = document.getElementById('imagem-usuario');

joystick.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    const r = joystick.getBoundingClientRect();
    const dx = t.clientX - (r.left + r.width / 2);
    if (dx < -4) img.classList.add('virado-esquerda');
    else if (dx > 4) img.classList.remove('virado-esquerda');
}, { passive: true });

  // Fallback por deslocamento real (se no futuro houver outro input)
let prevX = x;
const flipLoop = () => {
    if (x < prevX - 0.5) img.classList.add('virado-esquerda');
    else if (x > prevX + 0.5) img.classList.remove('virado-esquerda');
    prevX = x;
    requestAnimationFrame(flipLoop);
};
requestAnimationFrame(flipLoop);
})();
