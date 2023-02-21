import React, { useEffect, useState } from 'react';
import { Platinum, LayersColors } from '../../Colors';
import { H1, ListContainer, Wrapper } from '../../Inputs';
import { TextButton } from '../../Inputs/InputsElements';

export const QuesstionsInput = function(props) {
    const [visible] = useState(props.visible?props.visible:true);
    
    return (
        visible && 
        <li onClick={()=>{props.onSelect(props.geoms);}} style={{"display":"block"}} sel={props.selected}>
            <H1 style={{"fontSize": "20px","paddingTop":"5px", "marginBottom": "5px", "color":Platinum}}>{props.children}</H1>
        </li>
    );
};

export const QuestionsList = function({locale, setFilterQuestions, tooltip, map, questions}) {
    const [visible] = useState(true);
    const [selectedItems, setSelectedItems] = useState(questions);
    const [allpressed,setAllPressed] = useState(true);

    const selectall = (e,a) => {
        if(allpressed){
            setAllPressed(false);
            setSelectedItems([]);
        }else{
            setAllPressed(true);
            setSelectedItems(questions);
        }
    }
    const select = (e) => {
        if(selectedItems.some(x=>x === e)){
            setSelectedItems(
                selectedItems.filter(a => a !== e)
              );

        }else{
            setSelectedItems([...selectedItems, e]);
        }
    }

    const onMouseEnter = (e,r) => {
        if(!r.label){
            r.label = locale && locale.questions.title
        }
        tooltip.current.showTip(e,r);
    }

    const onMouseLeave = (e,r) => {
        tooltip.current.hideTip();
    }
    
    useEffect(()=> {
        setFilterQuestions(selectedItems.map((key, i) => {
            return key.question_id
          }));
          if(selectedItems.length === questions.length){
            setAllPressed(true);
          }else{
            setAllPressed(false);
          }
    }, [selectedItems]);
    
    let items = Object.values(questions).map((r, i) => {
        return (
            <QuesstionsInput geoms={r} key={i} onSelect={select}>
                <TextButton onMouseEnter={(e) => onMouseEnter(e, r)} onMouseLeave={(e) => onMouseLeave(e, r)} pressed={selectedItems.some(x=>x === r)} color={LayersColors[i]} primary='true' darkmode='true' style={{"width":"25px"}}>{i+1}</TextButton>
            </QuesstionsInput>
        )
    });
    
    return (
        visible && <>
            <Wrapper horizontal='true' style={{"display": "flex", "margin": "10px 0px"}}></Wrapper>
            <div style={{"flex":"1", "borderWidth": "0px", "justifyContent": "center", "display": "flex", "flexDirection": "column"}}> 
            <ListContainer tabIndex={0} style={{"alignItems":"center", "display": "flex", "flexDirection": "column"}}>
            {locale && <TextButton onClick={selectall} onMouseEnter={(e) => onMouseEnter(e, {label:locale.questions.asTitle, title:locale.questions.asText})} onMouseLeave={(e) => onMouseLeave(e)} pressed={allpressed} primary='true' darkmode='true' style={{"width":"25px"}}>A</TextButton>}
            {items}
            </ListContainer>
            </div>
        </>
    );
  
};
  