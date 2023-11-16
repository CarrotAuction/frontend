export type IForm = {
  profile?: File | undefined;
  id: string;
  nick_name: string;
  password: string;
  password_check: string;
  area: string;
  city: string;
};

export type Location = {
  area: string;
  city: string;
};

export type SignShowTpye = {
  area: boolean;
  city: boolean;
};
