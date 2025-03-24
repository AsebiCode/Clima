document.addEventListener("DOMContentLoaded", () => {
    const botaoBuscar = document.querySelector("button");
    
    botaoBuscar.addEventListener("click", buscarClima);
});

async function buscarClima() {
    const apiKey = "2af363ce7663ae2ea4559b21638b2e43";
    const inputCidade = document.getElementById("cidade");
    const cidade = inputCidade.value.trim();

    if (cidade === "") {
        alert("Por favor, digite uma cidade válida!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

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
    
    document.querySelector("article").innerHTML = `
        <p class="font-medium mb-1">${name}</p>
        <p class="font-bold text-7xl mb-1">${temperatura}º</p>
        <p class="mb-1">Min: ${main.temp_min}º / Max: ${main.temp_max}º</p>
        <p class="mb-5 capitalize">${descricao}</p>

        <input type="text" id="cidade" placeholder="Cidade, Bairro, Estado" 
            class="outline-0 p-2 mb-3 rounded-xl w-full bg-white/50 text-sky-700">
        <button class="bg-blue-500 text-white font-medium px-4 py-2 rounded-xl w-full">Buscar</button>
    `;

    // Re-adiciona o evento ao botão porque o HTML foi substituído
    document.querySelector("button").addEventListener("click", buscarClima);
}
