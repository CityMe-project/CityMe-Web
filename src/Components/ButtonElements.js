import styled from 'styled-components';
import {Link as LinkS} from 'react-scroll' 
import {Link as LinkR} from 'react-router-dom' 
import { Burnt, Dark, HoverPrimary, Platinum, Primary} from './Colors';

export const Button = styled(LinkS)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? Primary:Burnt)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px':'12px 30px')};
    color: ${Platinum};
    font-size: ${({fontBig}) => (fontBig ? '20px':'16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${({darkmode}) => (darkmode ? Platinum:Dark)};
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
`;

export const ButtonRoute = styled(LinkR)`
    border-radius: 50px;
    background: ${({primary}) => (primary ? Primary:Dark)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px':'12px 30px')};
    color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    font-size: ${({fontBig}) => (fontBig ? '20px':'16px')};
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:active&:not([hover]){
        background: #d1d1d1;
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
    &:hover{
        background: ${({darkmode}) => (darkmode ? Platinum:HoverPrimary)};
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
`;

export const ButtonLink = styled.a`
    border-radius: 50px;
    background: ${({primary}) => (primary ? Primary:Dark)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px':'12px 30px')};
    color: ${Platinum};
    font-size: ${({fontBig}) => (fontBig ? '20px':'16px')};
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;

    &:active&:not([hover]){
        background: #d1d1d1;
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
    &:hover{
        background: ${({darkmode}) => (darkmode ? Platinum:HoverPrimary)};
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
`;
