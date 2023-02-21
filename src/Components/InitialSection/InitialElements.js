import styled from 'styled-components';
import {MdKeyboardArrowRight, MdArrowForward} from 'react-icons/md';
import { Platinum, Primary, Dark } from '../Colors';

export const InitialContainer = styled.div`
    background: #0c0c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: ${window.innerHeight}px;
    position: relative;
    z-index: 1;

    :before{
        content: '';
        position: ${({visible}) => (visible ? 'absolute': 'unset')};
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: linear-gradient(
            180deg
            ,#53917e33 0%,#53917e99 100%),linear-gradient(
            180deg
            ,${Dark+"66"} 0%,transparent 100%);
        z-index: 2;
    }
    /*TODO add :before syles*/
`; 

export const InitialBg = styled.div`
    z-index: 1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`; 

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: ${Primary};
`; 

export const VideoDraw = styled.video`
    border: 5px #53917e solid;
    border-radius: 5px;
    width: 95%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: ${Primary};
`; 
export const InitialContent = styled.div`
    z-index: 1000;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: ${({visible}) => (visible ? 'flex': 'none')};
    flex-direction: column;
    align-items: center;
`; 

export const InitialH1 = styled.h1`
    color: ${Platinum};
    font-size: 48px;
    text-align: center;
    padding: 0 10%;
    
    @media screen and (max-width: 768px){
        font-size: 40px;
    }
    
    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`; 

export const InitialP = styled.p`
    margin-top: 24px;
    color: ${Platinum};
    font-size: 24px;
    text-align: center;
    max-width: 600px;

    @media screen and (max-width: 768px){
        font-size: 24px;
    }
    
    @media screen and (max-width: 480px){
        font-size: 18px;
    }
`; 

export const InitialBtnWrapper = styled.div`
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
`; 

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`; 

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`; 

