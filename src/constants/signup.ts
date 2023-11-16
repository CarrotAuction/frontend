export const NickNameValidate = {
  required: '닉네임을 입력해주세요',
  minLength: {
    value: 2,
    message: '닉네임은 최소 2자 이상이어야 합니다',
  },
};

export const IdValidate = {
  required: '아이디를 입력해주세요',
  minLength: {
    value: 2,
    message: '아이디는 최소 2자 이상이어야 합니다',
  },
};

export const PasswordValidate = {
  required: '비밀번호를 입력해주세요',
  minLength: {
    value: 6,
    message: '비밀번호는 최소 6자 이상이어야 합니다',
  },
};

export const correctId = '사용 가능한 아이디입니다.';
export const correctNick = '사용 가능한 닉네임입니다.';
export const correctPassword = '사용 가능한 패스워드입니다.';
export const correctPasswordCheck = '비밀번호와 동일합니다';
