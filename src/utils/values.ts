import { Components } from '../models';

export const densityRules: Components = {
  density: 0.0,
  contamination: -0.0032,
  capital: 0.007
};

export const contaminationRules: Components = {
  density: 0.0076,
  contamination: 0.0,
  capital: 0.012
};

export const capitalRules: Components = {
  density: 0.0,
  contamination: -0.045,
  capital: 0.08
};

export const growth: Components = {
  density: 1,
  contamination: 1,
  capital: 5000000
};
