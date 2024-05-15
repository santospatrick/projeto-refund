const form = document.querySelector('form')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const amount = document.getElementById('amount');

// Seleciona os elementos da lista
const expensesList = document.querySelector('.expenses-list')

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

    addExpense(newExpense)
})

function addExpense(newExpense) {
    try {
        // Cria item da lista
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        // Criar o ícone
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        expenseItem.appendChild(expenseIcon)
        expensesList.appendChild(expenseItem)
    } catch (error) {
        alert('Erro ao adicionar despesa!')
        console.log(error)
    }
}