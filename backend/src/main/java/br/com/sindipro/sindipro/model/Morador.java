package br.com.sindipro.sindipro.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="morador")

public class Morador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String cpf;
    private int idade;
    private BigDecimal valorAluguel;
    private Boolean temPosse;
    private String tipo;

    @ManyToOne
    @JoinColumn(name = "unidade_id")
    private Unidade unidade;

    public Morador(){

    }

}
