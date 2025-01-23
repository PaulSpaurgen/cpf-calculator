import express from 'express';
import { Router } from 'express';
import { CPFCalculator } from '../services/CPFCalculator';

const payrollRouter: Router = express.Router();
const cpfCalculator = new CPFCalculator();

// Calculate CPF for single employee
payrollRouter.post('/calculate-cpf', async (req, res) => {
  console.log('Calculating CPF...');
  try {
    const {
      monthlyWage,
      age,
      citizenshipStatus,
      additionalWages,
      yearToDateOrdinaryWages,
      yearToDateAdditionalWages
    } = req.body;

    console.log('Calculating CPF...', req.body);

    const result = cpfCalculator.calculateCPF({
      monthlyWage,
      age, 
      citizenshipStatus,
      additionalWages,
      yearToDateOrdinaryWages,
      yearToDateAdditionalWages
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating CPF', error });
  }
});

// Calculate CPF for multiple employees
payrollRouter.post('/calculate-cpf-bulk', async (req: any, res: any) => {
  console.log('Calculating CPF for multiple employees...');
  try {
    const employees = req.body;

    if (!Array.isArray(employees)) {
      return res.status(400).json({ message: 'Request body must be an array of employees' });
    }

    const results = employees.map(employee => {
      const {
        monthlyWage,
        age,
        citizenshipStatus,
        additionalWages,
        yearToDateOrdinaryWages,
        yearToDateAdditionalWages
      } = employee;

      return cpfCalculator.calculateCPF({
        monthlyWage,
        age,
        citizenshipStatus,
        additionalWages,
        yearToDateOrdinaryWages,
        yearToDateAdditionalWages
      });
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error calculating bulk CPF', error });
  }
});



export default payrollRouter;