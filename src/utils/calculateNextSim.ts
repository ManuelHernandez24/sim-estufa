import { Components, ComponentsWithTime, Growth } from '../models';
import { capitalRules, contaminationRules, densityRules, growth } from './values';

const calculateNextSim = (components: ComponentsWithTime) => {
  const newComponents: Components = {
    density: components.density + growth.density * Math.random(),
    contamination: components.contamination + growth.contamination * Math.random(),
    capital: components.capital + growth.capital * Math.random()
  };

  let newComponentsWithGrowth: Components = {
    ...newComponents
  };

  const densityGrowth: Growth = {
    name: 'Densidad',
    density: 0.0,
    contamination: newComponents.density * densityRules.contamination,
    capital: newComponents.density * densityRules.capital
  };

  newComponentsWithGrowth.density =
    newComponents.density + densityGrowth.contamination + densityGrowth.capital;

  const contaminationGrowth: Growth = {
    name: 'Contaminación',
    density: newComponents.contamination * contaminationRules.density,
    contamination: 0.0,
    capital: newComponents.contamination * contaminationRules.capital
  };

  newComponentsWithGrowth.contamination =
    newComponents.contamination + contaminationGrowth.density + contaminationGrowth.capital;

  const capitalGrowth: Growth = {
    name: 'Capital',
    density: newComponents.capital * capitalRules.density,
    contamination: newComponents.capital * capitalRules.contamination,
    capital: 0.0
  };

  newComponentsWithGrowth.capital =
    newComponents.capital + capitalGrowth.density + capitalGrowth.contamination;

  newComponentsWithGrowth = {
    ...newComponentsWithGrowth,
    growth: [densityGrowth, contaminationGrowth, capitalGrowth]
  };

  return { ...newComponentsWithGrowth, time: components.time + 1 };
};

export default calculateNextSim;
