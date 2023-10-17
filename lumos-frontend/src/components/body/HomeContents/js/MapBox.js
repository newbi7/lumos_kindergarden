export default {
  computed: {
    userId() {
      return this.$store.getters.getUserId;
    },
    recommendedCenters() {
      return this.$store.getters.getRecommendedCenters;
    },
    searchedCenters() {
      return this.$store.getters.getSearchedCenters;
    },
    clickPosition() {
      return this.$store.getters.getClickPosition;
    },
    clickAddress() {
      return this.$store.getters.getClickAddress;
    },
    clickAddressState() {
      return this.$store.getters.getClickAddressState;
    },
    clickAddressCity() {
      return this.$store.getters.getClickAddressCity;
    },
  },
  data() {
    return {
      markers: [],
      yMarkers: [],
      // infowindow: null // 인포윈도우를 저장할 변수
    };
  },
  mounted() {
    console.log("@@ MapBox-mounted 실행", window.kakao);
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      this.createMapScript();
    }
  },
  methods: {
    // 지도 스크립트 생성
    createMapScript() {
      console.log("@@ createMapScript 실행");
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=" +
        process.env.VUE_APP_KAKAO_API_KEY +
        "&autoload=false" +
        "&libraries=services";
      document.head.appendChild(script);
    },
    // 지도 초기화
    initMap() {
      console.log("@@ initMap 실행");
      const container = document.getElementById("map");
      const options = {
        // center: new kakao.maps.LatLng(33.450701, 126.570667), // 카카오 제주
        center: new kakao.maps.LatLng(37.506467348814965, 127.01339096616245),
        level: 4,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      this.setupClickListener();
      
      // 만악 store에 userId 데이터가 저장되어 있다면, 노란 마커 놓고, 화면 중앙으로 위치
      if (this.userId !== '') {
        console.log("** userId : ", this.userId);
        // clickAddress 데이터로 위경도 데이터 추출하기
        let geocoder = new kakao.maps.services.Geocoder(); // geocoder 객체 생성
        let latitude = null;
        let longitude = null;

        // 주소로 좌표 변환을 요청합니다.
        geocoder.addressSearch(this.clickAddress, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            latitude = result[0].y; // 위도
            longitude = result[0].x; // 경도
            this.$store.dispatch('setClickPosition', [latitude, longitude]);
          } else {
            console.log("주소 변환 실패: " + status);
          }
        });
      }
    },
    setupClickListener() {
      console.log("@@ setupClickListener 실행");
      // 지도에 클릭 이벤트 등록하기
      // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출
      console.log(window.kakao);
      window.kakao.maps.event.addListener(this.map, 'click', (mouseEvent) => {
        // 클릭한 위도, 경도 정보 가져와서 Vuex에 저장
        let latlng = mouseEvent.latLng;
        // console.log('클릭한 위치 위도 : ', latlng.getLat(), ", 경도 : ", latlng.getLng());
        this.$store.dispatch('setClickPosition', [latlng.getLat(), latlng.getLng()]);

        // 노란색 마커 표시
        let yMarkerPositions = [];
        yMarkerPositions.push([latlng.getLat(), latlng.getLng()]);
        this.displayYellowMarker(yMarkerPositions);

        // 시도-시군구 데이터 가져와서 Vuex에 저장하기(api호출 없이)
        // // geocoder : 주소-좌표 변환하는 객체
        let geocoder = new kakao.maps.services.Geocoder();
        function searchDetailAddrFromCoords(coords, callback) {
          // 좌표로 법정동 상세 주소 정보를 요청합니다
          geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }
        searchDetailAddrFromCoords(mouseEvent.latLng, (result, status) => {
          console.log(result, status);
          if (status === kakao.maps.services.Status.OK) {
            let addressState = result[0].address.region_1depth_name;
            let addressCity = result[0].address.region_2depth_name;
            
            // City 데이터에서 공백 제거하기
            addressCity = addressCity.replace(/\s/g, "");

            if (addressState === "서울") {
              addressState = addressState + "특별시";
            } else if (addressState === "인천" || addressState === "대전" || addressState === "대구") {
              addressState = addressState + "광역시";
            } else if (addressState === "경기" || addressState === "강원") {
              addressState = addressState + "도";
            } else if (addressState === "충남") {
              addressState = "충청남도";
            } else if (addressState === "충북") {
              addressState = "충청북도";
            } else if (addressState === "경남") {
              addressState = "경상남도";
            } else if (addressState === "경북") {
              addressState = "경상북도";
            } else if (addressState === "세종특별자치시") {
              addressCity = "세종특별자치시";
            }
            this.$store.dispatch('setClickAddress', result[0].address.address_name);
            this.$store.dispatch('setClickAddressState', addressState);
            this.$store.dispatch('setClickAddressCity', addressCity);

          }   
        });
      });
    },
    // setupInfoWindow() {
    //   console.log("@@ setupInfoWindow 실행");
    //   let iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
    //       iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
    //       iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
      
    //   // 인포윈도우를 생성하고 지도에 표시합니다
    //   let infowindow = new kakao.maps.InfoWindow({
    //     map: this.map, // 인포윈도우가 표시될 지도
    //     position : iwPosition, 
    //     content : iwContent,
    //     removable : iwRemoveable
    //   });
    //   console.log("인포윈도우 생성", infowindow);
    
    // },
    // displayInfoWindow(infowindowPosition) {
    //   console.log("@@ displayInfoWindow 실행");
    //   // console.log(infowindowPosition);
      
    //   // 이전 인포윈도우가 존재하는지 확인하고 닫고 제거합니다
    //   if (this.infowindow) {
    //     this.infowindow.close();
    //     this.infowindow = null;
    //   }

    //   // 인포윈도우 파라미터 설정
    //   // 인포윈도우에 표출될 내용. HTML 문자열이나 document element가 가능합니다
    //   let iwContent = `<div style="padding:5px;">내 위치</div>`;
    //   // 인포윈도우 표시 위치
    //   let iwPosition = new kakao.maps.LatLng(infowindowPosition[0], infowindowPosition[1]);
    //   // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    //   // let iwRemoveable = true;
      
    //   // 새로운 인포윈도우를 생성하고 지도에 표시합니다
    //   this.infowindow = new kakao.maps.InfoWindow({
    //     map: this.map, // 인포윈도우가 표시될 지도
    //     position : iwPosition, 
    //     content : iwContent,
    //     // removable : iwRemoveable
    //   });
    // },
    // 지도에 마커 표시하기
    displayMarker(markerPositions) {
      console.log("@@ displayMarker 실행");
      
      // 기존 마커 지우기
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      // markerPositions에 저장된 위경도 배열 데이터를 kakao의 LatLng 객체 배열로 변환
      // position : markerPositions 배열의 각 원소
      // LatLng : 위도, 경도 좌표값 저장 객체
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );

      if (positions.length > 0) {
        // 마커 정보 저장
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        // positions 배열의 데이터를 LatLngBounds 단일 객체에 포함시키기
        const bounds = positions.reduce(
          // callback : 지정한 위치를 포함하는 최소 박스 경계영역 데이터 저장
          (bounds, latlng) => bounds.extend(latlng),
          // initial value : LatLngBounds 객체 생성
          new kakao.maps.LatLngBounds()
        );

        // 지도 영역의 경계 정의
        this.map.setBounds(bounds);
      }
    },
    // 지도에 노란색 마커 표시하기
    displayYellowMarker(markerPositions) {
      console.log("@@ displayYellowMarker 실행");
      
      // 기존 마커 지우기
      if (this.yMarkers.length > 0) {
        this.yMarkers.forEach((marker) => marker.setMap(null));
      }

      // markerPositions에 저장된 위경도 배열 데이터를 kakao의 LatLng 객체 배열로 변환
      // position : markerPositions 배열의 각 원소
      // LatLng : 위도, 경도 좌표값 저장 객체
      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
      );
      
      if (positions.length > 0) {
        // 마커 이미지의 이미지 주소
        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        // 마커 이미지의 이미지 크기
        let imageSize = new kakao.maps.Size(24, 35);
        // 마커 이미지를 생성
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        // 마커 정보 저장
        this.yMarkers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
              image : markerImage // 마커 이미지 
            })
        );
      }
    },
  },
  watch: {
    recommendedCenters(newVal, oldVal) {
      console.log("@@@ watch-recommendedCenters 실행\n", oldVal, newVal);

      // 마커 정보 저장하고 지도에 출력
      let positions = [];
      for (let i = 0; i < newVal.length; i++) {
        positions.push([newVal[i].centerDetailLatitude,
          newVal[i].centerDetailLongitude]);
      }
      this.displayMarker(positions);

      // 마커마다 센터 번호 저장하고, 클릭하면 상세정보 보기

    },
    searchedCenters(newVal, oldVal) {
      console.log("@@@ watch-searchedCenters 실행\n", oldVal, newVal);

      // 마커 정보 저장하고 지도에 출력
      let positions = [];
      for (let i = 0; i < newVal.length; i++) {
        positions.push([newVal[i].centerDetailLatitude,
          newVal[i].centerDetailLongitude]);
      }
      this.displayMarker(positions);

      // 마커마다 센터 번호 저장하고, 클릭하면 상세정보 보기

    },
  },
}