'use client';
import React from 'react';
import styled from 'styled-components';
import Slider, { Settings} from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SamplePrevArrow, SampleNextArrow } from './CustomArrows';
import { SparklesCore } from './ui/sparkles';
import Image from 'next/image';

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

const CoverImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Title = styled(Image)`
  width: 100%;
  transition: transform 0.5s;
`;

const Character = styled(Image)`
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
        <CoverImage
        src={coverImage}
        alt="Cover Image"
        width={500}
        height={500}
        loading='lazy'
        />
      </Wrapper>
      <Title 
      src={titleImage}
      alt='title'
      width={500}
      height={500}
      loading='lazy'
      />
      <Character
       src={characterImage}
       alt="Character"
       width={500}
       height={500}
       loading='lazy'
      />
    </CardContainer>
  );
};

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
    <GlobalStyles className='overflow-hidden bg-bg1 py-12'>
       <div className=" flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-4xl text-5xl lg:text-6xl font-bold text-center text-red-600 relative z-20">
        MOVIES
      </h1>
      <div className="w-[40rem] h-16 mb-14 relative">
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
 
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
      <Slider {...settings}>
        <Card
          coverImage="/thedarkknightposter.jpg"
          titleImage="/dlogo.png"
          characterImage="/klipart.png"
        />
        <Card
          coverImage="/spidermanposter.jpg"
          titleImage="/pngwing1.png"
          characterImage="/spidermanpng.png"
        />
        <Card
          coverImage="/hulkposter.jpg"
          titleImage="/hlogo1.png"
          characterImage="/hulp1.png"
        />
        <Card
          coverImage="/aquamanposter.jpg"
          titleImage="/aquamanlogo.png"
          characterImage="/aquaman.png"
        />
      </Slider>
    </GlobalStyles>
  );
};

export default SpecialCards;
