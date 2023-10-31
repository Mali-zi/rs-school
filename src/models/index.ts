export interface DefaultProps {}

export interface IBottomSectionProps {
  searchQuery: string;
}

export interface IPlanet {
  climate: string;
  created: Date;
  diameter: string;
  edited: Date;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface IBottomSectionState {
  searchQuery: string;
  planets: IPlanet[] | null;
  isLoading: boolean;
  error: null | Error;
}

export interface IPlanetListProps {
  planets: IPlanet[];
}

export interface ITopSectionState {
  value: string;
  searchQuery: string;
  isValid: boolean;
}

export interface IPlanetProps {
  planet: IPlanet;
}
