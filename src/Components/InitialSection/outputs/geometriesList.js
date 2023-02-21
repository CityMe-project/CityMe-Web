import React, { useState } from 'react';
import { ListContainer, Wrapper } from '../../Inputs';
import { ScrollbarWrapper } from '../../Survey/SurveyElements';
import { CButton } from '../../Inputs/InputsElements';


export const GeometryInput = function(props) {
    const [visible] = useState(props.visible?props.visible:true);
    
    return (
        visible && 
        <li style={{"display":"block"}}>
            <CButton onClick={()=>{props.onSelect(props.surveyid);}} darkmode={1} pressed={props.selected} fontSize="20px" style={{"justifyContent":"center","width":"163px","paddingTop":"5px", "marginBottom": "5px"}}>{props.children}</CButton>
        </li>
    );
};

export const GeometryList = function({locale, setSelectedSurvey, map, surveys, onChange}) {
    const [visible] = useState(true);
    const [selectedItem, setSelectedItem] = useState();
  
    const select = (e) => {
        if(e !== selectedItem){
            setSelectedSurvey(surveys[e]);
            setSelectedItem(e);
        }
    }
    
    let items = Object.keys(surveys).map((key, i) => {
        return (
            <GeometryInput surveyid={key} survey={surveys[key]} key={i} selected={key==selectedItem?1:0} onSelect={select}>
               {locale.survey} {i+1}
            </GeometryInput>
        )
    });

    return (
        visible && <>
            <Wrapper horizontal='true' style={{"display": "flex", "margin": "10px 0px"}}></Wrapper>
            <ScrollbarWrapper style={{"paddingLeft":"8px","borderWidth": "0px"}}> 
            <ListContainer tabIndex={0} style={{"display":"flex","flexDirection": "column","alignItems":"center"}}>
            {items}
            </ListContainer>
            </ScrollbarWrapper>
        </>
    );
  
};
  