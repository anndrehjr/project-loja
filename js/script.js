document.addEventListener('DOMContentLoaded', function() {
    carregarProdutos();
    if (window.location.pathname.endsWith('carrinho.html')) {
        carregarCarrinho();
    }
});

function carregarProdutos() {
    fetch('php/exibir_produtos.php')
        .then(response => response.json())
        .then(produtos => {
            const container = document.getElementById('produtos-container');
            produtos.forEach(produto => {
                const produtoDiv = document.createElement('div');
                produtoDiv.className = 'produto';
                produtoDiv.innerHTML = `
                    <a href="${produto.imagemGrande}" data-options="hint:off" class="MagicZoom">
                        <img src="${produto.imagemPequena}" alt="${produto.nome}" class="produto-imagem">
                    </a>
                    <h2>${produto.nome}</h2>
                    <p>Preço: ${produto.preco}</p>
                    <button onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}')">Adicionar ao Carrinho</button>
                `;
                container.appendChild(produtoDiv);
            });
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
}

function adicionarAoCarrinho(nome, preco) {
    fetch('php/adicionar_ao_carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome=${encodeURIComponent(nome)}&preco=${encodeURIComponent(preco)}`
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
    })
    .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
}

function carregarCarrinho() {
    fetch('php/mostrar_carrinho.php')
        .then(response => response.json())
        .then(carrinho => {
            const container = document.getElementById('carrinho-container');
            const totalContainer = document.getElementById('total');
            let total = 0;
            container.innerHTML = '';
            carrinho.forEach(item => {
                let preco = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
                total += preco * item.quantidade;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'produto';
                itemDiv.innerHTML = `
                    <h2>${item.nome}</h2>
                    <p>Preço: ${item.preco}</p>
                    <p>Quantidade: ${item.quantidade}</p>
                    <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                `;
                container.appendChild(itemDiv);
            });
            totalContainer.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        })
        .catch(error => console.error('Erro ao carregar carrinho:', error));
}

function removerDoCarrinho(nome) {
    fetch('php/remover_do_carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `nome=${encodeURIComponent(nome)}`
    })
    .then(response => response.text())
    .then(message => {
        alert(message);
        carregarCarrinho(); // Recarrega o carrinho após a remoção do item
    })
    .catch(error => console.error('Erro ao remover do carrinho:', error));
}
