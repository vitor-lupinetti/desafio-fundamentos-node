import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import Transaction from '../models/Transaction';

const transactionRouter = Router();
const transactionsRepository = new TransactionsRepository();

// const transactionsRepository = new TransactionsRepository();

// eslint-disable-next-line consistent-return
transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    const transactionsReturn = {
      transactions,
      balance,
    };

    return response.json(transactionsReturn);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // TODO
    const { title, value, type } = request.body;
    const service = new CreateTransactionService(transactionsRepository);
    const transaction = service.execute({ title, value, type });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
