import React, { useEffect, useRef, useState } from 'react'
import { TooltipBalloon, TooltipWrapper } from './TooltipElements';

const Tooltip = (props) => {
    const [active, setActive] = useState(false);
    const ref = useRef();

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
        if(ref.current){
          ref.current.focus();
        }
    },[active]);
    return (
      <TooltipWrapper onClick={showTip}>
        {active && (
          <TooltipBalloon ref={ref} tabIndex="0" style={props.style} onBlur={HideTip} direction={`${props.direction || "top"}`}>
            {props.content}
          </TooltipBalloon>
        )}
        {childrenWithProps}
      </TooltipWrapper>
    );
}

export default Tooltip
