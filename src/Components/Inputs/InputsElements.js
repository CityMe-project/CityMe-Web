import styled, { keyframes, css } from 'styled-components';
import { Burnt, Dark, HoverPrimary, Platinum, Primary, Yellow } from '../Colors';

//#region Checkbox
export const HiddenCheckbox = styled.input.attrs({type: 'checkbox'})`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Icon = styled.svg`
  fill: none;
  stroke: ${Platinum};
  stroke-width: 2px;
  
`;

export const StyledCheckbox = styled.label`
  display: flex;
  width: 16px;
  height: 16px;
  background: ${props => props.checked ? Primary : Platinum};
  border-radius: 3px;
  transition: all 150ms;
  border-style: solid;
  border-width: 0px;
  box-sizing: border-box;
  border-color: ${props => props.checked ? Platinum : Primary};

    ${Icon} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
`;

export const Text = styled.label`
    padding-left: 7px;
`;

export const CheckboxContainer = styled.div`
    display: flex;
    vertical-align: middle;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
`;

export const CheckboxInput = styled.div`
    display: flex;
    

    &:hover:not([disabled]){
        ${StyledCheckbox}{
            border-width: 1px;
        }
    }
    &:active:not([hover],[disabled]){
        ${StyledCheckbox}{
            border-width: 2px;
            border-color: #d1d1d1;
        }
    }
    &[disabled]{
        cursor: default;
        ${StyledCheckbox}{
            background: gray;
            border-color: gray;
        }
        ${Text}{
            color: darkgray;
        }
    }

    ${HiddenCheckbox}:focus + & {
        box-shadow: 0 0 0 3px pink;
    }
`;
//#endregion

//#region Radio
export const HiddenRadio = styled.input.attrs({type: 'radio'})`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const RadioIcon = styled.svg`
  fill: ${Primary};
  stroke: ${Primary};
  stroke-width: 2px;
  
`;

export const StyledRadio = styled.label`
  display: flex;
  width: 16px;
  height: 16px;
  background: ${Platinum};
  border-radius: 16px;
  transition: all 150ms;
  border-style: solid;
  border-width: 0px;
  box-sizing: border-box;

    ${RadioIcon} {
        visibility: ${props => props.checked ? 'visible' : 'hidden'}
    }
    &:hover{
        border-width: 1px;
    }
    
    &:active:not([hover]){
        border-width: 2px;
        border-color: #d1d1d1;
    }
    &:disabled{
        cursor: default;
        background: gray;
        color: darkgray;
        border-color: gray;
    }
`;

export const RadioLabel = styled.label`
    padding-left: 7px;
`;

export const RadioContainer = styled.div`
    display: flex;
    vertical-align: middle;
    flex-direction: row;
    align-items: center;
`;

export const RadioInput = styled.div`
    display: flex;
    
    &:hover{
        ${StyledRadio}{
            border-width: 1px;
        }
    }
    &:active:not([hover]){
        ${StyledRadio}{
            border-width: 2px;
            border-color: #d1d1d1;
        }
    }
    &:disabled{
        ${StyledRadio}{
            cursor: default;
            background: gray;
            color: darkgray;
            border-color: gray;
        }
    }
    
    ${HiddenRadio}:focus + & {
        box-shadow: 0 0 0 3px pink;
    }
`;
//#endregion

//#region RadioGroup
export const RadioGroupContainer = styled.div`
    display: flex;
    vertical-align: middle;
    flex-direction: column;
    align-items: flex-start;
    padding-top: 5px;
`;
//#endregion


//#region Textbox

export const TextboxLabel = styled.label`
  padding-right: 10px;
`;
export const TextboxInput = styled.input`
    padding: 10px;
    box-shadow: 0 0 0px 1000px ${Platinum} inset;
    border-color:${({invalid}) => (invalid ? Burnt:"#adadad")}; 
    border-radius: 4px;
    border-width: 3px;
    border-style: solid;
    transition: all 0.2s ease-in-out;
    
    &:focus {
        border-color: ${Primary};
    }
    &:invalid {
        border-color: ${Burnt};
    }
    &:disabled{
        cursor: default;
        box-shadow: 0 0 0px 1000px  #7c7c7c inset;
        color: #adadad;
        border-color: #5a5a5a;
    }
`;
export const TextboxContainer = styled.div`
    display: flex;
    vertical-align: middle;
    flex-direction: row;
    align-items: center;
    padding: 5px 0;
`;

