export type Growth = { name?: string } & Components;

export type Components = {
  density: number;
  contamination: number;
  capital: number;
  growth?: Growth[];
};

export type ComponentsWithTime = {
  time: number;
} & Components;
