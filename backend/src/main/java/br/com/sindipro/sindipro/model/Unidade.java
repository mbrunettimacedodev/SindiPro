package br.com.sindipro.sindipro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "unidade")

public class Unidade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="predio_id")
    private Predio predio;




    private int numeroApartamento;
    private String bloco;
    private int andar;


    //Métodos get
    public Long getId() {
        return id;
    }

    public int getNumeroApartamento() {
        return numeroApartamento;
    }

    public String getBloco() {
        return bloco;
    }

    public int getAndar() {
        return andar;
    }

    public Predio getPredio() {
        return predio;
    }

    //Métodos set
    public void setId(Long id) {
        this.id = id;
    }

    public void setNumeroApartamento(int numeroApartamento) {
        this.numeroApartamento = numeroApartamento;
    }

    public void setBloco(String bloco) {
        this.bloco = bloco;
    }

    public void setAndar(int andar) {
        this.andar = andar;
    }

    public void setPredio(Predio predio) {
        this.predio = predio;
    }

    public Unidade(){

    }



}
