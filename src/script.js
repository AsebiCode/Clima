document.addEventListener("DOMContentLoaded", () => {
    Saudacao();
    const botaoBuscar = document.querySelector("button");
    
    botaoBuscar.addEventListener("click", buscarClima);
});

function Saudacao() {
    const hora = new Date().getHours();
    let saudacao = document.getElementById("Saudacao").textContent;

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom dia!";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa tarde!";
    } else {
        saudacao = "Boa noite!";
    }

    document.getElementById("Saudacao").textContent = saudacao;
}

async function buscarClima() {
    const apiKey = "2af363ce7663ae2ea4559b21638b2e43";
    const inputBusca = document.getElementById("busca");
    const busca = inputBusca.value.trim();

    if (busca === "") {
        alert("Por favor, digite uma cidade válida!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${busca}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error("Cidade não encontrada!");
        }

        const dados = await resposta.json();
        exibirDados(dados);
    } catch (erro) {
        alert(erro.message);
    }
}

function exibirDados(dados) {
    const { name, main, weather } = dados;
    const temperatura = Math.round(main.temp);
    const descricao = weather[0].description;
    
    let InfosPrincipais = document.getElementById('InfosPrincipais');

    document.getElementById('Saudacao').classList.add("hidden");
    InfosPrincipais.classList.remove("hidden");
    InfosPrincipais.innerHTML = `
        <p class="font-medium mb-1">${name}</p>
        <p class="font-bold text-7xl mb-1">${temperatura}º</p>
        <p class="mb-1">Min: ${main.temp_min}º / Max: ${main.temp_max}º</p>
        <p class="mb-5 capitalize">${descricao}</p>
    `;

    // Re-adiciona o evento ao botão porque o HTML foi substituído
    document.querySelector("button").addEventListener("click", buscarClima);
}
