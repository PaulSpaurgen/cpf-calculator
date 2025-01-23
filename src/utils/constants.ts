export const CPF_RATES_2025 = {
  WAGE_BRACKETS: {
    MIN_WAGE: 50,
    GRADUATED_MIN: 500,
    GRADUATED_MAX: 750,
    MAX_ORDINARY_WAGE: 7400,  // From Jan 2025
    ANNUAL_CEILING: 102000
  },

  AGE_GROUPS: {
    BELOW_55: {
      CITIZEN: {
        EMPLOYEE: 0.20,
        EMPLOYER: 0.17,
        ALLOCATION: {
          ORDINARY: 0.6217,
          SPECIAL: 0.1621,
          MEDISAVE: 0.2162
        }
      },
      PR_YEAR3: {
        EMPLOYEE: 0.20,
        EMPLOYER: 0.17
      },
      PR_YEAR2: {
        EMPLOYEE: 0.15,
        EMPLOYER: 0.15
      },
      PR_YEAR1: {
        EMPLOYEE: 0.05,
        EMPLOYER: 0.04
      }
    },
    ABOVE_55_60: {
      CITIZEN: {
        EMPLOYEE: 0.17,
        EMPLOYER: 0.155,
        ALLOCATION: {
          ORDINARY: 0.4431,
          SPECIAL: 0.3354,
          MEDISAVE: 0.2215
        }
      }
    },
    ABOVE_60_65: {
      CITIZEN: {
        EMPLOYEE: 0.115,
        EMPLOYER: 0.12,
        ALLOCATION: {
          ORDINARY: 0.2153,
          SPECIAL: 0.4744,
          MEDISAVE: 0.3103
        }
      }
    },
    ABOVE_65_70: {
      CITIZEN: {
        EMPLOYEE: 0.075,
        EMPLOYER: 0.09,
        ALLOCATION: {
          ORDINARY: 0.1,
          SPECIAL: 0.55,
          MEDISAVE: 0.35
        }
      }
    },
    ABOVE_70: {
      CITIZEN: {
        EMPLOYEE: 0.05,
        EMPLOYER: 0.075,
        ALLOCATION: {
          ORDINARY: 0.08,
          SPECIAL: 0.52,
          MEDISAVE: 0.40
        }
      }
    }
  }
};

export const WAGE_CEILING = {
  ORDINARY_WAGES: 6000, // Monthly ceiling
  ADDITIONAL_WAGES: 102000 // Yearly ceiling
}; 