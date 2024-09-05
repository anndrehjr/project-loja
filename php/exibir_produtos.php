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
    ],
    [
        "imagemPequena" => "Caixa.png",
        "imagemGrande" => "Sem-Caixa.png",
        "nome" => "Pelicula 9D",
        "preco" => "R$ 15,00"
    ],
    [
        "imagemPequena" => "Relogio.png",
        "imagemGrande" => "Relogio.png",
        "nome" => "Fone Bluetooth ",
        "preco" => "R$ 40,00"
    ],
    [
        "imagemPequena" => "Caixa.png",
        "imagemGrande" => "Sem-Caixa.png",
        "nome" => "Capinha",
        "preco" => "R$ 30,00"
    ],
    [
        "imagemPequena" => "Relogio.png",
        "imagemGrande" => "Relogio.png",
        "nome" => "Cabos",
        "preco" => "R$ 40,00"
    ],
    [
        "imagemPequena" => "Caixa.png",
        "imagemGrande" => "Sem-Caixa.png",
        "nome" => "Carregadores",
        "preco" => "R$ 30,00"
    ]
    
];

echo json_encode($produtos);
?>
