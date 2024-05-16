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

        /**
         * Ícone da despesa
         * <img src="./img/food.svg" alt="Ícone de tipo da despesa" />
         */
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        /**
         * Conteúdo da despesa
         * <div class="expense-info">
         *   <strong>Almoço</strong>
         *   <span>Alimentação</span>
         * </div>
         */
        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')

        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        expenseInfo.append(expenseName, expenseCategory)

        /**
         * Conteúdo do valor
         * <span class="expense-amount"><small>R$</small>1.420,57</span>
         */
        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')

        const small = document.createElement('small')
        small.textContent = 'R$'

        expenseAmount.append(small, newExpense.amount.replace('R$', '').trim())

        /**
         * Criando ação de remover
         * <img src="./img/remove.svg" alt="remover" class="remove-icon" />
         */
        const removeIcon = document.createElement('img')
        removeIcon.setAttribute('src', 'img/remove.svg')
        removeIcon.setAttribute('alt', 'Remover')
        removeIcon.classList.add('remove-icon')

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        expensesList.appendChild(expenseItem)
    } catch (error) {
        alert('Erro ao adicionar despesa!')
        console.log(error)
    }
}