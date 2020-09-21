const { formatCurrency } = require('../helpers/format-helper');
const AccountSchema = require('../models/account-model');

class AccountController {

    static async createAccount(req, res) {
        const { name, balance } = req.body;

        if (!name) {
            return res.status(400).send({
                message: "É necessário informar um nome"
            });
        }

        if (!balance || !parseFloat(balance)) {
            return res.status(400).send({
                message: "É necessário informar o valor da conta"
            });
        }

        const newAccount = new AccountSchema();
        newAccount.name = name;
        newAccount.balance = balance;
        await newAccount.save();

        return res.status(201).send({
            message:"Conta criada com sucesso!",
            data: newAccount.toJSON()
        });
    }

    static async registerDeposit(req, res) {
        const { balance } = req.body;
        const { id } = req.params;

        if (!balance || !parseFloat(balance)) {
            return res.status(400).send({
                message: "É necessário informar o valor da conta"
            });
        }

        if(!id) {
            return res.status(400).send({
                message: "É necessário informar o id da conta"
            });
        }

        let account = await AccountSchema.findById(id, (error, result) => {
            if (error) {
                return res.status(500).send({
                    message: "Ocorreu um erro ao realizar esta operação"
                })
            }

            if (!result) {
                return res.status(400).send({
                    message: "A conta informada não existe"
                })
            }
        });

        account.balance += balance;

        await account.save((error) => {
            if (error) {
                return res.status(400).send({
                    message: "Ocorreu um erro ao salvar a operação"
                })
            }
        });
        
        return res.status(200).send({
            message: `Depósito de ${formatCurrency(balance)} para ${account.name} foi realizado com sucesso!`,
            accountBalance: account.balance
        });
    }

    static async registerWithdraw(req, res) {
        const { balance } = req.body;
        const { id } = req.params;

        if (!balance || !parseFloat(balance)) {
            return res.status(400).send({
                message: "É necessário informar o valor da conta"
            });
        }

        if(!id) {
            return res.status(400).send({
                message: "É necessário informar o id da conta"
            });
        }

        let account = await AccountSchema.findById(id, (error, result) => {
            if (error) {
                return res.status(500).send({
                    message: "Ocorreu um erro ao realizar esta operação"
                })
            }

            if (!result) {
                return res.status(400).send({
                    message: "A conta informada não existe"
                })
            }
        });

        account.balance -= balance;
        await account.save((error) => {
            if (error) {
                return res.status(400).send({
                    message: "Ocorreu um erro ao salvar a operação"
                })
            }
        });
        
        return res.status(200).send({
            message: `Seu saque de ${formatCurrency(balance)} foi realizado com sucesso!`,
            accountBalance: account.balance
        });
    }

    static async checkBalance(req, res) {
        const { id } = req.params;

        if(!id) {
            return res.status(400).send({
                message: "É necessário informar o id da conta"
            });
        }

        let account = await AccountSchema.findById(id, (error, result) => {
            if (error) {
                return res.status(500).send({
                    message: "Ocorreu um erro ao realizar esta operação"
                })
            }

            if (!result) {
                return res.status(400).send({
                    message: "A conta informada não existe"
                })
            }
        });

        return res.status(200).send({
            message: `Seu seu saldo é de ${formatCurrency(account.balance)}`,
            accountBalance: account.balance
        });
    }

    static async deleteAccount(req, res) {
        const { id } = req.params;

        if(!id) {
            return res.status(400).send({
                message: "É necessário informar o id da conta"
            });
        }

        await AccountSchema.findByIdAndDelete(id, (error, result) => {
            if (error) {
                return res.status(500).send({
                    message: "Ocorreu um erro ao realizar esta operação"
                })
            }

            if (!result) {
                return res.status(400).send({
                    message: "A conta informada não existe"
                })
            }
        });

        return res.status(200).send({
            message: `A conta foi removida com sucesso`
        });
    }
}

module.exports = AccountController;