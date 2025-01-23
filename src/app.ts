import express from 'express';
import mongoose from 'mongoose';
import employeeRouter from './routes/employeeRoutes';
import payrollRoutes from './routes/payrollRoutes';

import { CPFCalculator } from './services/CPFCalculator';

const app = express();
const cpfCalculator = new CPFCalculator();

const result = cpfCalculator.calculateCPF({
  monthlyWage: 5000,
  age: 35,
  citizenshipStatus: "CITIZEN",
  additionalWages: 0,
  yearToDateOrdinaryWages: 0,
  yearToDateAdditionalWages: 0
});

console.log("Result: ", result);
app.use(express.json());

// Routes
app.use('/api/employees', employeeRouter);
app.use('/api/payroll', payrollRoutes);

// MongoDB connection
// mongoose.connect('your_mongodb_atlas_uri')
//   .then(() => console.log('Connected to MongoDB Atlas'))
//   .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 