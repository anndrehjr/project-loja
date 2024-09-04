<?php
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['carrinho'])) {
    echo json_encode($_SESSION['carrinho']);
} else {
    echo json_encode([]);
}
?>
