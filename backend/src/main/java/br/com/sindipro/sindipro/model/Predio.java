package br.com.sindipro.sindipro.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "predio")

public class Predio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String rua;
    private String bairro;
    private String cidade;
    private String cep;
    private String nomeCondominio;
    private int numeroCondominio;

    //Métodos get
    public Long getId(){
        return id;
    }

    public String getRua() {
        return rua;
    }

    public String getBairro(){
        return bairro;
    }

    public String getCidade(){
        return cidade;
    }

    public String getCep(){
        return cep;
    }

    public String getNomeCondominio(){
        return nomeCondominio;
    }

    public int getNumeroCondominio(){
        return numeroCondominio;
    }

    //Métodos set
    public void setId(Long id){
        this.id = id;
    }

    public void setRua(String rua){
        this.rua = rua;
    }

    public void setBairro(String bairro){
        this.bairro = bairro;
    }

    public void setCidade(String cidade){
        this.cidade = cidade;
    }

    public void setCep(String cep){
        this.cep = cep;
    }

    public void setNomeCondominio(String nomeCondominio){
        this.nomeCondominio = nomeCondominio;
    }

    public void setNumeroCondominio(int numeroCondominio){
        this.numeroCondominio = numeroCondominio;
    }



    public Predio() {
    }
}
