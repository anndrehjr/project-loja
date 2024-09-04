<?php
header('Content-Type: application/json');

$produtos = [
    [
        "imagemPequena" => "Caixa.png",
        "imagemGrande" => "Sem-Caixa.png",
        "nome" => "Fone Bluetooth",
        "preco" => "R$ 90,00"
    ],
    [
        "imagemPequena" => "Relogio.png",
        "imagemGrande" => "Relogio.png",
        "nome" => "Zeblaze GTS 3",
        "preco" => "R$ 160,00"
    ],
    [
        "imagemPequena" => "Caixa.png",
        "imagemGrande" => "Sem-Caixa.png",
        "nome" => "Produto 3",
        "preco" => "R$ 200,00"
    ]
];

echo json_encode($produtos);
?>
