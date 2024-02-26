/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { currentLocationState, mapState } from '@/src/atom';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import home from '../../assets/auction/home.png';

const Navigator = () => {
  const [map, setMap] = useRecoilState(mapState);
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationState);
  useEffect(() => {
    const fetchUserLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat: `${lat}`, lng: `${lng}`, zoom: 3 });
          const imageSrc = home.src;

          const imageSize = new window.kakao.maps.Size(40, 40);
          const imageOption = { offset: new window.kakao.maps.Point(27, 69) };

          const markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption,
          );

          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            image: markerImage,
          });

          marker.setMap(map);

          const iwContent = `<div style="padding:5px;">현재 나의 위치<br><a href="https://map.kakao.com/link/map/나의 위치,${lat},${lng}" style="color:blue" target="_blank">길찾기</a></div>`;
          const iwPosition = new window.kakao.maps.LatLng(lat, lng);

          const infowindow = new window.kakao.maps.InfoWindow({
            position: iwPosition,
            content: iwContent,
          });

          infowindow.open(map, marker);
        });
      }
    };

    fetchUserLocation(); // 여기서 함수를 호출하여 로직을 실행합니다.
  }, [map]);

  return <></>;
};

export default Navigator;
