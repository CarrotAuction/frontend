import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import userProfile from '@/src/assets/AuctionPost/userProfile.png';
import Modal from '@/src/components/auctionDetailPage/Modal';
import { AuctionDetail } from '@/src/types/auctionDetail';
import ModalPortal from '@/src/common/Portal';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { usePostLike } from '@/src/remote/query/auctionDetail';
import { getCookie } from 'cookies-next';
import classNamees from 'classnames/bind';
import styles from './index.module.scss';

type Props = {
  productInfo: AuctionDetail;
};

const ProductInfo = ({ productInfo }: Props) => {
  const router = useRouter();
  const boardId = useParams().slug;
  const loginedId = getCookie('token');
  const [isOpen, setIsOpen] = useState(false);

  const cx = classNamees.bind(styles);

  const { board } = productInfo;

  const handleModal = () => {
    if (loginedId === undefined) {
      Swal.fire({
        icon: 'warning',
        title: '로그인 후에 경매에 참여할 수 있습니다.',
      });
      router.push('/login');
      return;
    }
    if (Number(loginedId) === board.creator.id) return;
    setIsOpen((pre) => !pre);
  };

  // const { mutate } = usePostLike({ like, setLike, boardId });

  const clickLike = () => {
    if (loginedId) {
      // mutate({ boardId, userId: loginedId });
    }
  };

  return (
    <section className={cx('productInfo')}>
      <article className={cx('productInfoImageAndName')}>
        <Image src={board.imageUrl} fill alt="product image" />
      </article>
      <article className={cx('productInfoDetail')}>
        <span className={cx('writeInform')}>사용자 정보</span>
        <div className={cx('profileBox')}>
          <div>
            <div className={cx('profile')}>
              <Image src={userProfile} fill alt="user image" />
            </div>
            <p>
              <span>{board.creator.nickname}</span>
            </p>
          </div>

          <p>{`${board.creator.province.name} ${board.creator.city.name}`}</p>
        </div>

        <span className={cx('writeInform')}>상품 정보</span>
        <span className={cx('dataName')}>{`${board.stuffName}`}</span>

        <p className={cx('catagory')}>{board.stuffCategory}</p>
        <span>
          판매자 희망가격 :<em>{board.stuffPrice.toLocaleString('ko-KR')}</em>원
        </span>
        <span className={cx('writeInform')}>상세 내용</span>
        <div className={cx('introduce')}>{board.stuffContent}</div>
        <div className={cx('like')}>
          {/* <div onClick={clickLike}>
            {like ? <AiFillLike size={64} /> : <AiOutlineLike size={64} />}
          </div> */}
          <p className={cx('likeNum')}>{board.likesCount}</p>
        </div>
        <button
          type="button"
          className={cx('auctionParticipateButton')}
          disabled={false}
          onClick={handleModal}
        >
          {Number(loginedId) === board.creator.id
            ? '판매 종료'
            : '경매 참여하기'}
        </button>
        {/* {isOpen && (
          <ModalPortal>
            <Modal
              handleModal={handleModal}
              creatorId={loginedId}
              boardId={board.id}
            />
          </ModalPortal>
        )} */}
      </article>
    </section>
  );
};
export default ProductInfo;
