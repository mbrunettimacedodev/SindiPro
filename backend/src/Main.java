import java.util.ArrayList;
import java.util.List;

public class Main{
    public static void main(String[] args){
        Predio predio = new Predio("Doritos", "Fandangos", "Gelatina", "93900-000", "+PraTI", 100);
        Predio predio2 = new Predio("Astolfinho", "Mirabel", "Tirimbau", "888.777.222.12", "Ravena", 35);

        Unidade unidade = new Unidade("A", 4, 406, predio);
        Unidade unidade2 = new Unidade("B", 3, 302, predio);
        Unidade unidade3 = new Unidade("C", 2, 204, predio);
        Unidade unidade4 = new Unidade("D", 1, 104, predio2);
        Unidade unidade5 = new Unidade("E", 3, 301,predio2);

        Inquilino inquilino = new Inquilino("Rodrigo", "000.000.000.00", 20, unidade, 2000);
        Inquilino inquilino2 = new Inquilino("Fernanda", "001.002.003.04", 88, unidade2, 2500);
        Inquilino inquilino3 = new Inquilino("Cassia", "010.020.030.40", 63, unidade3, 3000);

        Proprietario proprietario = new Proprietario("João", "044.333.222.11", 50, unidade3, true);

        System.out.println(inquilino.getNome());
        System.out.println(unidade.getAndar());
        System.out.println(predio.getBairro());

        System.out.println(inquilino.getValorAluguel());
        System.out.println(proprietario.getCpf());

        List<Morador> moradores = new ArrayList<>();
        moradores.add(inquilino);
        moradores.add(inquilino2);
        moradores.add(inquilino3);
        moradores.add(proprietario);

        for(Morador m : moradores) {
            System.out.println(m.descricao());
        }

        predio.adicionarUnidade(unidade);
        predio.adicionarUnidade(unidade2);
        predio.adicionarUnidade(unidade3);

        predio2.adicionarUnidade(unidade4);
        predio2.adicionarUnidade(unidade5);

        for(Predio p: predios){
            System.out.println("Predio: " + p.getPredios());
        for(Unidade u: unidades){
            System.out.println("Bloco: " + u.getBloco() + " Número Apartamento: " + u.getNumeroApartamento());
        }
        }
    }
}