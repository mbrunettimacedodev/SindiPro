public class Inquilino extends Morador {

    private double valorAluguel;

    public Inquilino(String nome, String cpf, int idade, Unidade unidade, double valorAluguel) {
        super(nome,cpf,idade,unidade);
        this.valorAluguel = valorAluguel;
    }

    public double getValorAluguel(){
        return valorAluguel;
    }

    public void setValorAluguel(double valorAluguel){
        this.valorAluguel = valorAluguel;
    }

    @Override
    public String descricao(){
        return "Inquilino: " + getNome() + " Aluguel: R$" + valorAluguel;
    }
}
