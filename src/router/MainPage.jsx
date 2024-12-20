// MainPage.jsx
import React, { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Ranking from "../pages/Ranking";
import * as M from "./MainPage.styled";
import Header from "../layouts/Header";
import MainAllServices from "../pages/MainAllServices";
import Footer from "../layouts/Footer";
import { useScroll } from "../layouts/ScrollContext";
import IntroPage from "../pages/IntroPage";

const MainPage = ({ API_BASE_URL }) => {
  const servicesRef = useRef(null);
  const { homeRef, rankingRef } = useScroll();
  const [mainScroll, setMainScroll] = useState(0);
  const [isIntro, setIsIntro] = useState(true); // IntroPage 여부 상태 추가
  const location = useLocation(); // useLocation으로 현재 URL 감지


    // URL 해시값 변경 감지
    useEffect(() => {
      if (location.hash === '#home' && homeRef.current) {
          homeRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (location.hash === '#ranking' && rankingRef.current) {
          rankingRef.current.scrollIntoView({ behavior: "smooth" });
      }
  }, [location.hash]); // 해시값이 변경될 때마다 실행

    //MainPage의 높이를 측정 하는 함수
    function getScrollPosition() {
        let TargetElement = document.getElementById("MainPage");
        let y = TargetElement.scrollTop;
        setMainScroll(y);

    // IntroPage의 높이를 예로 600px로 가정, 스크롤 위치에 따라 isIntro 값 변경
    const threshold = window.innerHeight * 2;
    setIsIntro(y < threshold);
  }

  //getScrollPosition를 실행시키는 useEffect
  useEffect(() => {
    const targetElement = document.getElementById("MainPage");
    targetElement.addEventListener("scroll", getScrollPosition);

    return () => {
      if (targetElement) {
        targetElement.removeEventListener("scroll", getScrollPosition);
      }
    };
  }, []);

  return (
    <M.MainPage id="MainPage">
            <IntroPage ref={homeRef} mainScroll={mainScroll} API_BASE_URL={API_BASE_URL} />
            <div style={{ position: "sticky", top: 0, width: "200px", height: "100vh" }}>
        <Header isIntro={isIntro} /> {/* isIntro 상태를 prop으로 전달 */}
      </div>
      <Ranking ref={rankingRef} id="ranking" API_BASE_URL={API_BASE_URL} />
      <MainAllServices ref={servicesRef} API_BASE_URL={API_BASE_URL} />
      <Footer />
    </M.MainPage>
  );
};

export default MainPage;