//#endregion

//#region Button
export const BaseButton = styled.button`
    border-radius: ${({rounded}) => (rounded ? "50px":"4px")};
    background: ${Primary};
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px':'12px 30px')};
    font-weight: bold;
    color: ${({darkmode}) => (darkmode ? Platinum:Platinum)};
    font-size: 20px;
    outline: none;
    border: none;
    cursor: pointer;
    text-decoration: none;
    text-transform: ${({upper}) => (upper ? "uppercase":"none")};
    transition: all 0.2s ease-in-out;

    &:active&:not([hover]){
        background: #d1d1d1;
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
    &:hover{
        background: ${({darkmode}) => (darkmode ? Platinum:HoverPrimary)};
        color: ${({darkmode}) => (darkmode ? Dark:Platinum)};
    }
    &:disabled{
        cursor: default;
        background: gray;
        color: darkgray;
        border-color: gray;
    }
`;

export const TextButton = styled.button`
    border-radius: 50px;
    background: #1a1f23;
    white-space: nowrap;
    padding: 3px;
    font-weight: bold;
    color: ${({color}) => (color ? color:Primary)};
    font-size: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    -webkit-text-decoration: none;
    text-decoration: none;
    text-transform: none;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    border: 2px ${({color}) => (color ? color:Primary)} solid;

    &:active&:not([hover]){
        /*background: #d1d1d1;*/
        color: ${HoverPrimary};
    }
    &:hover{
        /*background: ${({darkmode}) => (darkmode ? Platinum:HoverPrimary)};*/
        border: 2px ${HoverPrimary} solid;
        color: ${Platinum};
    }
    &:disabled{
        cursor: default;
        background: gray;
        color: darkgray;
        border-color: gray;
    }
    ${props => props.pressed && css`
        border: 2px ${HoverPrimary} solid;
        background: ${({color}) => (color ? color:Platinum)};
        color: ${Dark};
    `}
`;

export const IconButton = styled.button`
    display: flex;
    background: transparent;
    padding: 0px;
    color: ${({active}) => (active ? Platinum:Primary)};
    font-size: 25px;
    outline: none;
    border: none;
    cursor: pointer;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    align-items: center;

    &:active&:not([hover]){
        color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    }
    &:hover{
        color: ${HoverPrimary};
    }
    &:disabled{
        cursor: default;
        color: darkgray;
    }
`;

export const CButton = styled.button`
    display: flex;
    background: transparent;
    padding: 0px;
    color: ${({active}) => (active ? Platinum:Primary)};
    font-size: ${({fontSize}) => (fontSize ? fontSize:"25px")};
    outline: none;
    border: none;
    cursor: pointer;
    -webkit-text-decoration: none;
    text-decoration: none;
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    align-items: center;

    &:active&:not([hover]){
        color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    }
    &:hover{
        color: ${HoverPrimary};
    }
    &:disabled{
        cursor: default;
        color: darkgray;
    }
    $pressed{
        color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
    }
    ${props => props.pressed && css`
        color: ${({darkmode}) => (darkmode ? Platinum:Dark)};
        font-size: 22px;
    `}
`;
//#endregion


export const BaseContainer = styled.div`
    display: grid;
    width: 100%;
    justify-items: stretch;
    align-items: center;
    height: inherit;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px 0;
    align-items: center;
    justify-content: center;
`;

export const UlContainer = styled.ul`
    padding: 0;
`;


export const BaseWrapper = styled.div`
    padding: 7px 0;
`;

export const HWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    justify-content: space-between;
`;

export const FieldWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`;

export const Label = styled.label`
    color: #fff;
    padding: 0 5px;
    font-size: 14px;
`;


//#region H1
export const BaseH1 = styled.h1`
    display: flex;
    margin-bottom: 10px;
    color: #53917e;
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    text-transform:  ${({upper}) => (upper ? 'uppercase':'none')};
`;
//#endregion H1


