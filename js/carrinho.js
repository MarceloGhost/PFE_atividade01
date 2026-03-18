/* novas variaveis para dar funcionalidade ao botão e carrinho */
let contador = 0;
const cartElement = document.querySelector('.icon');
const itensLista = document.getElementById('itens-lista');
const totalPreco = document.getElementById('total-preco');
const limparBtn = document.getElementById('limpar-carrinho');


/* adicionando um evento ao contador do carrinho */
let carrinho = []; 
document.addEventListener('DOMContentLoaded', function() {
    const botoes = document.querySelectorAll('.btn');
    
    botoes.forEach(function(botao, index) {
        botao.addEventListener('click', function() {
            const nome = this.closest('.card').querySelector('h2').textContent;
            const preco = parseFloat(this.closest('.card').querySelector('p').textContent.replace('Preço: ', ''));
            
            carrinho.push({id: index, nome, preco, quantidade: 1});/* Adicionando um array que guarda as informações dos elementos que serão adicionados no carrinho */
            contador++;
            
            atualizarContador();
            atualizarResumo();
            
            
            this.textContent = 'Adicionado!';
            setTimeout(() => this.textContent = 'Adicionar ao Carrinho', 1000);
        });
    });
    
    /* adicionando evento para o botão limpar do carrinho */
    limparBtn.addEventListener('click', function() {
        carrinho = [];
        contador = 0;
        atualizarContador();
        atualizarResumo();
    });
});

function atualizarContador() {
    cartElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"><path d="M0 1.5A.5.5 0 0 1 .5 1H2a.
    5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2
     2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg> Carrinho: ${contador}`;
     alert('Produto adicionado ao carrinho!');
}

function atualizarResumo() {
    if (carrinho.length === 0) {
        itensLista.innerHTML = '<p>Carrinho vazio</p>';
        totalPreco.textContent = 'R$ 0,00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;
        html += `
            <div class="item-carrinho">
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)} x ${item.quantidade} = R$ ${subtotal.toFixed(2)}</span>
            </div>
        `;
    });
    
    itensLista.innerHTML = html;
    totalPreco.textContent = `R$ ${total.toFixed(2)}`;
}

