import styled from 'styled-components';
import { BsCircleFill } from 'react-icons/bs';
import { Dark, Primary, Platinum } from '../Colors';


export const PageContainer = styled.div`
    color: #ffF;
    background: ${({darkmode}) => (darkmode ? Dark: Platinum)};
    height: ${window.innerHeight}px;
    
    @media screen and (max-width: 850px){
        height: 1300px;
        /*padding: 100px 0;*/
    } 
`;

export const PageWrapper = styled.div`
    display: flex;
    z-index: 1;
    height: 860px;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    align-content: stretch;
    justify-items: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PageRow = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: start;
    grid-template-areas:'col1 col2';
 
    @media screen and (max-width: 850px){
        grid-template-areas: 'col1  col1' 'col2  col2';
    }
`;

export const Column = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: ${({gridarea}) => (gridarea ? gridarea:'col1')};
`;

export const TitleWraper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 540px;
    padding: 50px;
`;

export const Title = styled.div`
    color: ${({darkmode}) => (darkmode ? Platinum:Primary)};
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;

    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`;

export const Subtitle = styled.p`
    color: ${({darkmode}) => (darkmode ? Platinum:Primary)};
    margin-bottom: 35px;
    font-size: 28px;
    line-height: 28px;
    text-align: center;
`;

export const TextWrapper = styled.div`
    max-width: 540px;
    padding: 0 30px;
`;

export const Description = styled.p`
    color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 20px;
    line-height: 28px;
    text-align: left;
    b{
        color:${Primary};
    }
`;

export const BulletsWrap = styled.table`
    display: flex;
    align-items: flex-start;
    text-align: left;
    flex-direction: column;
    padding: 0;
    /*margin-right: -22px;*/

`;

export const BulletColumn = styled.td`
    color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    padding: 10px 0;
    svg{
        color:${Primary};
        display: inline-block;
        vertical-align:middle;
    } 
    b{
        color:${Primary};
    }
`;

export const BulletItem = styled.li`
    color: ${({darkmode}) => (darkmode ? Platinum:Primary)};
    padding: 10px 0;
    display: flex;
    align-items: center;
`;

export const BulletIcon = styled(BsCircleFill)`
    font-size: 15px;
    padding-right: 15px;
`;

/*old*/
export const Column1 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col1;
`;

export const Column2 = styled.div`
    margin-bottom: 15px;
    padding: 0 15px;
    grid-area: col2;
`;


export const TopLine = styled.p`
    color: ${({darkmode}) => (darkmode ? Dark:Primary)};
    font-size: 20px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    margin-bottom: 16px;
`;

export const Heading = styled.h1`
    color: ${({darkmode}) => (darkmode ? Platinum:Primary)};
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    
    @media screen and (max-width: 480px){
        font-size: 32px;
    }
`;

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const MultiBtnWrap = styled.div`
    display: grid;
    gap: 50px 50px;
    grid-template-columns: auto auto;
`;

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%;
`;

export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
    pointer-events: none;
`;

export const ContactsContainer = styled.div`
    display:flex;
    flex-direction: column;
    a{
        color: ${({darkmode}) => (darkmode ? Platinum:Primary)};
        &:hover{
            color: ${Primary};
        }
    }
`;

