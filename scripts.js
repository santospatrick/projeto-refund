const amount = document.getElementById('amount');

amount.addEventListener('input', function() {
    let value = this.value.replace(/\D/g, '');
    value = Number(value) / 100
    this.value = formatCurrencyBRL(value)
})

function formatCurrencyBRL(value) {
    value = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return value
}