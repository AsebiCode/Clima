document.addEventListener("DOMContentLoaded", () => {
    Saudacao();
    const botaoBuscar = document.querySelector("button");
    
    botaoBuscar.addEventListener("click", buscarClima);
});

function Saudacao() {
    const hora = new Date().getHours();
    let saudacao = document.getElementById("Saudacao").textContent;

    if (hora >= 5 && hora < 12) {
        saudacao = "Bom Dia!";
    } else if (hora >= 12 && hora < 18) {
        saudacao = "Boa Tarde!";
    } else {
        saudacao = "Boa Noite!";
    }

    document.getElementById("Saudacao").textContent = saudacao;
}

async function buscarClima() {
    const apiKey = "2af363ce7663ae2ea4559b21638b2e43";
    const inputBusca = document.getElementById("busca");
    const busca = inputBusca.value.trim();
    const [cidade, estado = "", pais = "BR"] = busca.split(",");

    if (busca === "") {
        alert("Por favor, digite uma cidade válida!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade.trim()},${estado.trim()},${pais.trim()}&appid=${apiKey}&units=metric&lang=pt_br`;

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
    const cidade = dados.city.name;
    const previsao = dados.list[0];
    const temperatura = Math.round(previsao.main.temp);
    const descricao = previsao.weather[0].description;
    const temperaturas = calcularMinMax(dados.list);
    
    let saudacao = document.getElementById("Saudacao");
    let infosPrincipais = document.getElementById("InfosPrincipais");

    // Remove a animação de entrada antes de adicionar a de saída
    saudacao.classList.remove("animate-fade-in-up");

    setTimeout(() => {
        saudacao.classList.add("animate-fade-in-down");
    }, 10); // Pequeno delay para garantir que a classe seja aplicada

    setTimeout(() => {
        saudacao.classList.add("hidden"); // Só esconde depois da animação
        infosPrincipais.classList.remove("hidden");
        infosPrincipais.classList.add("animate-fade-in-up");
    }, 700);


    infosPrincipais.innerHTML = `
        <p class="font-medium mb-1">${cidade}</p>
        <p class="font-bold text-7xl mb-1">${temperatura}º</p>
        <p class="mb-1">Min: ${temperaturas.tempMin}º / Max: ${temperaturas.tempMax}º</p>
        <p class="mb-5 capitalize">${descricao}</p>
    `;
}

// Função para calcular a temperatura mínima e máxima do dia
function calcularMinMax(lista) {
    let tempMin = Infinity;
    let tempMax = -Infinity;

    lista.forEach((item) => {
        tempMin = Math.min(tempMin, item.main.temp_min);
        tempMax = Math.max(tempMax, item.main.temp_max);
    });

    return { tempMin: Math.round(tempMin), tempMax: Math.round(tempMax) };
}