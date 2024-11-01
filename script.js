let produtos = [
    { nome: "Vatapá", preco: 20, imagem: "https://example.com/imagem_vatapa.jpg" },
    { nome: "Tapioca", preco: 8, imagem: "https://example.com/imagem_tapioca.jpg" },
    { nome: "Baião de Dois", preco: 25, imagem: "https://example.com/imagem_baiao.jpg" },
    { nome: "Buchada de Bode", preco: 30, imagem: "https://example.com/imagem_buchada.jpg" },
    { nome: "Acarajé", preco: 12, imagem: "https://example.com/imagem_acaraje.jpg" }
];

function listarProdutos() {
    const produtosList = document.getElementById('produtos');
    produtosList.innerHTML = '';
    produtos.forEach((produto, index) => {
        const li = document.createElement('li');
        
       
        const img = document.createElement('img');
        img.src = produto.imagem;
        img.alt = produto.nome;
        img.classList.add("produto-imagem");
        
    
        const texto = document.createTextNode(`${produto.nome} - R$ ${produto.preco}`);
        

        const btnRemove = document.createElement('button');
        btnRemove.textContent = 'Remover';
        btnRemove.onclick = () => {
            produtos.splice(index, 1);
            listarProdutos();
        };
        
        li.appendChild(img);
        li.appendChild(texto);
        li.appendChild(btnRemove);
        produtosList.appendChild(li);
    });
}

if (document.getElementById('produtos')) {
    listarProdutos();
}
