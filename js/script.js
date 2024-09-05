document.addEventListener('DOMContentLoaded', function() {
    const pathname = window.location.pathname;

    if (pathname.endsWith('carrinho.html')) {
        carregarCarrinho();
    } else if (pathname.endsWith('index.html')) {
        carregarProdutos();
    } else if (pathname.endsWith('pagamento.html')) {
        carregarTotalCompra();
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
                    <button class="glow-on-hover" type="button" onclick="adicionarAoCarrinho('${produto.nome}', '${produto.preco}')">Adicionar ao Carrinho</button>
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
            const mensagemVazio = document.getElementById('mensagem-vazio');
            const totalDiv = document.getElementById('total-container');
            let total = 0;
            
            container.innerHTML = '';
            if (carrinho.length === 0) {
                mensagemVazio.style.display = 'block';
                totalDiv.style.display = 'none';
            } else {
                mensagemVazio.style.display = 'none';
                totalDiv.style.display = 'block';
                
                carrinho.forEach(item => {
                    let preco = parseFloat(item.preco.replace('R$ ', '').replace(',', '.'));
                    total += preco * item.quantidade;
                    const itemDiv = document.createElement('div');
                    itemDiv.className = 'produto';
                    itemDiv.innerHTML = `
                        <h2>${item.nome}</h2>
                        <p>Preço: ${item.preco}</p>
                        <p>Quantidade: ${item.quantidade}</p>
                        <button class="glow-on-hover" type="button" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
                    `;
                    container.appendChild(itemDiv);
                });
                totalContainer.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
                localStorage.setItem('totalCarrinho', total.toFixed(2));
            }
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
        carregarCarrinho();
    })
    .catch(error => console.error('Erro ao remover do carrinho:', error));
}

function fazerPagamento() {
    window.location.href = 'pagamento.html';
}
