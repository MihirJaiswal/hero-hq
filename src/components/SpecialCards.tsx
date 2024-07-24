'use client';
import React from 'react';
import styled from 'styled-components';
import Slider, { Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SamplePrevArrow, SampleNextArrow } from './CustomArrows';

// Styled Components
const CardContainer = styled.a`
  width: var(--card-width);
  height: var(--card-height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 0 36px;
  perspective: 2500px;
  margin: 0 10px; /* Reduced margin for testing */
  text-decoration: none;
  color: inherit;
  background: #192740; /* Debugging background color */
  border: 1px solid #ddd; /* Debugging border */
`;

const Wrapper = styled.div`
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  z-index: -1;
  &::before,
  &::after {
    content: "";
    opacity: 0;
    width: 100%;
    height: 80px;
    transition: all 0.5s;
    position: absolute;
    left: 0;
  }
  &::before {
    top: 0;
    height: 100%;
    background-image: linear-gradient(to top, transparent 46%, rgba(12, 13, 19, 0.5) 68%, rgba(12, 13, 19) 97%);
  }
  &::after {
    bottom: 0;
    opacity: 1;
    background-image: linear-gradient(to bottom, transparent 46%, rgba(12, 13, 19, 0.5) 68%, rgba(12, 13, 19) 97%);
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled.img`
  width: 100%;
  transition: transform 0.5s;
`;

const Character = styled.img`
  width: 100%;
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  z-index: -1;
`;

interface CardProps {
  coverImage: string;
  titleImage: string;
  characterImage: string;
}

const Card: React.FC<CardProps> = ({ coverImage, titleImage, characterImage }) => {
  return (
    <CardContainer>
      <Wrapper>
        <CoverImage src={coverImage} />
      </Wrapper>
      <Title src={titleImage} />
      <Character src={characterImage} />
    </CardContainer>
  );
};

// Custom Arrow Buttons
const ArrowButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  z-index: 1;

  &:hover {
    background: #ddd;
  }

  &:disabled {
    background: #f0f0f0;
    cursor: not-allowed;
  }
`;

/* const PrevArrow: React.FC<SamplePrevArrow> = ({ className, style, onClick }) => (
  <ArrowButton
    className={className}
    style={{ ...style, left: '10px' }}
    onClick={onClick}
  >
    &#9664;
  </ArrowButton>
);

const NextArrow: React.FC<SampleNextArrow> = ({ className, style, onClick }) => (
  <ArrowButton
    className={className}
    style={{ ...style, right: '10px' }}
    onClick={onClick}
  >
    &#9654;
  </ArrowButton>
);
 */
// CSS Variables
const GlobalStyles = styled.div`
  --card-height: 400px; /* Increased height */
  --card-width: calc(var(--card-height) / 1.5);
  * {
    box-sizing: border-box;
  }
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #192740;
    overflow: hidden;
  }

  .slick-slide {
    padding: 0 10px; /* Added padding for visibility */
    display: flex;
    justify-content: center; /* Ensure centered alignment */
    align-items: center; /* Ensure centered alignment */
  }

  .slick-list {
    overflow: visible; /* Make sure the overflow is visible */
  }

  ${CardContainer}:hover ${Wrapper} {
    transform: perspective(900px) translateY(-5%) rotateX(25deg) translateZ(0);
    box-shadow: 2px 35px 32px -8px rgba(0, 0, 0, 0.75);
  }

  ${CardContainer}:hover ${Wrapper}::before,
  ${Wrapper}::after {
    opacity: 1;
  }

  ${CardContainer}:hover ${Wrapper}::after {
    height: 120px;
  }

  ${CardContainer}:hover ${Title} {
    transform: translate3d(0%, -50px, 100px);
  }

  ${CardContainer}:hover ${Character} {
    opacity: 1;
    transform: translate3d(0%, -30%, 100px);
  }
`;

const SpecialCards: React.FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10px',
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: '10px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '0',
        },
      },
    ],
  };

  return (
    <GlobalStyles className='overflow-hidden py-20 bg-[#1A2841]'>
      <Slider {...settings}>
        <Card
          coverImage="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg"
          titleImage="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png"
          characterImage="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp"
        />
        <Card
          coverImage="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg"
          titleImage="https://ggayane.github.io/css-experiments/cards/force_mage-title.png"
          characterImage="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp"
        />
        <Card
          coverImage="https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg"
          titleImage="https://ggayane.github.io/css-experiments/cards/dark_rider-title.png"
          characterImage="https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp"
        />
        <Card
          coverImage="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg"
          titleImage="https://ggayane.github.io/css-experiments/cards/force_mage-title.png"
          characterImage="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp"
        />
      </Slider>
    </GlobalStyles>
  );
};

export default SpecialCards;
