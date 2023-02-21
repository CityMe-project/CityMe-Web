import styled from 'styled-components';
import { Dark, Platinum } from '../Colors';

const tooltipMargin = "105px";
const tooltipArrowSize = "6px";

export const TooltipWrapper = styled.div`
    display: inherit;
    position: relative;
`;

export const TooltipBalloon = styled.div`
    position: absolute;
    border-radius: 4px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    box-sizing: border-box;
    border-width: 3px;
    border-color: ${Dark};
    border-style: solid;
    background: ${Platinum};
    font-size: 14px;
    font-family: sans-serif;
    line-height: 1;
    z-index: 1000000;
    white-space: nowrap;

    &:before {
        content: " ";
        left: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-width: ${tooltipArrowSize};
        margin-left: calc(${tooltipArrowSize} * -1);
        ${({direction}) => {
            if(direction === 'top'){
                return "top: 100%; border-top-color: "+Platinum+";";
            }else if(direction === 'right'){
                return "left: calc("+tooltipArrowSize+" * -1); top: 50%; transform: translateX(0) translateY(-50%); border-right-color: "+Platinum+";";
            }else if(direction === 'bottom'){
                return "bottom: 100%;border-bottom-color: "+Platinum+";";
            }else if(direction === 'left'){
                return "left: auto;right: calc("+tooltipArrowSize+" * -2);top: 50%;transform: translateX(0) translateY(-50%);border-left-color: "+Platinum+";";
            }
        }};
    }

    ${({direction}) => {
        if(direction === 'top'){
            return "top: calc("+tooltipMargin+" * -1);";
        }else if(direction === 'right'){
            return "left: 100%;;top: 50%; transform: translateX(0) translateY(-50%);";
        }else if(direction === 'bottom'){
            return "bottom: calc("+tooltipMargin+" * -1);";
        }else if(direction === 'left'){
            return "left: auto;right: 100%;top: 50%;transform: translateX(0) translateY(-50%);";
        }
    }};

`;