export const BaseLabel = styled.label`
    display: flex;
    color: ${Primary};
    font-size: 20px;
    font-weight: bold;
    text-align: left;
    text-transform:  ${({upper}) => (upper ? 'uppercase':'none')};
`;


const displayNone = keyframes`
    from {
        height: auto;
    }
    to {
        height: 0px;
    }
`;
export const ScrollDownContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    font-size: 50px;
    display: flex;
    flex-direction: column;
    height: ${({scrollNav}) => (scrollNav ? "0px":'auto')}; 
    align-items: center;
    animation: 2s linear 1;
    animation-name: ${({scrollNav}) => (scrollNav ? displayNone:'none')}; 
`;

const downfade = keyframes`
    0% {
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    30% {
        transform: translateY(0%);
    }
    100% {
      transform: translateY(70%);
      opacity: 0;
    }
`;

export const ScrollDownWrapper = styled.div`
    display: flex;
    opacity: ${({scrollNav}) => (scrollNav ? "0": '1')};
    color: ${Platinum};
    font-size: ${({big})=>(big ? "50px":"40px")};
    font-weight: bold;
    text-align: left;
    transition: all 0.5s linear;
    animation: 1s linear infinite;
    animation-name: ${({animated, scrollNav}) => (animated&&!scrollNav ? downfade:'none')}; 
    text-transform:  ${({upper}) => (upper ? 'uppercase':'none')};
`;

const gotopdisplayNone = keyframes`
    from {
        height: auto;
    }
    to {
        height: 0px;
    }
`;

export const GoTopContainer = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    font-size: 50px;
    flex-direction: row;
    justify-content: flex-end;
    height: ${({scrollNav}) => (!scrollNav ? "0px":'auto')}; 
    display: ${({scrollNav}) => (!scrollNav ? "none":'flex')}; 
    align-items: center;
    animation: 2s linear 1;
    cursor: pointer;
    animation-name: ${({scrollNav}) => (!scrollNav ? gotopdisplayNone:'none')}; 
`;

const gotopdownfade = keyframes`
    0% {
        opacity: 0;
    }
    20% {
        opacity: 1;
    }
    30% {
        transform: translateY(0%);
    }
    100% {
        transform: translateY(-50%);
        opacity: 0;
    }
`;

export const GoTopWrapper = styled.div`
    display: flex;
    opacity: ${({scrollNav}) => (scrollNav ? "0": '1')};
    color: ${Primary};
    font-size: ${({big})=>(big ? "50px":"40px")};
    font-weight: bold;
    text-align: left;
    padding-right: 10px;
    transition: all 0.5s linear;
    animation: 1s linear infinite;
    animation-name: ${({animated, scrollNav}) => (animated&&scrollNav ? gotopdownfade:'none')}; 
    text-transform:  ${({upper}) => (upper ? 'uppercase':'none')};
`;


export const ProgressbarContainer = styled.div` 
    height: 20px;
    width: 100%;
    background-color: ${Platinum};
    border-radius: 50px;
    transition: all 0.5s linear;
`;

export const ProgressbarFiller = styled.div` 
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: ${({completed}) => (completed ? completed+"%": "0%")};
    background-color:${({bg}) => (bg ? bg: Primary)};
    border-radius: inherit;
    text-align: right;
    transition: all 0.5s linear;
`;

export const ProgressbarLabel  = styled.span`
    padding: 5;
    color: ${Platinum};
    font-weight: bold;
    transition: all 0.5s linear;
`;

export const LoadingbarContainer = styled.div` 
    position: fixed; top: 0px; left: 0px; height: 5px; background: ${Yellow}; z-index: 2147483647;
    width: ${({completed}) => (completed ? completed+"%": "0%")};
    transition: all 400ms ease 0s; 
`;

export const LoadingbarFiller = styled.div` 
    width: 5%; opacity: 1; position: absolute; height: 100%; transition: all 400ms ease 0s; transform: rotate(3deg) translate(0px, -4px); left: ${({completed}) => (completed ? completed+"%": "0%")};
`;

export const FloatingStatusContainer = styled.div` 
    position: fixed; top: 95%; left: 0px; height: 40px; background: transparent; z-index: 2147483647;
    width: 100%;
    transition: all 400ms ease 0s; 
`;
