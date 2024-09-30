// Evento de submit para o formulário (mantendo apenas um evento de submit)
document.getElementById('produtoForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário de recarregar a página

    const nomeProduto = document.getElementById('nomeProduto').value;
    const statusProduto = document.getElementById('statusProduto').value;

    await adicionarProduto(nomeProduto, statusProduto);
});

// Função para adicionar produto
async function adicionarProduto(nome, status) {
    try {
        const response = await fetch('http://127.0.0.1:5000/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, status })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Produto adicionado com sucesso:', data);
            await obterProdutos(); // Chama a função para obter os produtos atualizados
        } else {
            console.error('Erro ao adicionar produto:', response.statusText);
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

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
                const statusCorrigido = produto.status.trim().toLowerCase();
                statusDiv.classList.add(statusCorrigido === 'disponível' ? 'statusd' : 'statusi');

                const statusText = document.createElement('p');
                statusText.textContent = produto.status || 'Disponível';

                // Criar o botão para deletar
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-button');
                const deleteImg = document.createElement('img');
                deleteImg.src = '/images/trash.svg';
                deleteImg.classList.add('excluir');

                deleteButton.appendChild(deleteImg);

                deleteButton.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await deletarProduto(produto.id);
                    await obterProdutos(); // Atualiza a lista de produtos após a exclusão
                });

                containerDiv.appendChild(statusDiv);
                containerDiv.appendChild(statusText);
                itemDiv.appendChild(img);
                itemDiv.appendChild(nomeP);
                itemDiv.appendChild(containerDiv);
                itemDiv.appendChild(deleteButton);

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

// Função para deletar produto
async function deletarProduto(id) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/produtos/${id}`, {
            method: 'DELETE'
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
    }
}

// Carregar produtos ao carregar a página
document.addEventListener("DOMContentLoaded", async function() {
    await obterProdutos();
});
