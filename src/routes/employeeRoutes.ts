import express, { Request, Response, Router } from 'express';
import Employee from '../models/Employee';

const router: Router = express.Router();

// GET all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
});

export default router;