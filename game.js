const personagem = document.getElementById("personagem");
const caixaInfo = document.getElementById("caixa-info");
const conteudoInfo = document.getElementById("conteudo-info");
const popupFinal = document.getElementById("popup-final");

/* =============================
   CONTEÚDO DO CURRÍCULO
   (NÃO REMOVER)
============================= */

// Dados Pessoais
function conteudoDados() { return `
<h2>Dados Pessoais</h2>
<p><strong>Nacionalidade:</strong> Brasileira</p>
<p><strong>Data de nascimento:</strong> 25/10/2002</p>
<p><strong>Endereço:</strong> Zona Sul, São Paulo - SP, 04951-050</p>
<p><strong>Celular (WhatsApp):</strong> (11) 9 1422-2424</p>
<p><strong>E-mail:</strong> caueribeiroferreira@gmail.com</p>
<hr>
<h3>Objetivo Profissional</h3>
<p>Desenvolvedor de Software</p>
<p>Analista de Dados</p>
<p>Analista de Segurança da Informação / Cibernética</p>`;}

// Formação Acadêmica
function conteudoFormacao() { return `
<h2>Formação Acadêmica</h2>
<p><strong>Faculdade Uninter</strong></p>
<p>Tecnólogo em Análise e Desenvolvimento de Sistemas</p>
<p>07/2025 a 12/2027</p><br>
<p><strong>Ensino Médio:</strong> Completo</p>
<hr>
<h3>Conhecimentos Técnicos</h3>
<p><strong>Front End:</strong> HTML, CSS, JavaScript</p>
<p><strong>UI/UX:</strong> Figma, Canva</p>
<p><strong>Back End:</strong> Python, Java</p>
<p><strong>Ferramentas:</strong> Word, Power BI, Inteligência Artificial</p>
<p><strong>Excel Básico:</strong> Fundação Bradesco (2016)</p>`;}

// Experiência Profissional
function conteudoExperiencia() { return `
<h2>Experiência Profissional</h2>
<p><strong>Hairline Cabelos e Acessórios LTDA</strong></p>
<p>02/2024 – 05/2025</p>
<p>Venda de produtos, operação de caixa, organização de estoque, atendimento ao cliente, auxílio no marketing e operador de vendas E-commerce.</p>
<br>
<p><strong>Cocadinha Atacado e Varejo – Doceria</strong></p>
<p>03/2023 – 09/2023</p>
<p>Organização de estoque, recebimento e armazenamento de mercadorias, auxílio na operação de caixa, atendimento ao cliente e serviços gerais.</p>
<hr>
<h3>Habilidades</h3>
<p>Atitude positiva</p>
<p>Facilidade de comunicação</p>
<p>Ética, honestidade e integridade</p>
<p>Pontualidade, flexibilidade e adaptação</p>
<p>Inteligência emocional</p>
<p>Iniciativa e proatividade</p>
<p>Trabalho em equipe</p>
<p>Interessado em evoluir</p>
<p>Motivado a aprender coisas novas</p>
<p>Raciocínio lógico</p>`;}

// Redes Sociais
function conteudoRedes() { return `
<h2>Redes Sociais</h2>
<p><a href="https://github.com/Caue2002" target="_blank">GitHub: github.com/Caue2002</a></p>
<p><a href="https://www.linkedin.com/in/ribeiroferreiracaue" target="_blank">LinkedIn: linkedin.com/in/ribeiroferreiracaue</a></p>`;}

// Carta de Apresentação
function conteudoCarta() { return `
<h2>Carta de Apresentação</h2>
<p>Sou estudante de Análise e Desenvolvimento de Sistemas, com grande interesse em iniciar minha carreira na área de Tecnologia da Informação.</p>
<p>Possuo conhecimentos em HTML, CSS, JavaScript, Python e Java, além de familiaridade com ferramentas como Power BI, Figma e conceitos de UI/UX.</p>
<p>Busco uma oportunidade onde eu possa aplicar meus conhecimentos, aprender continuamente e contribuir com soluções eficientes na área de TI.</p>`;}

/* =============================
   MOVIMENTO
============================= */

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

/* =============================
   JOYSTICK
============================= */

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

/* =============================
   COLISÕES (CORRIGIDO)
============================= */

function verificarColisoes() {
    let emAlgumaZona = false;

    emAlgumaZona |= checarZona("zona-dados", conteudoDados);
    emAlgumaZona |= checarZona("zona-formacao", conteudoFormacao);
    emAlgumaZona |= checarZona("zona-experiencia", conteudoExperiencia);
    emAlgumaZona |= checarZona("zona-redes", conteudoRedes);
    emAlgumaZona |= checarZona("zona-carta", conteudoCarta);

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

    const colidiu =
        p.right > zona.left &&
        p.left < zona.right &&
        p.bottom > zona.top &&
        p.top < zona.bottom;

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
