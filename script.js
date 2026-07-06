let expenses = [];
let budget = 0;
let chart;

function setBudget() {
    budget = Number(document.getElementById("budget").value);
    updateSummary();
}

function addExpense() {

    const name = document.getElementById("expenseName").value.trim();
    const amount = Number(document.getElementById("expenseAmount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("expenseDate").value;

    if (name === "" || amount <= 0 || date === "") {
        alert("Please fill all fields.");
        return;
    }

    expenses.push({
        name,
        amount,
        category,
        date
    });

    clearInputs();
    displayExpenses();
    updateSummary();
    updateChart();
}

function displayExpenses() {

    const table = document.getElementById("expenseTable");

    table.innerHTML = "";

    expenses.forEach((expense, index) => {

        table.innerHTML += `
        <tr>

        <td>${expense.name}</td>

        <td>₹${expense.amount}</td>

        <td>${expense.category}</td>

        <td>${expense.date}</td>

        <td>

        <button class="editBtn"
        onclick="editExpense(${index})">
        Edit
        </button>

        <button class="deleteBtn"
        onclick="deleteExpense(${index})">
        Delete
        </button>

        </td>

        </tr>
        `;

    });

}

function deleteExpense(index) {

    expenses.splice(index, 1);

    displayExpenses();
    updateSummary();
    updateChart();

}

function editExpense(index) {

    const expense = expenses[index];

    document.getElementById("expenseName").value = expense.name;
    document.getElementById("expenseAmount").value = expense.amount;
    document.getElementById("category").value = expense.category;
    document.getElementById("expenseDate").value = expense.date;

    expenses.splice(index, 1);

    displayExpenses();
    updateSummary();
    updateChart();

}

function updateSummary() {

    let total = 0;

    expenses.forEach(expense => {

        total += expense.amount;

    });

    document.getElementById("monthlyTotal").innerHTML =
        "Monthly Expense : ₹" + total;

    document.getElementById("budgetLeft").innerHTML =
        "Budget Left : ₹" + (budget - total);

}

function updateChart() {

    const totals = {};

    expenses.forEach(expense => {

        if (!totals[expense.category]) {
            totals[expense.category] = 0;
        }

        totals[expense.category] += expense.amount;

    });

    const labels = Object.keys(totals);
    const data = Object.values(totals);

    if (chart) {

        chart.destroy();

    }

    const ctx = document.getElementById("expenseChart");

    chart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: labels,

            datasets: [{

                data: data

            }]

        }

    });

}

function clearInputs() {

    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
    document.getElementById("expenseDate").value = "";
    document.getElementById("category").selectedIndex = 0;

}
