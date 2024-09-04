<?php
session_start();

$nome = $_POST['nome'];

// Procurar o produto no carrinho e removê-lo
foreach ($_SESSION['carrinho'] as $index => $item) {
    if ($item['nome'] === $nome) {
        unset($_SESSION['carrinho'][$index]);
        // Reindexa o array para evitar buracos
        $_SESSION['carrinho'] = array_values($_SESSION['carrinho']);
        break;
    }
}

echo "Produto removido do carrinho!";
?>