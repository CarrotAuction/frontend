/* eslint-disable react/jsx-no-useless-fragment */
import { mapState } from '@/src/atom';
import { useRecoilValue } from 'recoil';
import React, { useEffect } from 'react';
import { LocationType } from '@/src/types/map';
import arrive from '../../assets/auction/arrive.png';

const Makers = ({
  location,
  info,
  title,
}: {
  location: LocationType;
  info?: boolean;
  title?: string;
}) => {
  const map = useRecoilValue(mapState);

  const loadKakaoMarker = () => {
    if (map) {
      const imageSrc = arrive.src;

      const imageSize = new window.kakao.maps.Size(40, 40);
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      );

      const markerPosition = new window.kakao.maps.LatLng(
        location.lat,
        location.lng,
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      marker.setMap(map);

      if (info) {
        const iwContent = `<div style="padding:5px;">${title}<br><a href="https://map.kakao.com/link/map/나의 위치,${location.lat},${location.lng}" style="color:blue" target="_blank">길찾기</a></div>`;

        const iwPosition = new window.kakao.maps.LatLng(
          location.lat,
          location.lng,
        );

        const infowindow = new window.kakao.maps.InfoWindow({
          position: iwPosition,
          content: iwContent,
        });

        infowindow.open(map, marker);
      }
    }
  };
  useEffect(() => {
    loadKakaoMarker();
  }, [map]);

  return <></>;
};

export default Makers;
