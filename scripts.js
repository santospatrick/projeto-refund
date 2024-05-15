const form = document.querySelector('form')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
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

form.addEventListener('submit', function(event) {
    event.preventDefault()
    
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    console.log("🚀 ~ form.addEventListener ~ newExpense:", newExpense)
})