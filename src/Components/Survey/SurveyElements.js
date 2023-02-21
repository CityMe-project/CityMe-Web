import styled from 'styled-components';
import {Link as LinkR } from 'react-router-dom' 
import { Burnt, Dark, Platinum, Primary } from '../Colors';

//#region NAV

export const Nav = styled.nav`
    display: ${({visibility}) => (visibility ? 'none': 'block')};
    background: ${({scrollNav}) => (scrollNav ? Dark: 'transparent')};
    height:80px;
    margin-top: -80px;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 1002;
    transition: 0.2s all ease;
    
    @media screen and (max-width: 850px){
        transition: 0.8s all ease;
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-around;
    height: ${({height}) => (height ? height+'px': '80px')};
    width: 100%;
    align-items: center;
    padding: 20px 0;
    transition: 0.3s all ease-out;
`;

export const NavLogo = styled.div`
    background-image: ${({ src }) => `url(${src})`};
    background-position: center;
    height: inherit;
    width: inherit;
    background-repeat: no-repeat;
    transition: 0.2s all ease;
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

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    padding: 0 20px 0 0;
    
    @media screen and (max-width: 870px){
        display: none;
    }
`;

//#endregion

export const ButtonSubmit = styled.button`
    border-radius: 4px;
    background: ${({primary}) => (primary ? Primary:Dark)};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px':'12px 30px')};
    font-weight: ${({big}) => (big ? 'bold':'normal')};
    color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    font-size: ${({fontBig}) => (fontBig ? '20px':'16px')};
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    text-transform: uppercase;

    &:hover+&:enabled{
        transition: all 0.2s ease-in-out;
        background: ${({primary}) => (primary ? Platinum:Dark)};
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
    &:disabled{
        cursor: default;
        background: gray;
        color: darkgray;
        border-color: gray;
    }
`;

export const PageContainer = styled.div`
    color: #fff;
    background: ${({darkmode}) => (darkmode ? Dark: Platinum)};
    height: ${window.innerHeight}px;
    
    @media screen and (max-width: 850px){
        height: 1300px;
        /*padding: 100px 0;*/
    } 
`;

export const PageWrapper = styled.div`
    display: grid;
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
`;

export const Container = styled.div`
    min-height: 692px; 
    min-width: 400px; 
    position: absolute; 
    ${({type}) => { 
        if(type === 'right'){
            return 'left:1%; right:99%; top:0%; bottom:0%; background: transparent; transition: all 2s, background-color 0.01s;';
        }else if(type === 'outputs'){
            return 'left:0%; right:99%; top:0%; bottom:0%; background: transparent; transition: all 2s, background-color 0.01s;';
        }
        else{
            return 'left:0%; right:0%; top:0%; bottom:0%; background: '+Primary+'73; transition: all 1s linear, background-color 2s cubic-bezier(1, 0.01, 0.5,-0.17);';
        }
    }};  
    z-index: 1001;
    overflow: hidden; 
`;

export const FormWrap = styled.div`
    height: 100%; 
    display: flex; 
    flex-direction:  ${({flexdirection}) => (flexdirection ? flexdirection: "column")};
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 400px) {
        height: 80%;
    }
`;

export const FormMask = styled.div`
    position: absolute;
    height: inherit;
    width: inherit;
    background: #f0f8ff8c;
`;

export const Icon = styled(LinkR)`
    margin-left: 32px; 
    margin-top: 32px; 
    text-decoration: none; 
    color: #fff; 
    font-weight: 700; 
    font-size: 32px;

    @media screen and (max-width: 480px) { 
        margin-left: 16px; 
        margin-top: 8px;
    }
`;

