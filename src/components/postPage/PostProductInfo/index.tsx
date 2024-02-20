'use client';

import React, { useState } from 'react';
import useInput from '@/src/hooks/useInput';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import carrotImage from '@/src/assets/post/carrot.png';
import { getCookie } from 'cookies-next';
import { Category } from '@/src/constants/search';
import { SelectValueType, ShowType } from '@/src/types/search';
import CategorySelect from '@/src/components/auctionPage/CategorySelect';
import { PostAuction } from '@/src/remote/apis/Post';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import styles from './index.module.scss';
import InputBox from '../InputBox';

type Props = {
  file: File | null;
};

const PostProductInfo = ({ file }: Props) => {
  const token = getCookie('token');
  const router = useRouter();
  const [productName, changeProductName, resetProductName] = useInput();
  const [productPrice, changeProductPrice, resetProductPrice] = useInput();
  const [productDetail, setProductDetail] = useState('');

  const handleInputProductDetail = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setProductDetail(() => event.target.value);
  };
  const resetProductDetail = () => {
    setProductDetail(() => '');
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

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => PostAuction(data),
    onSuccess: (result) => {
      Swal.fire({
        icon: 'success',
        title: '글 쓰기에 성공하셨습니다 !',
        text: '경매글 상세페이지로 이동합니다.',
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          Swal.fire({
            icon: 'error',
            title: `${error.response.data.message}`,
          });
        }
      }
    },
  });

  const onSubmit = async () => {
    const formData = new FormData();
    if (
      file === null ||
      productName === '' ||
      productDetail === '' ||
      productPrice === '' ||
      selectValue.category === ''
    ) {
      Swal.fire({
        icon: 'warning',
        title: '경매 상품 정보를 모두 입력해 주세요.',
      });
      return;
    }

    formData.append('image', file);
    formData.append('creatorId', String(token));
    formData.append('stuffName', productName);
    formData.append('stuffContent', productDetail);
    formData.append('stuffPrice', String(productPrice));
    formData.append('stuffCategory', selectValue.category);
    mutate(formData);
  };

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
      <button type="button" onClick={onSubmit} className={styles.submitButton}>
        완료
      </button>
    </div>
  );
};

export default PostProductInfo;
