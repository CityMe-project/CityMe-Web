import { AiOutlineLoading } from 'react-icons/ai';
import styled, { keyframes } from 'styled-components';
import { Platinum, Primary } from '../Colors';

export const MaskContainer = styled.div`    
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: inherit;
    width: inherit;
    background: ${Platinum+'5e'};
    z-index: 5000;
    border-radius: 5px;
    ${({fullpage}) => (fullpage ? 'left: 0; right: 0;': '')};
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
export const LoadingIcon = styled(AiOutlineLoading)`
    color: ${Primary};
    font-size: 5rem;
    animation: 1s linear ${spin} infinite;
`;

