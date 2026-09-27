public abstract class Morador {

    private String nome;
    private String cpf;
    private int idade;
    private Unidade unidade;

    //get e set de "nome"
    public String getNome(){
        return nome;
    }
    public void setNome(String nome){
        this.nome = nome;
    }

    //get e set de "cpf"
    public String getCpf(){
        return cpf;
    }
    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    //get e set "idade"
    public int getIdade(){
        return idade;
    }
    public void setIdade(int idade){
        this.idade = idade;
    }

    //get e set "unidade"
    public Unidade getUnidade(){
        return unidade;
    }
    public void setUnidade(Unidade unidade){
        this.unidade = unidade;
    }

    //Método Construtor

    public Morador(String nome, String cpf, int idade, Unidade unidade){
        this.nome = nome;
        this.cpf = cpf;
        this.idade = idade;
        this.unidade = unidade;
    }

    //Método + polimorfismo

    public abstract String descricao();


}
