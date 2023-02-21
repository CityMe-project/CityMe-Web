import styled from 'styled-components';
import { Dark, Platinum, Primary } from '../Colors';


export const TeamContainer = styled.div`
    height: ${window.innerHeight}px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: ${({darkmode}) => (darkmode ? Dark: Platinum)};

    @media screen and (max-width: 850px){
        height: 1300px;
    }
    
    @media screen and (max-width: 480px){
        height: 2300px;
    }

`;

export const TeamWrapper = styled.div`
    max-width: 1100px;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    grid-gap: 50px;
    /*padding: 0 50px;*/
    
    @media screen and (max-width: 850px){
        grid-template-columns: 1fr 1fr;
    }
    
    @media screen and (max-width: 480px){
        grid-template-columns: 1fr;
    }

`;

export const PersonCard = styled.div`
    background: ${({darkmode}) => (darkmode ? Platinum: Dark)};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    max-height: 400px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
    
    &:hover{
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
    
`;

export const PersonPhoto = styled.div`
    background-image: ${({ src }) => `url(${src})`};
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    height: 160px;
    width: 160px;
    margin-bottom: 25px;  
`;

export const TeamH1 = styled.h1`
    font-size: 2.5rem;
    color: ${({darkmode}) => (darkmode ? Dark:Primary)};
    margin-bottom: 64px;
    
    @media screen and (max-width: 480px){
        font-size: 2rem;
    }
`;

export const PersonH2 = styled.h2`
    font-size: 1rem;
    color: ${({darkmode}) => (darkmode ? Primary:Primary)};
    margin-bottom: 10px;
`;

export const PersonP = styled.p`
    font-size: 1rem;
    color: ${({darkmode}) => (darkmode ? Dark:Primary)};
    text-align: center;
    font-weight: ${({bold}) => (bold ? "bold":"lighter")};
`;