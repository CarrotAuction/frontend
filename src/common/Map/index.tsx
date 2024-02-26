'use client';

import Script from 'next/script';
import classNamees from 'classnames/bind';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { locationState, mapState } from '@/src/atom';
import styles from './index.module.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

type MapProps = {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
};

export default function Map({ lat, lng, zoom }: MapProps) {
  const cx = classNamees.bind(styles);

  const setMap = useSetRecoilState(mapState);
  const location = useRecoilValue(locationState);

  const loadKakaoMap = () => {
    window.kakao.maps.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level: zoom ?? location.zoom,
      };

      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      setMap(map);
    });
  };

  return (
    <>
      <div id="map" className={cx('map')} />
      <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_CLIENT}&autoload=false`}
        onReady={loadKakaoMap}
      />
    </>
  );
}
