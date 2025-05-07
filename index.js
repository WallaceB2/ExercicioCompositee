// Componente base para pessoas e grupos
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, email) {
        this.nome = nome;
        this.email = email;
    }
    Pessoa.prototype.exibirInfo = function () {
        console.log("Pessoa: " + this.nome + ", Email: " + this.email);
    };
    return Pessoa;
}());

var Grupo = /** @class */ (function () {
    function Grupo(nome) {
        this.nome = nome;
        this.componentes = [];
    }
    Grupo.prototype.adicionar = function (componente) {
        this.componentes.push(componente);
    };
    Grupo.prototype.remover = function (componente) {
        var index = this.componentes.indexOf(componente);
        if (index !== -1) {
            this.componentes.splice(index, 1);
        }
    };
    Grupo.prototype.exibirInfo = function () {
        console.log("Grupo: " + this.nome);
        this.componentes.forEach(function (componente) { return componente.exibirInfo(); });
    };
    Grupo.prototype.buscar = function (nome) {
        if (this.nome === nome) {
            return this;
        }
        for (var _i = 0, _a = this.componentes; _i < _a.length; _i++) {
            var componente = _a[_i];
            if (componente instanceof Grupo) {
                var resultado = componente.buscar(nome);
                if (resultado) {
                    return resultado;
                }
            }
            else if (componente instanceof Pessoa && componente['nome'] === nome) {
                return componente;
            }
        }
        return null; // Não encontrado
    };
    return Grupo;
}());

// Criando a rede de contatos
var pessoa1 = new Pessoa("João", "joao@email.com");
var pessoa2 = new Pessoa("Maria", "maria@email.com");
var pessoa3 = new Pessoa("Carlos", "carlos@email.com");

// Criando grupos
var grupoFamilia = new Grupo("Família");
var grupoTrabalho = new Grupo("Colegas de Trabalho");

// Adicionando pessoas aos grupos
grupoFamilia.adicionar(pessoa1);
grupoFamilia.adicionar(pessoa2);
grupoTrabalho.adicionar(pessoa3);

// Criando subgrupos
var subgrupoPrimos = new Grupo("Primos");
subgrupoPrimos.adicionar(pessoa2);  // Maria é prima de João

grupoFamilia.adicionar(subgrupoPrimos);

// Exibindo informações
grupoFamilia.exibirInfo();
grupoTrabalho.exibirInfo();

// Buscando pessoas/grupos na rede
var resultadoBusca = grupoFamilia.buscar("Maria");
if (resultadoBusca) {
    console.log("Encontrado:", resultadoBusca);
} else {
    console.log("Pessoa/Grupo não encontrado.");
}
