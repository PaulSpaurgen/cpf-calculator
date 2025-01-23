import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  citizenshipStatus: {
    type: String,
    enum: ['CITIZEN', 'PR_YEAR1', 'PR_YEAR2', 'PR_YEAR3'],
    required: true
  },
  basicSalary: { type: Number, required: true },
  allowances: { type: Number, default: 0 },
  joinDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Employee', employeeSchema); 