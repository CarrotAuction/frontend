// 계산
export const selectOption = (text: string, title: string) => {
  let result;
  switch (title) {
    case '대표 지역선택':
      if (text === '대표 지역선택') {
        text = '';
      }
      result = ['area', text];
      break;
    case '시/구/군':
      if (text === '시/구/군') {
        text = '';
      }
      result = ['city', text];
      break;
    default:
      if (text === '카테고리') {
        text = '';
      }
      result = ['category', text];
      break;
  }

  return { location: result[0], text: result[1] };
};
