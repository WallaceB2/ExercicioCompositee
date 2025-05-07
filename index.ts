// Componente base para pessoas e grupos
interface ComponenteRede {
    exibirInfo(): void;
}

// Classe que representa uma pessoa
class Pessoa implements ComponenteRede {
    constructor(private nome: string, private email: string) {}

    exibirInfo(): void {
        console.log(`Pessoa: ${this.nome}, Email: ${this.email}`);
    }
}

// Classe que representa um grupo de pessoas
class Grupo implements ComponenteRede {
    private componentes: ComponenteRede[] = [];

    constructor(private nome: string) {}

    adicionar(componente: ComponenteRede): void {
        this.componentes.push(componente);
    }

    remover(componente: ComponenteRede): void {
        const index = this.componentes.indexOf(componente);
        if (index !== -1) {
            this.componentes.splice(index, 1);
        }
    }

    exibirInfo(): void {
        console.log(`Grupo: ${this.nome}`);
        this.componentes.forEach(componente => componente.exibirInfo());
    }

    buscar(nome: string): ComponenteRede | null {
        if (this.nome === nome) {
            return this;
        }

        for (let componente of this.componentes) {
            if (componente instanceof Grupo) {
                const resultado = componente.buscar(nome);
                if (resultado) {
                    return resultado;
                }
            } else if (componente instanceof Pessoa && componente['nome'] === nome) {
                return componente;
            }
        }

        return null; // Não encontrado
    }
}

// Criando a rede de contatos
const pessoa1 = new Pessoa("João", "joao@email.com");
const pessoa2 = new Pessoa("Maria", "maria@email.com");
const pessoa3 = new Pessoa("Carlos", "carlos@email.com");

// Criando grupos
const grupoFamilia = new Grupo("Família");
const grupoTrabalho = new Grupo("Colegas de Trabalho");

// Adicionando pessoas aos grupos
grupoFamilia.adicionar(pessoa1);
grupoFamilia.adicionar(pessoa2);
grupoTrabalho.adicionar(pessoa3);

// Criando subgrupos
const subgrupoPrimos = new Grupo("Primos");
subgrupoPrimos.adicionar(pessoa2);  // Maria é prima de João

grupoFamilia.adicionar(subgrupoPrimos);

// Exibindo informações
grupoFamilia.exibirInfo();
grupoTrabalho.exibirInfo();

// Buscando pessoas/grupos na rede
const resultadoBusca = grupoFamilia.buscar("Maria");
if (resultadoBusca) {
    console.log("Encontrado:", resultadoBusca);
} else {
    console.log("Pessoa/Grupo não encontrado.");
}
