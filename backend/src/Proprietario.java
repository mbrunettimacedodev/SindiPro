public class Proprietario extends Morador {

    private boolean temPosse;

    public Proprietario(String nome, String cpf, int idade, Unidade unidade, boolean temPosse){
        super(nome,cpf,idade,unidade);
        this.temPosse = temPosse;
    }

    public boolean isTemPosse(){
        return temPosse;
    }

    public void setTemPosse(boolean temPosse){
        this.temPosse = temPosse;
    }

    @Override
    public String descricao(){
        return "Proprietário: " + getNome() + " (tem posse: " + temPosse + ")";
    }
}
