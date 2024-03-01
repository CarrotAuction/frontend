'use client';

/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react';
import classNamees from 'classnames/bind';
import {
  useGetComments,
  useGetDetailInfo,
} from '@/src/remote/query/auctionDetail';
import { useInView } from 'react-intersection-observer';
import ProductInfo from '@/src/components/auctionDetailPage/ProductInfo';
import { CreatorCommentType } from '@/src/types/auctionDetail';
import Loading from '@/src/common/UI/Loading';
import CommentContainer from '@/src/components/auctionDetailPage/CommentContainer';
import Makers from '@/src/common/Makers';
import { useRecoilValue } from 'recoil';
import { currentLocationState, mapState } from '@/src/atom';
import {
  GetCurrentLocation,
  GetFindLocation,
} from '@/src/remote/apis/AuctionDetail/AuctionDetail.get.api';
import styles from './index.module.scss';

type AuctionDetailProps = {
  params: { slug: string };
};

const cx = classNamees.bind(styles);

const AuctionDetail = ({ params }: AuctionDetailProps) => {
  const boardId = params.slug;
  const [ref, inView] = useInView();
  const [arriveLocation, setArriveLocation] = useState({
    lat: '',
    lng: '',
    zoom: 8,
  });
  const map = useRecoilValue(mapState);
  const currentLocation = useRecoilValue(currentLocationState);

  const [comment, setCommnet] = useState<CreatorCommentType[]>([]);
  const { data, isPending } = useGetDetailInfo(boardId);

  const cursor = comment[comment.length - 1]?.id;
  const { data: commentData, isPending: isCommentPending } = useGetComments({
    boardId,
    cursor,
    inView,
  });

  useEffect(() => {
    if (commentData) setCommnet((pre) => [...pre, ...commentData]);
  }, [commentData]);

  useEffect(() => {
    if (data) {
      setCommnet(data.comments);
    }
  }, [data]);

  useEffect(() => {
    if (!isPending) {
      const query = encodeURIComponent(
        `${data?.board.creator.province.name}${data?.board.creator.city.name}`,
      );
      (async () => {
        const data = await GetCurrentLocation(query);
        setArriveLocation({
          lat: data?.documents[0]?.y,
          lng: data?.documents[0]?.x,
          zoom: 8,
        });
      })();
    }
  }, [data]);

  useEffect(() => {
    if (currentLocation && arriveLocation) {
      (async () => {
        const origin = `${currentLocation.lng},${currentLocation.lat}`;
        const destination = `${arriveLocation.lng},${arriveLocation.lat}`;

        if (origin === ',' || destination === ',') return;
        const queryParams = new URLSearchParams({
          origin,
          destination,
        });

        const response = await GetFindLocation(queryParams);

        const linePath: any[] = [];
        response.routes[0].sections[0].roads.forEach(
          (router: { vertexes: any[] }) => {
            router.vertexes.forEach((vertex, index) => {
              if (index % 2 === 0) {
                linePath.push(
                  new window.kakao.maps.LatLng(
                    router.vertexes[index + 1],
                    router.vertexes[index],
                  ),
                );
              }
            });
          },
        );
        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: '#f57a00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });
        polyline.setMap(map);
      })();
    }
  }, [currentLocation, arriveLocation]);

  if (!data) return <Loading width="300" height="300" />;

  return (
    <div className={cx('page')}>
      <ProductInfo productInfo={data} arriveLocation={arriveLocation} />
      <CommentContainer totalComments={data.totalComments} comments={comment} />
      {arriveLocation && (
        <Makers location={arriveLocation} info title="판매자 위치" />
      )}
      <div style={{ display: 'hidden', height: '100px' }} ref={ref} />
    </div>
  );
};

export default AuctionDetail;
