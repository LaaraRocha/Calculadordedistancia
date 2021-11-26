<?php

session_start();

    $url = 'http://localhost:3080/buscar-lista-aeroportos';
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_HTTPGET, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response_json = curl_exec($ch);
    curl_close($ch);
    $nomeAeroporto = json_decode($response_json, true);

    if (isset($_POST['calcular_distancia'])) {
        if (isset($_POST['aeroporto_origem']) && isset($_POST['aeroporto_destino'])){
            $origem = $_POST['aeroporto_origem'];
            $destino = $_POST['aeroporto_destino'];
            $origemDestino = array('aeroportoOrigem' => $origem,
                'aeroportoDestino' => $destino);
            $url = 'http://localhost:3080/calcular-distancia?'.http_build_query($origemDestino);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HTTPGET, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $resposta = curl_exec($ch);
            curl_close($ch);
            $caminho = json_decode($resposta, true);
            echo $caminho;
        }
    }

?>

<!DOCTYPE html>
<html lang="ptbr" xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="UTF-8">
    <title>Calculadora distancia</title>
</head>
<body>
<img alt="grafo de aeroportos" height="600" width="900" src="GRAFO_TRABALHO.png">

<form method="post">
    <fieldset>
        <legend><strong>Selecione Origem e Destino</strong></legend>
        <label for="origem_do_voo">Origem</label>
        <input type="text" id="origem_do_voo" list="origem" name="aeroporto_origem" required="required"
               placeholder="Selecione sua Origem">

        <datalist id="origem">
            <?php
                if (isset($nomeAeroporto)){
                    foreach ($nomeAeroporto as $aeromosquito){
                        echo '<option value="'.$aeromosquito.'" name="origem">'.$aeromosquito.'</option>';
                    }
                }

            ?>
        </datalist>

        <label for="destino_do_voo">Destino</label>
        <input type="text" id="destino_do_voo" list="destino" name="aeroporto_destino" required="required"
               placeholder="Selecione seu Destino">

        <datalist id="destino">
            <?php
            if (isset($nomeAeroporto)){
                foreach ($nomeAeroporto as $aeromosquito){
                    echo '<option value="'.$aeromosquito.'" name="destino">'.$aeromosquito.'</option>';
                }
            }

            ?>
        </datalist>
        <input type="submit" id="calcular" name="calcular_distancia" value="calcular distância">


        <?php
            if ($caminho != null){
               echo '<table>';
            }
            foreach ($caminho as $aviao) {
                echo '<tr>';
                echo '<td>'.$aviao['origem'].' '.$aviao['distancia'].' '.$aviao['destino'].'</td>';
                echo '</tr>';
            }
            echo '</table>';
        ?>



        </table>
    </fieldset>
</form>
</body>
</html>
