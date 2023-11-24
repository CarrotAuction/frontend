import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ProductInfoType } from '@/src/types/auctionDetail';
import { GetAuctionDetail } from '@/src/apis/AuctionDetail';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import userProfile from '@/src/assets/AuctionPost/userProfile.png';
import Modal from '@/src/components/auctionPostPage/Modal';
import styles from './index.module.scss';

type Props = {
  auctionId: string;
  loginedId: string | undefined;
};

const ProductInfo = ({ auctionId, loginedId }: Props) => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState<ProductInfoType>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    if (loginedId === undefined) {
      Swal.fire({
        icon: 'warning',
        title: '로그인 후에 경매에 참여할 수 있습니다.',
      });
      router.push('/login');
      return;
    }
    if (Number(loginedId) === productInfo.creator?.id) return;
    setIsOpen((pre) => !pre);
  };
  const { mutate } = useMutation({
    mutationFn: (id: string) => GetAuctionDetail(id),
    onSuccess: (data) => {
      setProductInfo({ ...data.board });
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

  useEffect(() => {
    mutate(auctionId);
  }, []);
  return (
    <section className={styles.productInfo}>
      <article className={styles.productInfoImageAndName}>
        <Image src={productInfo.imageUrl} fill alt="product image" />
      </article>
      <article className={styles.productInfoDetail}>
        <div className={styles.profileBox}>
          <div className={styles.profile}>
            <Image src={userProfile} fill alt="user image" />
          </div>
          <p>
            <span>{productInfo.creator?.nickname}</span>
          </p>
        </div>
        <p>{`${productInfo.stuffName}`}</p>
        <p>{`${productInfo.creator?.province.name} ${productInfo.creator?.city.name}`}</p>
        <p>{productInfo.stuffCategory}</p>
        <p>
          {`판매자 희망가격: ${productInfo.stuffPrice?.toLocaleString(
            'ko-KR',
          )}원`}
        </p>
        <div className={styles.line} />
        <div className={styles.introduce}>{productInfo.stuffContent}</div>
        <div className={styles.line} />
        <button
          type="button"
          className={styles.auctionParticipateButton}
          disabled={false}
          onClick={handleModal}
        >
          {Number(loginedId) === productInfo.creator?.id
            ? '판매 종료'
            : '경매 참여하기'}
        </button>
        {isOpen && (
          <Modal
            handleModal={handleModal}
            creatorId={loginedId}
            boardId={productInfo.id}
          />
        )}
      </article>
    </section>
  );
};

export default ProductInfo;
