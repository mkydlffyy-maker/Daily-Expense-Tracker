
const budgetInput = document.getElementById("budget");
const saveBudgetButton = document.getElementById("saveBudget");

const totalBudget = document.getElementById("totalBudget");
const totalExpense = document.getElementById("totalExpense");
const remainingMoney = document.getElementById("remainingMoney");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const category = document.getElementById("category");
const amount = document.getElementById("amount");
const expenseList = document.getElementById("expenseList");

let budget = 0;
let expenses = [];

function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(number);
}

function updateSummary() {
    let total = 0;

    for (let expense of expenses) {
        total += expense.amount;
    }

    totalBudget.textContent = formatRupiah(budget);
    totalExpense.textContent = formatRupiah(total);
    remainingMoney.textContent = formatRupiah(budget - total);

    if (budget - total < 0) {
        remainingMoney.style.color = "red";
    } else {
        remainingMoney.style.color = "#222";
    }
}

function displayExpenses() {
    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML =
            '<li class="empty-message">Belum ada pengeluaran.</li>';
        return;
    }

    expenses.forEach(function(expense) {
        const li = document.createElement("li");
        li.className = "expense-item";

        const info = document.createElement("div");
        info.className = "expense-info";

        const name = document.createElement("strong");
        name.textContent = expense.name;

        const detail = document.createElement("p");
        detail.textContent =
            expense.category + " • " + formatRupiah(expense.amount);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {
            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            displayExpenses();
            updateSummary();
        });

        info.appendChild(name);
        info.appendChild(detail);

        li.appendChild(info);
        li.appendChild(deleteButton);

        expenseList.appendChild(li);
    });
}

saveBudgetButton.addEventListener("click", function() {
    const value = Number(budgetInput.value);

    if (budgetInput.value === "" || value < 0) {
        alert("Masukkan anggaran yang valid.");
        return;
    }

    budget = value;
    updateSummary();
});

expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = expenseName.value.trim();
    const selectedCategory = category.value;
    const expenseAmount = Number(amount.value);

    if (name === "" || selectedCategory === "" || expenseAmount <= 0) {
        alert("Lengkapi data pengeluaran dengan benar.");
        return;
    }

    const expense = {
        id: Date.now(),
        name: name,
        category: selectedCategory,
        amount: expenseAmount
    };

    expenses.push(expense);

    displayExpenses();
    updateSummary();

    expenseForm.reset();
});

updateSummary();
displayExpenses();
