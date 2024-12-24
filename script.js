// Carrinho de Compras
let cart = [];
let totalPrice = 0;

function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    totalPrice += itemPrice;

    // Atualizando o carrinho
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Limpar itens anteriores
    cartItems.innerHTML = '';

    // Adicionar novos itens
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    // Atualizar preço total
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

// Função para formatar o valor em moeda
function formatCurrency(value) {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

// Verifique se os itens no carrinho têm a propriedade `quantity`
const orderDetails = cart.map(item => {
    if (item.quantity !== undefined) {
        return `*${item.name}* - ${formatCurrency(item.price)} x ${item.quantity}`;
    } else {
        return `*${item.name}* - ${formatCurrency(item.price)}`;  // Caso a quantidade não esteja definida
    }
}).join('\n');  // Usando \n diretamente para que a quebra de linha fique correta.

// Calcular o preço total e formatar
const totalFormatted = formatCurrency(totalPrice);

// Criar a mensagem final com uma saudação e o total
const message = `*Olá, gostaria de fazer um pedido!*\n\n` + 
                `${orderDetails}\n\n` + // Quebra de linha mais clara agora
                `*Total*: ${totalFormatted}\n\n` +
                `Aguardo a confirmação do pedido.`;

// Enviar para o WhatsApp com codificação correta
window.location.href = `https://wa.me/55987654321?text=${encodeURIComponent(message)}`;
}