import React from 'react';
import styled from 'styled-components';

// Custom Arrow Styles
const ArrowButton = styled.div`
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 12px solid #000;
  }
`;

const ArrowButtonPrev = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  &:before {
    border-top: none;
    border-bottom: 12px solid #000;
  }
`;

const ArrowButtonNext = styled(ArrowButton)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  &:before {
    border-top: none;
    border-bottom: 12px solid #000;
  }
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
  />
);

const SampleNextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <ArrowButtonNext
    className={className}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  />
);

export { SamplePrevArrow, SampleNextArrow };
