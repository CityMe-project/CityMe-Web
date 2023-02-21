import styled from 'styled-components'
import {Link as LinkR } from 'react-router-dom' 
import {Link as LinkS} from 'react-scroll' 
import { Dark, Primary} from '../Colors';

export const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? Dark: 'transparent')};
    height:80px;
    margin-top: -80px;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: 0.5s all linear;
    
    @media screen and (max-width: 850px){
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 80px;
    z-index: 1;
    width: 100%;
    align-items: center;
    /*padding: 0 24px;
    max-width: 1100px;*/
`;

/*
export const NavLogo = styled(LinkR)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    font-weight: bold;
    text-decoration: none;
`;*/

export const NavLogo = styled(LinkR)`
    background-image: ${({ src }) => `url(${src})`};
    background-position: center;
    height: 80px;
    width: 185px;
    background-repeat: no-repeat;
    transition: 0.2s all ease;
    background-size: 180px;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 870px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    padding: 0 5%;
    /* margin-right: -22px;*/

    @media screen and (max-width: 870px){
        display: none;
    }
`;

export const NavItem = styled.li`
    height: 80px;
`;

export const NavLinks = styled(LinkS)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer; 
    box-sizing: border-box;
    transition: 0.2s ease-in-out;

    &:hover{
        color: ${Primary};
        transition: 0.2s ease-in-out;
    }

    &.active{
        color: ${Primary};
        border-bottom: 3px solid ${Primary};   
    }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
    
    @media screen and (max-width: 870px){
        display: none;
    }
`;

export const NavBtnLink = styled(LinkR)`
    border-radius: 50px;
    background: #01bf71;
    white-space: nowrap;
    padding: 10px 22px;
    color: #010606;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #010606;
    }
    
    @media screen and (max-width: 768px){
        display: none;
    }
`;

