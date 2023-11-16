export type SelectOption = {
  label: string;
  value: string;
  city: CityType[];
};

export type CityType = {
  label: string;
  value: string;
};

export type CategoryType = {
  label: string;
  value: string;
};

export type SelectValueType = {
  area: string;
  city: string;
  category: string;
};

export type ShowType = {
  areaShow: boolean;
  cityShow: boolean;
  categoryShow: boolean;
};
