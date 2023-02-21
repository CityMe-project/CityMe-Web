import styled, { keyframes } from 'styled-components';
import { css } from 'styled-components';
import { Burnt, Platinum, Primary, Yellow } from '../Colors';

export const StatusContainer = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    justify-items: center;
    align-items: center;
    height: inherit;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 20px;
    height: 30px;
`;

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
//TODO see what is happening
const animation = css`
    ${rotate} 1s infinite alternate;
`;

export const StatusWrapper = styled.div`
    width: 90%;
    ${({type}) =>{
        if(type === "warning"){
            return 'background: '+Yellow+";";
        }else if(type === "error"){
            return 'background: '+Burnt+";";
        }else if(type === "info"){
            return 'background: gray;';
        }else{
            return 'background: '+Primary+";";
        }
    }}
    display: flex;
    justify-items: center;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    border-radius: 5px;
    opacity: ${({fullOpacity}) => (fullOpacity? '1': '0')};
    transition: all 0.3s ease-in-out;
    animation: ${blinker} ${({toogle}) => (toogle? '.7s': '0s')} linear infinite;
    svg{
        color: ${Platinum};
        animation: ${({loading}) => (loading? animation: 'none')}; 
    }
    
`;

export const StatusLabel = styled.label`
    color: #fff;
    padding: 0 5px;
    font-size: 14px;
`;

