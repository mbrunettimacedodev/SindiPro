package br.com.sindipro.sindipro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "unidade")
public class Unidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int numeroApartamento;
    private String bloco;
    private int andar;

    @ManyToOne
    @JoinColumn(name="predio_id")
    private Predio predio;

    public Unidade(){

    }



}
