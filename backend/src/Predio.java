import java.util.List;
import java.util.ArrayList;

public class Predio {
    private String rua;
    private String bairro;
    private String cidade;
    private String cep;
    private String nomeCondominio;
    private int numeroCondominio;
    private List<Unidade> unidades;
    private List<Predio> predios;

    //get e set "rua"
    public String getRua(){
        return rua;
    }
    public void setRua(String rua){
        this.rua = rua;
    }

    //get e set bairro
    public String getBairro(){
        return bairro;
    }
    public void setBairro(String bairro){
        this.bairro = bairro;
    }

    //get e set "cidade"
    public String getCidade(){
        return cidade;
    }
    public void setCidade(String cidade){
        this.cidade = cidade;
    }

    //get e set "cep"
    public String getCep(){
        return cep;
    }
    public void setCep(String cep){
        this.cep = cep;
    }

    //get e set "nomeCondominio"
    public String getNomeCondominio(){
        return nomeCondominio;
    }
    public void setNomeCondominio(String nomeCondominio){
        this.nomeCondominio = nomeCondominio;
    }

    //get e set "numeroCondominio"
    public int getNumeroCondominio(){
        return numeroCondominio;
    }
    public void setNumeroCondominio(int numeroCondominio){
        this.numeroCondominio = numeroCondominio;
    }


    public Predio(String rua, String bairro, String cidade, String cep, String nomeCondominio, int numeroCondominio){
        this.rua = rua;
        this.bairro = bairro;
        this.cidade = cidade;
        this.cep = cep;
        this.nomeCondominio = nomeCondominio;
        this.numeroCondominio = numeroCondominio;
        this.unidades = new ArrayList<>();
        this.predios = new ArrayList<>();
    }

    //Método para adicionar (add) e buscar (get) uma Unidade (Aparatamento)
    public void adicionarUnidade(Unidade unidade){
        this.unidades.add(unidade);
    }

    public List<Unidade> getUnidades(){
        return unidades;
    }

    //Método para adicionar (add) e buscar (get) um Predio
    public void adicionarPredio(Predio predio){
        this.predios.add(predio);
    }

    public List<Predio> getPredios(){
        return predios;
    }
}
