import styled from 'styled-components'
import {Link as LinkS} from 'react-scroll' 
import {FaTimes} from 'react-icons/fa'
import { Dark, HoverPrimary, Platinum} from '../Colors';


export const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #0d0d0d;
    display: grid;
    align-items: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen? '100%' : '0')};
    top: ${({ isOpen }) => (isOpen? '0' : '-100%')};
`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`;

export const SidebarWrapper = styled.div`
    color: #fff;    
    justify-content: center;
`;

export const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(7, 80px);
    text-align: center;    
    padding: 0;

    @media screen and (max-width: 480px){
        grid-template-rows: repeat(7, 60px);
    }
`;
export const SidebarLink = styled(LinkS)`
    white-space: nowrap;
    color: ${Platinum};
    font-size: ${({fontBig}) => (fontBig ? '20px':'16px')};
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:active&:not([hover]){
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
    &:hover{
        background: ${({darkmode}) => (darkmode ? Platinum:HoverPrimary)};
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
`;

export const SideBtnWrap = styled.div`
    display: flex;
    justify-content: center;
`;
