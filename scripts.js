const form = document.querySelector('form')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const amount = document.getElementById('amount');
const expensesQuantity = document.querySelector('aside header p span')
const expensesTotal = document.querySelector('aside header h2')

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

        updateTotals()
    } catch (error) {
        alert('Erro ao adicionar despesa!')
        console.log(error)
    }
}

function updateTotals() {
    try {
        const items = expensesList.children
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`
        
        let total = 0;
        
        for (let index = 0; index < items.length; index++) {
            const element = items[index].querySelector('.expense-amount')

            let value = element.textContent.replace(/[^\d,]/g, '').replace(',', '.')
            value = parseFloat(value)
            
            if (isNaN(value)) {
                return alert('Erro ao calcular o total.')
            }

            total += Number(value)
        }

        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        total = formatCurrencyBRL(total).toUpperCase().replace('R$', '').trim()

        expensesTotal.innerHTML = ''
        expensesTotal.append(symbolBRL, total)
    } catch (error) {
        alert('Não foi possível atualizar os totais.')
        console.log("🚀 ~ updateTotals ~ error:", error)
    }
}

expensesList.addEventListener('click', function(event) {
    const target = event.target

    if (target.classList.contains('remove-icon')) {
        target.closest('.expense').remove()
    }

    updateTotals()
})