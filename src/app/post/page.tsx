'use client';

import React, { useState, useRef } from 'react';
import Image, { StaticImageData } from 'next/image';
import blankImage from '@/src/assets/post/blank.png';
import { GiCancel } from 'react-icons/gi';
import useInput from '@/src/hooks/useInput';
import { Category } from '@/src/constants/search';
import { SelectValueType, ShowType } from '@/src/types/search';
import CategorySelect from '@/src/components/auctionPage/CategorySelect';
import styles from './index.module.scss';

const Post = () => {
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

  const [image, setImage] = useState(blankImage);
  const fileInput: React.MutableRefObject<null> = useRef(null);
  const handleImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      if (reader.readyState === 2) {
        // 파일 onLoad가 성공하면 2, 진행 중은 1, 실패는 0 반환
        setImage(event.target.result);
      }
    };
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
    <main className={styles.postPage}>
      <h1 className={styles.title}>글 쓰기</h1>
      <div className={styles.postContent}>
        <div className={styles.postImage}>
          <div className={styles.uploadProductImage}>
            <Image src={image} fill alt="프로필 이미지" />
            <input
              type="file"
              name="image_URL"
              id="input-file"
              accept="image/*"
              ref={fileInput}
              onChange={handleImage}
            />
          </div>
          <p>
            <label htmlFor="input-file">이미지 업로드</label>
          </p>
        </div>
        <span />
        <div className={styles.postProductInfo}>
          <div className={styles.inputBox}>
            <input
              onChange={changeProductName}
              value={productName}
              name="productName"
              type="text"
              placeholder="상품의 이름을 입력해 주세요."
            />
            {productName && (
              <GiCancel
                data-testid="id-icon"
                onClick={resetProductName}
                className={`${styles.icon} ${styles.productNameResetIcon}`}
              />
            )}
          </div>
          <div className={styles.inputBox}>
            <input
              onChange={changeProductPrice}
              value={productPrice}
              name="productPrice"
              type="text"
              placeholder="희망 가격을 입력해 주세요."
            />
            {productPrice && (
              <GiCancel
                data-testid="id-icon"
                onClick={resetProductPrice}
                className={`${styles.icon} ${styles.productPriceResetIcon}`}
              />
            )}
          </div>
          <div className={styles.inputBox}>
            <textarea
              className={styles.detailTextarea}
              rows={10}
              value={productDetail}
              name="productDetail"
              onChange={handleInputProductDetail}
              placeholder="상품의 특징을 입력해 주세요."
            />
            {productDetail && (
              <GiCancel
                data-testid="id-icon"
                onClick={resetProductDetail}
                className={`${styles.icon} ${styles.productDetailResetIcon}`}
              />
            )}
          </div>
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
      </div>
    </main>
  );
};

export default Post;
