import React, { useState, useRef } from 'react';
import { GiCancel } from 'react-icons/gi';
import useInput from '@/src/hooks/useInput';
import { Category } from '@/src/constants/search';
import { SelectValueType, ShowType } from '@/src/types/search';
import CategorySelect from '@/src/components/auctionPage/CategorySelect';
import InputBox from '@/src/components/postPage/InputBox/page';
import styles from './index.module.scss';

const PostProductInfo = () => {
  const [productName, changeProductName, resetProductName] = useInput();
  const [productPrice, changeProductPrice, resetProductPrice] = useInput();
  const [productDetail, setProductDetail] = useState('');

  const handleInputProductDetail = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProductDetail((pre) => event.target.value);
  };
  const resetProductDetail = () => {
    setProductDetail((pre) => '');
  };

  const [selectValue, setSelectValue] = useState<SelectValueType>({
    area: '',
    city: '',
    category: '',
  });

  const [show, setShow] = useState<ShowType>({
    areaShow: false,
    cityShow: false,
    categoryShow: false,
  });

  return (
    <div className={styles.postProductInfo}>
      <InputBox
        tag="input"
        changeFunction={changeProductName}
        value={productName}
        name="productName"
        placeholder="상품의 이름을 입력해 주세요."
        resetFunction={resetProductName}
      />
      <InputBox
        tag="input"
        changeFunction={changeProductPrice}
        value={productPrice}
        name="productPrice"
        placeholder="희망 가격을 입력해 주세요."
        resetFunction={resetProductPrice}
      />
      <InputBox
        tag="textarea"
        changeFunction={handleInputProductDetail}
        value={productDetail}
        name="productDetail"
        placeholder="상품의 특징을 입력해 주세요."
        resetFunction={resetProductDetail}
      />
      <CategorySelect
        Category={Category}
        setSelectValue={setSelectValue}
        selectValue={selectValue}
        setShow={setShow}
        show={show}
      />
      <button type="button" className={styles.submitButton}>
        완료
      </button>
    </div>
  );
};

export default PostProductInfo;
