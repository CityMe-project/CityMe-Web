import React, { forwardRef, useEffect, useRef, useImperativeHandle, useState } from 'react'
import { TooltipBalloon, TooltipWrapper } from '../../Tooltip/TooltipElements';
import { Wrapper, Field  } from '../../Inputs';
import { Dark } from '../../Colors';

const Tooltip = forwardRef((props, ref) => {
    const [active, setActive] = useState(false);
    const [value, setValue] = useState(false);
    const [label, setLabel] = useState("Question");
    const [el, setEl] = useState();
    const reft = useRef();
    const [language] = useState(localStorage.getItem("language")?localStorage.getItem("language"):"en");
    const content = 
        <Wrapper style={{"padding":"10px"}} >
          <Field align="top" style={{"fontSize": "15px", "color":Dark}} type='displayfield' label={label}>{value}</Field>
        </Wrapper>;

    useImperativeHandle(ref, (abc) => ({
        showTip(el, record){
            if(!active){
                setEl(el);
                if(record.label){
                    setLabel(record.label);
                }else{
                    setLabel("Question");
                }
                setValue(language==="pt"?(record.title_pt?record.title_pt:record.title):record.title);
                setActive(true);
            }
        },
        hideTip(){
            setActive(false);
        }
    }));
  
    const showTip = () => {
      if(!active){
        setActive(true);
      }
    };
    const HideTip = () => {
      setActive(false);
    };
    const childrenWithProps = React.Children.map(props.children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { showTip, HideTip });
      }
      return child;
    });
    useEffect(()=>{
        if(reft.current){
            var BoundingClientRect = el.target.getBoundingClientRect();
            reft.current.style.setProperty("top",(BoundingClientRect.height/2)+BoundingClientRect.y+"px");
            reft.current.style.setProperty("left",(BoundingClientRect.width)+BoundingClientRect.x+"px");
        }
    },[active]);
    return (
      <TooltipWrapper>
        {active && (
          <TooltipBalloon ref={reft} tabIndex="0" style={props.style} direction={`${props.direction || "top"}`}>
            {content}
          </TooltipBalloon>
        )}
        {childrenWithProps}
      </TooltipWrapper>
    );
});

export default Tooltip
