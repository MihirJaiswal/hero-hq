import React from 'react';
import styled from 'styled-components';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

// Custom Arrow Styles
const ArrowButton = styled.div`
  z-index: 1;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px; /* Adjust icon size */
`;

const ArrowButtonPrev = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
`;

const ArrowButtonNext = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const SamplePrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <ArrowButtonPrev
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <ChevronLeftIcon/>
  </ArrowButtonPrev>
);

const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <ArrowButtonNext
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  >
    <ChevronRightIcon />
  </ArrowButtonNext>
);

export { SamplePrevArrow, SampleNextArrow };
