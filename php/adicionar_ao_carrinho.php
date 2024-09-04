<?php
include 'conectar.php';

session_start();

if (!isset($_SESSION['carrinho'])) {
    $_SESSION['carrinho'] = [];
}

$nome = $_POST['nome'];
$preco = $_POST['preco'];
$produto_encontrado = false;

// Verificar se o produto já está no carrinho
foreach ($_SESSION['carrinho'] as &$item) {
    if ($item['nome'] === $nome) {
        $item['quantidade']++;
        $produto_encontrado = true;
        break;
    }
}

if (!$produto_encontrado) {
    // Adicionar novo produto ao carrinho
    $_SESSION['carrinho'][] = [
        'nome' => $nome,
        'preco' => $preco,
        'quantidade' => 1
    ];
}

echo "Produto adicionado ao carrinho!";
?>
