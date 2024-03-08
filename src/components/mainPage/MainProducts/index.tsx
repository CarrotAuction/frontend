'use client';

import { useExpensiveProductBoard } from '@/src/remote/query/main';
import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

type Props = {
  title: string;
  data: any;
};

const cx = classNames.bind(styles);

const MainProducts = ({ data, title }: Props) => {
  const router = useRouter();

  const gotoDetailProduct = (id: string, salesStatus: boolean) => {
    if (salesStatus) {
      alert('이미 판매가 완료된 상품입니다.');
    } else {
      router.push(`/auction/${id}`);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <h4>{title}</h4>
      <div className={cx('products')}>
        {data?.data?.map((item: any) => {
          return (
            <div key={item.id}>
              <div onClick={() => gotoDetailProduct(item.id, item.salesStatus)}>
                <Image fill src={item.imageUrl} alt="product" />
                {item.salesStatus ? (
                  <div className={cx('salesMark')}>
                    <span>SOLD OUT</span>
                  </div>
                ) : null}
              </div>
              <p>
                현재 낙찰가 : <strong>{item.stuffPrice}</strong>원
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainProducts;
