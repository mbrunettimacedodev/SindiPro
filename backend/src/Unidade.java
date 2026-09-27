public class Unidade {

    private String bloco;
    private int andar;
    private int numeroApartamento;
    private Predio predio;

    //get e set "bloco"
    public String getBloco(){
        return bloco;
    }
    public void setBloco(String bloco){
        this.bloco = bloco;
    }

    //get e set "andar"
    public int getAndar(){
        return andar;
    }
    public void setAndar(int andar){
        this.andar = andar;
    }

    //get e set "numeroApartamento"
    public int getNumeroApartamento(){
        return numeroApartamento;
    }
    public void setNumeroApartamento(int numeroApartamento){
        this.numeroApartamento = numeroApartamento;
    }

    //get e set "predio"
    public Predio getPredio(){
        return predio;
    }
    public void setPredio(Predio predio){
        this.predio = predio;
    }

    public Unidade(String bloco, int andar, int numeroApartamento, Predio predio){
        this.bloco = bloco;
        this.andar = andar;
        this.numeroApartamento = numeroApartamento;
        this.predio = predio;
    }


}