export const FormContent = styled.div`
    background: ${({background}) => (background ? background:Dark)};
    ${({type}) => { 
        if(type === 'center'){
            return 'height: 80%; width: 750px;';
        }
        else if(type === 'right'){
            return 'height: 95%; width: 400px;';
        }
        else if(type === 'centersmall'){
            return 'height: 50%; width: 800px;';
        }
        else if(type === 'dialog'){
            return 'height: 250px; width: 450px;';
        }
        else if(type === 'outputs'){
            return 'height: 70%; width: 300px;';
        }
        else if(type === 'outputs-questions'){
            return 'height: 70%; width: 60px;';
        }
        else{
            return 'height: 95%; width: 800px;';
        }
    }};  
    z-index: 1;
    display: flex;
    border-radius: 5px;
    box-shadow: ${({background}) => (background ? "none":"0 1px 3px rgb(0 0 0 / 30%)")};;
    transition: all 1s, background-color 0s;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    flex-direction: column;

    @media screen and (max-width: 400px) {
        padding: 10px;
    }
`;

export const Form = styled.form`
    flex: 1;
    height: auto;
    width: auto;
    display: grid;
    align-items: center;
    align-content: center;
    padding: 20px;
    min-width: 500px;
`;

export const FormH1 = styled.h1`
    display: flex;
    margin-bottom: 10px;
    color: #53917e;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    text-transform: uppercase;
`;

export const FormLabel = styled.label`
    margin-bottom: 8px;
    color: #fff;
    font-size: 14px;
`;

export const FormInput = styled.input`
    padding: 16px;
    margin-bottom: 30px;
    box-shadow: 0 0 0px 1000px ${Platinum} inset;
    border-color: ${Primary};
    border-radius: 4px;
    border-width: 3px;
    border-style: solid;
    transition: all 0.2s ease-in-out;

    &:invalid {
        border-color: ${Burnt};
        transition: all 0.2s ease-in-out;
    }
    &:disabled{
        cursor: default;
        box-shadow: 0 0 0px 1000px  #7c7c7c inset;
        color: #adadad;
        border-color: #5a5a5a;
    }
`;

export const FormButton = styled.button`
    background: #01bf71;
    padding: 16px 0; 
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
`;

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`;

export const MainText = styled.div`
    color: ${Platinum};
    margin-bottom: 0px;
    font-size: 15px;
    line-height: 20px;
    text-align: justify;
    
    b{
        color: ${Primary};
    }
    p{
        margin-bottom: 5px;
    }
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
    font-size: 20px;
    line-height: 20px;
    text-align: left;
`;

export const IconLink = styled.a`
    cursor: pointer;
    color: ${Platinum};
    font-size: 24px;
    &:hover{
        color: ${Primary};
    }
`;

export const HeaderContainer = styled.header`
    width: 100%;
    display: flex;
`;

export const ContentContainer = styled.div`
    overflow: hidden;
    flex: 1; 
    padding: 0 10px;
    display: flex;
    flex-direction: column;
`;

export const FooterContainer = styled.footer`
    width: 100%;
    height: 50px;
`;

export const ContentWrapper = styled.div`
    flex: 2; 
    overflow: auto;
`;

export const Content1Wrapper = styled.div`
    flex: 2; 
`;

export const ScrollbarWrapper = styled.div(() => ({
    borderWidth: "3px 0",
    borderStyle: "solid",
    borderColor: "#282b2e",
    flex: "1", 
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column",
    scrollbarColor: "white blue",
    direction: "ltr",  // if you want to show the scroll bar on the left 
    "::-webkit-scrollbar": {
        width: "8px",
    
    },
    "::-webkit-scrollbar-track": {
        boxShadow: "nset 0 0 6px grey",
        borderRadius: "5px"
    },
    "::-webkit-scrollbar-thumb": {
        background: Primary,
        borderRadius: "15px",
        height: "3px",
        transition: "all 0.2s ease-in-out"
    },
    "::-webkit-scrollbar-thumb:hover": {
        background: Platinum,
        maxHeight: "10px",
        transition: "all 0.2s ease-in-out"
    }
}))