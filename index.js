#!/usr/bin/env node
import inquirer from "inquirer";
let accountBalance = 5000; // Initial account balance
const userId = 'user';
const pin = '1234';
async function main() {
    console.log('Welcome to the ATM!');
    const userInput = await inquirer.prompt([
        {
            name: 'userId',
            message: 'Enter your user ID:',
            type: 'input'
        },
        {
            name: 'pin',
            message: 'Enter your PIN:',
            type: 'password',
            mask: '*' // Mask PIN input
        }
    ]);
    if (userInput.userId === userId && userInput.pin === pin) {
        console.log('Authentication successful!');
        displayMenu();
    }
    else {
        console.log('Authentication failed. Invalid user ID or PIN.');
    }
}
async function displayMenu() {
    while (true) {
        const choice = await inquirer.prompt({
            name: 'action',
            message: 'Choose an action:',
            type: 'list',
            choices: ['Check Balance', 'Deposit', 'Withdraw', 'Exit']
        });
        switch (choice.action) {
            case 'Check Balance':
                console.log(`Your account balance is: $${accountBalance}`);
                break;
            case 'Deposit':
                const depositAmount = await inquirer.prompt({
                    name: 'amount',
                    message: 'Enter the amount to deposit:',
                    type: 'number',
                    validate: input => input > 0 || 'Please enter a valid amount'
                });
                accountBalance += depositAmount.amount;
                console.log(`Deposit successful! Your new balance is: $${accountBalance}`);
                break;
            case 'Withdraw':
                const withdrawAmount = await inquirer.prompt({
                    name: 'amount',
                    message: 'Enter the amount to withdraw:',
                    type: 'number',
                    validate: input => input > 0 || 'Please enter a valid amount'
                });
                if (withdrawAmount.amount > accountBalance) {
                    console.log('Insufficient funds. Withdrawal failed.');
                }
                else {
                    accountBalance -= withdrawAmount.amount;
                    console.log(`Withdrawal successful! Your new balance is: $${accountBalance}`);
                }
                break;
            case 'Exit':
                console.log('Thank you for using the ATM. Goodbye!');
                return;
            default:
                console.log('Invalid choice. Please try again.');
        }
    }
}
main();
