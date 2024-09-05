document.addEventListener('DOMContentLoaded', function() {
    // Carregar o total da compra
    const totalCompra = localStorage.getItem('totalCompra');
    document.getElementById('total-compra').textContent = totalCompra ? `R$ ${totalCompra.replace('.', ',')}` : 'R$ 0,00';
});

function calcularFrete() {
    const cep = document.getElementById('cep').value;
    if (cep.length !== 9) {
        alert('Digite um CEP válido.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
                return;
            }

            // Simulação de cálculo de frete
            const totalCompra = parseFloat(document.getElementById('total-compra').textContent.replace('R$ ', '').replace(',', '.'));
            let valorFrete = 0;

            if (totalCompra > 250) {
                valorFrete = 0; // Frete grátis
            } else {
                valorFrete = 20; // Valor fixo para o frete, você pode ajustar conforme necessário
            }

            document.getElementById('resultado-frete').innerHTML = `
                Frete: R$ ${valorFrete.toFixed(2).replace('.', ',')}<br>
                Total com Frete: R$ ${(totalCompra + valorFrete).toFixed(2).replace('.', ',')}
            `;
        })
        .catch(error => console.error('Erro ao calcular frete:', error));
}

function finalizarCompra() {
    const metodoPagamento = document.querySelector('input[name="pagamento"]:checked');
    if (!metodoPagamento) {
        alert('Selecione um método de pagamento.');
        return;
    }

    const dadosPagamento = document.getElementById('dados-pagamento');
    if (metodoPagamento.value === 'credito') {
        dadosPagamento.innerHTML = `
            <h3>Dados do Cartão de Crédito:</h3>
            <label for="numero-cartao">Número do Cartão:</label>
            <input type="text" id="numero-cartao" name="numero-cartao"><br>
            <label for="data-validade">Data de Validade:</label>
            <input type="text" id="data-validade" name="data-validade"><br>
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv"><br>
            <label for="parcelas">Número de Parcelas:</label>
            <select id="parcelas" name="parcelas">
                <option value="1">À vista</option>
                <option value="2">2x</option>
                <option value="3">3x</option>
                <option value="4">4x</option>
                <option value="5">5x</option>
                <option value="6">6x</option>
                <option value="7">7x</option>
                <option value="8">8x</option>
                <option value="9">9x</option>
                <option value="10">10x</option>
                <option value="11">11x</option>
                <option value="12">12x</option>
            </select>
        `;
    } else if (metodoPagamento.value === 'debito') {
        dadosPagamento.innerHTML = `
            <h3>Dados do Cartão de Débito:</h3>
            <label for="numero-cartao">Número do Cartão:</label>
            <input type="text" id="numero-cartao" name="numero-cartao"><br>
            <label for="data-validade">Data de Validade:</label>
            <input type="text" id="data-validade" name="data-validade"><br>
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv"><br>
            <p>5% de desconto aplicado.</p>
        `;
    } else if (metodoPagamento.value === 'pix') {
        dadosPagamento.innerHTML = `
            <h3>Dados do PIX:</h3>
            <p>15% de desconto aplicado.</p>
            <p>Chave PIX: [Sua chave PIX]</p>
            <!-- Você pode gerar um QR code aqui -->
        `;
    }
}
