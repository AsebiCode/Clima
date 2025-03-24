async function buscarClima() {
    const apiKey = "2af363ce7663ae2ea4559b21638b2e43";
    const cidade = document.getElementById("cidade").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`;

    try {
        const resposta = await fetch(url);
        if (!resposta.ok) {
            throw new Error("Cidade não encontrada!");
        }
        
        const dados = await resposta.json();
        exibirDados(dados);
    } catch (erro) {
        document.getElementById("resultado").innerHTML = `<p class="text-red-500">${erro.message}</p>`;
    }
}

function exibirDados(dados) {
    const { name, main, weather, wind } = dados;
    const descricao = weather[0].description;
    const icone = weather[0].icon;

    document.getElementById("resultado").innerHTML = `
        <h2 class="text-lg font-semibold">${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icone}.png" alt="${descricao}">
        <p><strong>Temperatura:</strong> ${main.temp}°C</p>
        <p><strong>Sensação térmica:</strong> ${main.feels_like}°C</p>
        <p><strong>Umidade:</strong> ${main.humidity}%</p>
        <p><strong>Vento:</strong> ${wind.speed} m/s</p>
        <p class="capitalize">${descricao}</p>
    `;
}
