import React, { useEffect, useState } from 'react';

const KakaoMapWithSearch = () => {
  const [map, setMap] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // 카카오맵 API 라이브러리 로드
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      // 카카오맵 라이브러리 초기화
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 7,
        };
        const newMap = new window.kakao.maps.Map(mapContainer, mapOption);
        setMap(newMap);
      });
    };
  }, []);

  const handleSearch = () => {
    if (!keyword) {
      alert('검색어를 입력해주세요.');
      return;
    }

    // 장소 검색 요청
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);
        // 검색 결과를 활용하여 마커 생성, 지도에 표시 등을 수행할 수 있음
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 중 오류가 발생했습니다.');
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어를 입력하세요."
      />
      <button onClick={handleSearch}>검색</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <ul>
        {places.map((place) => (
          <li key={place.id}>{place.place_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default KakaoMapWithSearch;