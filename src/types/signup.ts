// API

export type RequesteUser = {
  nickname: string;
  password: string;
  accountID: string;
  province: string;
  city: string;
};

// UI
export type IForm = {
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
