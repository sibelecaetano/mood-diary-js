// Emojis disponíveis
const emojis = ["😃", "😐", "😢", "😡", "😴"];
const historico = JSON.parse(localStorage.getItem("historicoHumor")) || []; // Carrega histórico salvo
const historicoSemana = document.getElementById("historico");

// Cria os botões de emojis
const selecionarMoodDiv = document.querySelector(".selecionar-mood");
let humorSelecionado = null;

emojis.forEach(emoji => {
    const btn = document.createElement("button");
    btn.className = "btn btn-light btn-sm m-1";
    btn.textContent = emoji;
    btn.addEventListener("click", () => {
        humorSelecionado = emoji;
        // Destaca o emoji selecionado
        document.querySelectorAll(".selecionar-mood button").forEach(b => b.classList.remove("btn-secondary"));
        btn.classList.add("btn-secondary");
    });
    selecionarMoodDiv.appendChild(btn);
});

// Função para atualizar o histórico e o resumo
function atualizarHistorico() {
    // Atualizar a lista de histórico
    historicoSemana.innerHTML = `
        <h2>Histórico da Semana</h2>
        <ul class="list-group mb-3">
            ${historico.map(item => `<li class="list-group-item">${item.emoji} - ${item.motivo}</li>`).join("")}
        </ul>
    `;

    // Contagem de humores
    const resumo = {};
    emojis.forEach(e => resumo[e] = 0);
    historico.forEach(item => resumo[item.emoji]++);

    // Gerar resumo HTML
    let resumoHTML = "<h4>Resumo dos Humores:</h4><ul>";
    for (let emoji in resumo) {
        resumoHTML += `${emoji}: ${resumo[emoji]}`;
    }
    resumoHTML += "</ul>";

    // Adiciona o resumo no histórico
    historicoSemana.innerHTML += resumoHTML;
}

// Carrega o histórico
atualizarHistorico();

document.querySelector("button.btn-primary").addEventListener("click", () => {
    const motivo = document.getElementById("floatingTextarea2").value.trim();
    if (!humorSelecionado || motivo === "") {
        alert("Selecione um humor e escreva o motivo.");
        return;
    }

    const entrada = { emoji: humorSelecionado, motivo };
    historico.push(entrada);

    // Alerta com o emoji selecionado
    alert(`Você selecionou: ${humorSelecionado}`);

    // Salva o histórico no localStorage
    localStorage.setItem("historicoHumor", JSON.stringify(historico));

    // Atualiza o histórico exibido
    atualizarHistorico();

    // Limpa os campos
    humorSelecionado = null;
    document.getElementById("floatingTextarea2").value = "";
    document.querySelectorAll(".selecionar-mood button").forEach(b => b.classList.remove("btn-secondary"));
});
