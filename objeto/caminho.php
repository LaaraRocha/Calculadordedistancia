<?php

class caminho {

    private $origem;
    private $distancia;
    private $destino;

    function __construct($origem, $distancia, $destino){
        $this->origem = $origem;
        $this->distancia = $distancia;
        $this->destino = $destino;
    }

    public function setOrigem($origem){
        $this->origem = $origem;
    }

    function getOrigem(){
        return $this->origem;
    }

    public function setDistancia($distancia){
        $this->distancia = $distancia;
    }

    public function getDistancia(){
        return $this->distancia;
    }

    public function setDestino($destino){
        $this->destino = $destino;
    }

    public function getDestino(){
        return $this->destino;
    }
}