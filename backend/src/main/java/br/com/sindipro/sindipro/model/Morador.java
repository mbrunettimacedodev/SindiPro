package br.com.sindipro.sindipro.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="morador")

public class Morador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "unidade_id")
    private Unidade unidade;



    private String nome;
    private String cpf;
    private int idade;
    private BigDecimal valorAluguel;
    private Boolean temPosse;
    private String tipo;



    //Métodos get
    public String getNome(){
        return nome;
    }

    public String getCpf(){
        return cpf;
    }

    public int getIdade(){
        return idade;
    }

    public BigDecimal getValorAluguel(){
        return valorAluguel;
    }

    public Boolean getTemPosse() {
        return temPosse;
    }

    public String getTipo() {
        return tipo;
    }

    public Long getId(){
        return id;
    }

    public Unidade getUnidade(){
        return unidade;
    }

    //Métodos set
    public void setId(Long id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setIdade(int idade) {
        this.idade = idade;
    }

    public void setValorAluguel(BigDecimal valorAluguel) {
        this.valorAluguel = valorAluguel;
    }

    public void setTemPosse(Boolean temPosse) {
        this.temPosse = temPosse;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setUnidade(Unidade unidade) {
        this.unidade = unidade;
    }

    public Morador(){

    }

}
