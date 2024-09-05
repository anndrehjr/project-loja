<?php
// Conecte-se ao banco de dados
$mysqli = new mysqli('localhost', 'usuario', 'senha', 'banco_de_dados');

// Verifique a conexão
if ($mysqli->connect_error) {
    die('Erro de conexão: ' . $mysqli->connect_error);
}

// Obtenha dados do pagamento
$metodoPagamento = $_POST['metodo_pagamento'];
$totalCompra = $_POST['total_compra'];
$cep = $_POST['cep'];

// Obtenha os dados do cliente e do pagamento
$dadosCliente = $_POST['dados_cliente'];
$dadosPagamento = $_POST['dados_pagamento'];

// Insira dados no banco
$sql = "INSERT INTO compras (total_compra, cep, metodo_pagamento, dados_cliente, dados_pagamento) VALUES (?, ?, ?, ?, ?)";
$stmt = $mysqli->prepare($sql);
$stmt->bind_param('dssss', $totalCompra, $cep, $metodoPagamento, $dadosCliente, $dadosPagamento);

if ($stmt->execute()) {
    echo 'Compra finalizada com sucesso!';
} else {
    echo 'Erro ao finalizar a compra: ' . $stmt->error;
}

$stmt->close();
$mysqli->close();
?>
