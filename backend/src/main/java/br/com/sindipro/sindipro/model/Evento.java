package br.com.sindipro.sindipro.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

// Evento do condomínio: assembleia, festa, manutenção, limpeza da caixa d'água...
@Entity
@Table(name = "evento")
public class Evento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O título é obrigatório")
    @Size(max = 100, message = "O título pode ter no máximo 100 caracteres")
    private String titulo;

    // Opcional: pauta, observações...
    @Size(max = 500, message = "A descrição pode ter no máximo 500 caracteres")
    @Column(length = 500)
    private String descricao;

    @NotBlank(message = "O local é obrigatório")
    @Size(max = 100, message = "O local pode ter no máximo 100 caracteres")
    private String local;

    // O React manda "2026-11-05T19:00" e o Spring converte sozinho para LocalDateTime.
    @NotNull(message = "A data e hora são obrigatórias")
    private LocalDateTime dataHora;

    @NotNull(message = "O evento precisa ser de um prédio")
    @ManyToOne
    @JoinColumn(name = "predio_id")
    private Predio predio;

    public Evento() {
    }

    //Métodos get
    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getLocal() {
        return local;
    }

    public LocalDateTime getDataHora() {
        return dataHora;
    }

    public Predio getPredio() {
        return predio;
    }

    //Métodos set
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public void setDataHora(LocalDateTime dataHora) {
        this.dataHora = dataHora;
    }

    public void setPredio(Predio predio) {
        this.predio = predio;
    }
}
