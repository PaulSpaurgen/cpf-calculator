import { CPF_RATES_2025 } from '../utils/constants';

export interface CPFCalculationResult {
  employeeContribution: number;
  employerContribution: number;
  totalContribution: number;
  allocation: {
    ordinaryAccount: number;
    specialAccount: number;
    medisaveAccount: number;
  };
  netSalary: number;
}

export class CPFCalculator {
  /**
   * Calculate CPF contributions for an employee
   */
  calculateCPF(params: {
    monthlyWage: number;
    age: number;
    citizenshipStatus: string;
    additionalWages?: number;
    yearToDateOrdinaryWages?: number;
    yearToDateAdditionalWages?: number;
  }): CPFCalculationResult {
    const {
      monthlyWage,
      age,
      citizenshipStatus,
    } = params;

    // Debug log 1
    console.log('Input params:', { monthlyWage, age, citizenshipStatus });

    // Get applicable rates
    const rates = this.getApplicableRates(age, citizenshipStatus);
    // Debug log 2
    console.log('Applicable rates:', rates);

    // Calculate ordinary wages contribution
    const ordinaryWagesContribution = this.calculateOrdinaryWagesContribution(
      monthlyWage,
      rates
    );
    // Debug log 3
    console.log('Ordinary wages contribution:', ordinaryWagesContribution);

    const totalEmployeeContribution = ordinaryWagesContribution.employeeContribution;
    const totalEmployerContribution = ordinaryWagesContribution.employerContribution;
    const totalContribution = totalEmployeeContribution + totalEmployerContribution;

    // Debug log 4
    console.log('Total contributions:', {
      employee: totalEmployeeContribution,
      employer: totalEmployerContribution,
      total: totalContribution
    });

    // Calculate net salary
    const netSalary = monthlyWage - totalEmployeeContribution;

    return {
      employeeContribution: Number(totalEmployeeContribution.toFixed(2)),
      employerContribution: Number(totalEmployerContribution.toFixed(2)),
      totalContribution: Number(totalContribution.toFixed(2)),
      allocation: {
        ordinaryAccount: 0,
        specialAccount: 0,
        medisaveAccount: 0
      },
      netSalary: Number(netSalary.toFixed(2))
    };
  }

  private getApplicableRates(age: number, citizenshipStatus: string) {
    const ageGroup = (age <= 55 ? 'BELOW_55' : 
                     age <= 60 ? 'ABOVE_55_60' :
                     age <= 65 ? 'ABOVE_60_65' :
                     age <= 70 ? 'ABOVE_65_70' : 
                     'ABOVE_70');

    // Use type assertion to bypass type checking
    const rates = (CPF_RATES_2025.AGE_GROUPS as any)[ageGroup][citizenshipStatus];
    
    if (!rates) {
        throw new Error(`Invalid rates for age group ${ageGroup} and status ${citizenshipStatus}`);
    }
    return rates;
  }

  private calculateOrdinaryWagesContribution(
    monthlyWage: number,
    rates: { EMPLOYEE: number; EMPLOYER: number }
  ) {
    const { MIN_WAGE, GRADUATED_MIN, GRADUATED_MAX, MAX_ORDINARY_WAGE } = 
      CPF_RATES_2025.WAGE_BRACKETS;

    // Handle wages below minimum threshold
    if (monthlyWage < MIN_WAGE) {
      return { employeeContribution: 0, employerContribution: 0 };
    }

    // Handle graduated rates for wages between $500 and $750
    if (monthlyWage >= GRADUATED_MIN && monthlyWage <= GRADUATED_MAX) {
      return this.calculateGraduatedRates(monthlyWage);
    }

    // Cap wage at maximum ordinary wage ceiling
    const cappedWage = Math.min(monthlyWage, MAX_ORDINARY_WAGE);

    return {
      employeeContribution: cappedWage * rates.EMPLOYEE,
      employerContribution: cappedWage * rates.EMPLOYER
    };
  }

  private calculateGraduatedRates(monthlyWage: number) {
    // Implementation of graduated rates table
    // This would contain the specific graduated rates logic
    // Returns { employeeContribution, employerContribution }
    return { employeeContribution: 0, employerContribution: 0 }; // Placeholder
  }

  private calculateAdditionalWagesContribution(params: {
    additionalWages: number;
    yearToDateOrdinaryWages: number;
    yearToDateAdditionalWages: number;
    rates: { EMPLOYEE: number; EMPLOYER: number };
  }) {
    const { 
      additionalWages,
      yearToDateOrdinaryWages,
      yearToDateAdditionalWages,
      rates 
    } = params;

    const { ANNUAL_CEILING } = CPF_RATES_2025.WAGE_BRACKETS;

    // Calculate remaining ceiling
    const totalWagesYTD = yearToDateOrdinaryWages + yearToDateAdditionalWages;
    const remainingCeiling = Math.max(0, ANNUAL_CEILING - totalWagesYTD);

    // Cap additional wages at remaining ceiling
    const cappedAdditionalWages = Math.min(additionalWages, remainingCeiling);

    return {
      employeeContribution: cappedAdditionalWages * rates.EMPLOYEE,
      employerContribution: cappedAdditionalWages * rates.EMPLOYER
    };
  }

  private calculateAccountAllocation(
    totalContribution: number,
    age: number,
    citizenshipStatus: string
  ) {
    const rates = this.getApplicableRates(age, citizenshipStatus);
    if (!rates.ALLOCATION) {
        return {
            ordinary: 0,
            special: 0,
            medisave: 0
        };
    }
    
    return {
        ordinary: totalContribution * rates.ALLOCATION.ORDINARY,
        special: totalContribution * rates.ALLOCATION.SPECIAL,
        medisave: totalContribution * rates.ALLOCATION.MEDISAVE
    };
  }
} 