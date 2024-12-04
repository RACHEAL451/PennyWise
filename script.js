// script.js

// Selectors
const expenseList = document.getElementById('expense-list');
const totalExpenses = document.getElementById('total-expenses');
const addExpenseBtn = document.getElementById('add-expense-btn');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize Expenses
let expenses = [];

// Add Expense
addExpenseBtn.addEventListener('click', () => {
    const description = document.getElementById('expense-description').value.trim();
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    if (description && amount && category) {
        expenses.push({ description, amount, category });
        updateUI();
        clearForm();
    }
});

// Update UI
function updateUI() {
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.description} - ₦${expense.amount.toFixed(2)} (${expense.category})
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        expenseList.appendChild(li);
    });

    totalExpenses.textContent = `₦${total.toFixed(2)}`;
    attachDeleteListeners();
}

// Delete Expense
function attachDeleteListeners() {
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            const index = e.target.dataset.index;
            expenses.splice(index, 1);
            updateUI();
        });
    });
}

// Filter Expenses
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        const filteredExpenses = filter === 'all'
            ? expenses
            : expenses.filter(exp => exp.category === filter);

        renderFilteredExpenses(filteredExpenses);
    });
});

function renderFilteredExpenses(filtered) {
    expenseList.innerHTML = '';
    filtered.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.description} - ₦${expense.amount.toFixed(2)} (${expense.category})`;
        expenseList.appendChild(li);
    });
}

// Clear Form
function clearForm() {
    document.getElementById('expense-description').value = '';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-category').value = 'food';
}

// Toggle Dark Mode
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});
