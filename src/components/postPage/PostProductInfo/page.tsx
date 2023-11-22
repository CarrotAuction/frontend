import React, { useState, useRef } from 'react';
import { GiCancel } from 'react-icons/gi';
import useInput from '@/src/hooks/useInput';
import { getCookie } from 'cookies-next';
import { Category } from '@/src/constants/search';
import { SelectValueType, ShowType } from '@/src/types/search';
import CategorySelect from '@/src/components/auctionPage/CategorySelect';
import InputBox from '@/src/components/postPage/InputBox/page';
import { useRouter } from 'next/navigation';
import { Post } from '@/src/types/post';
import { PostAuction } from '@/src/apis/Post';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import styles from './index.module.scss';

const PostProductInfo = () => {
  const router = useRouter();
  const token = getCookie('token');
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

  const { mutate } = useMutation({
    mutationFn: (data: Post) => PostAuction(data),
    onSuccess: (result) => {
      Swal.fire({
        icon: 'success',
        title: '글 쓰기에 성공하셨습니다 !',
        text: '경매글 상세페이지로 이동합니다.',
      });
      // 경매글 상세페이지 api 연동 후 route 코드 추가 예정
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
    if (
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
    mutate({
      creatorId: Number(token),
      stuffName: productName,
      stuffContent: productDetail,
      stuffPrice: Number(productPrice),
      stuffCategory: selectValue.category,
    });
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
