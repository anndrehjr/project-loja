<?php
$para = $_POST['email_cliente'];
$assunto = 'Confirmação de Compra';
$mensagem = 'Obrigado por sua compra! Seu pedido foi processado com sucesso.';

mail($para, $assunto, $mensagem);
?>
