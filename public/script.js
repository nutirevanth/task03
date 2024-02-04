$(document).ready(() => {
    function fetchTransactions() {
        $.get('/api/transactions', (transactions) => {
            const transactionList = $('#transactionList');
            transactionList.empty();
            transactions.forEach((transaction) => {
                const transactionItem = `
                    <div>
                        <p>Type: ${transaction.type}</p>
                        <p>Description: ${transaction.description}</p>
                        <p>Amount: $${transaction.amount.toFixed(2)}</p>
                        <button onclick="editTransaction('${transaction._id}')">Edit</button>
                        <button onclick="deleteTransaction('${transaction._id}')">Delete</button>
                    </div>
                    <hr>`;
                transactionList.append(transactionItem);  });   });   }
    window.addTransaction = function () {
        const type = $('#type').val();
        const description = $('#description').val();
        const amount = $('#amount').val();
        $.post('/api/transactions', { type, description, amount }, () => {
            fetchTransactions();
            $('#type').val('income');
            $('#description').val('');
            $('#amount').val('');
        });         };
    window.editTransaction = function (id) {
        console.log('Edit transaction with ID:', id);   };
    window.deleteTransaction = function (id) {
        $.ajax({
            url: `/api/transactions/${id}`,
            type: 'DELETE',
            success: () => {
                fetchTransactions();
            },      });     };
    fetchTransactions();
});