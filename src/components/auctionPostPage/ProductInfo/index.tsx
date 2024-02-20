import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import userProfile from '@/src/assets/AuctionPost/userProfile.png';
import Modal from '@/src/components/auctionPostPage/Modal';
import { ProductInfoType } from '@/src/types/auctionDetail';
import ModalPortal from '@/src/common/Portal';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { usePostLike } from '@/src/remote/query/auctionDetail';
import styles from './index.module.scss';

type Props = {
  boardId: string;
  loginedId: string | undefined;
  productInfo: ProductInfoType;
  refetch: (
    options?: RefetchOptions,
  ) => Promise<QueryObserverResult<ProductInfoType>>;
};

const ProductInfo = ({ loginedId, boardId, productInfo, refetch }: Props) => {
  const router = useRouter();
  const [like, setLike] = useState(false);
  const [count, setCount] = useState(productInfo?.likesCount);
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
    if (Number(loginedId) === productInfo?.creator?.id) return;
    setIsOpen((pre) => !pre);
  };

  const { mutate } = usePostLike({ like, setLike, setCount, boardId });

  const clickLike = () => {
    if (loginedId) {
      mutate({ boardId, userId: loginedId });
    }
    refetch();
  };

  return (
    <section className={styles.productInfo}>
      <article className={styles.productInfoImageAndName}>
        <Image src={productInfo?.imageUrl} fill alt="product image" />
      </article>
      <article className={styles.productInfoDetail}>
        <span className={styles.writeInform}>사용자 정보</span>
        <div className={styles.profileBox}>
          <div>
            <div className={styles.profile}>
              <Image src={userProfile} fill alt="user image" />
            </div>
            <p>
              <span>{productInfo?.creator?.nickname}</span>
            </p>
          </div>

          <p>{`${productInfo?.creator?.province.name} ${productInfo?.creator?.city.name}`}</p>
        </div>

        <span className={styles.writeInform}>상품 정보</span>
        <span className={styles.dataName}>{`${productInfo?.stuffName}`}</span>

        <p className={styles.catagory}>{productInfo?.stuffCategory}</p>
        <p>
          {`판매자 희망가격: ${productInfo?.stuffPrice?.toLocaleString(
            'ko-KR',
          )}원`}
        </p>
        <span className={styles.writeInform}>상세 내용</span>
        <div className={styles.introduce}>{productInfo?.stuffContent}</div>
        <div className={styles.like}>
          <div onClick={clickLike}>
            {like ? <AiFillLike size={64} /> : <AiOutlineLike size={64} />}
          </div>
          <p className={styles.likeNum}>{productInfo?.likesCount}</p>
        </div>
        <button
          type="button"
          className={styles.auctionParticipateButton}
          disabled={false}
          onClick={handleModal}
        >
          {Number(loginedId) === productInfo?.creator?.id
            ? '판매 종료'
            : '경매 참여하기'}
        </button>
        {isOpen && (
          <ModalPortal>
            <Modal
              refetch={refetch}
              handleModal={handleModal}
              creatorId={loginedId}
              boardId={productInfo?.id}
            />
          </ModalPortal>
        )}
      </article>
    </section>
  );
};

export default ProductInfo;
