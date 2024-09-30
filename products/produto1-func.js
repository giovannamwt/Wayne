
// Função para obter produtos e renderizar no frontend
async function obterProdutos() {
    try {
        const response = await fetch('http://127.0.0.1:5000/produtos');
        
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }

        const produtos = await response.json();
        console.log('Produtos obtidos:', produtos);

        const listaProdutos = document.getElementById('listaProdutos');
        listaProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaProdutos.innerHTML = '<p>Nenhum produto encontrado.</p>';
            return;
        }

        produtos.forEach(produto => {
            if (produto.nome) {
                // Cria a estrutura HTML para cada produto
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                const img = document.createElement('img');
                const imagens = ['/images/arma1.png', '/images/arma2.png', '/images/arma3.png', '/images/arma4.png'];
                const imagemAleatoria = imagens[Math.floor(Math.random() * imagens.length)];
                img.src = produto.imagem || imagemAleatoria;
                
                img.alt = produto.nome;

                const nomeP = document.createElement('p');
                nomeP.textContent = produto.nome;

                const containerDiv = document.createElement('div');
                containerDiv.classList.add('container');

                const statusDiv = document.createElement('div');
                // Comparação corrigida do status
                const statusCorrigido = produto.status.trim().toLowerCase();
                statusDiv.classList.add(statusCorrigido === 'disponível' ? 'statusd' : 'statusi');

                const statusText = document.createElement('p');
                statusText.textContent = produto.status || 'Disponível';

                // Adiciona os elementos ao container
                containerDiv.appendChild(statusDiv);
                containerDiv.appendChild(statusText);
                itemDiv.appendChild(img);
                itemDiv.appendChild(nomeP);
                itemDiv.appendChild(containerDiv);

                listaProdutos.appendChild(itemDiv);
            } else {
                console.error('Produto sem nome:', produto);
            }
        });
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
        const listaProdutos = document.getElementById('listaProdutos');
        listaProdutos.innerHTML = `<p>Erro ao carregar produtos: ${error.message}</p>`;
    }
}

// Carregar produtos ao carregar a página
document.addEventListener("DOMContentLoaded", async function() {
    await obterProdutos();
});



// Carregar produtos ao carregar a página
document.addEventListener("DOMContentLoaded", async function() {
    await obterProdutos();
});
