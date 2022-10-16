const fs = require("fs");

// read
let data = fs.readFileSync('./data.json', 'utf-8');
data = JSON.parse(data);

class Bank {
    constructor() {
        this.balance = data["balance"];
    }
    deposit(amount, note) {
        let transaction_history = {"status": "deposit", "amount": amount, "note": note, "transcation": true};
        data['transaction_history'].push(transaction_history);
        data['balance'] += amount;
        this.balance = data["balance"]
        this.updateData()
    }
    withdraw(amount, note) {
        let transcation_status;
        if (amount > this.balance) {
            transcation_status = false;
        } else {
            data['balance'] -= amount;
            this.balance = data["balance"]
            transcation_status = true;
        }

        let transaction_history = {"status": "withdraw", "amount": amount, "note": note, "transcation": transcation_status};
        data['transaction_history'].push(transaction_history);
        this.updateData()
    }
    updateData() {
        fs.writeFileSync("./data.json", JSON.stringify(data))
    }
}

const bank = new Bank();
// bank.deposit(100, "earn from upwork")
// bank.withdraw(200, "eat burger")
// bank.withdraw(500000, "buy cloths")
// bank.deposit(1000000, "add from easypaisa")
// bank.withdraw(500000, "buy cloths")
// console.table(data["transaction_history"])
bank.deposit(100, "invest in binance")
console.log(data["balance"])