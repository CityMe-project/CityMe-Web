import { StatusContainer, StatusLabel, StatusWrapper } from "./StatusElements"
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'
import { BiMessageRoundedError, BiRevision } from 'react-icons/bi'
import { useState, forwardRef, useImperativeHandle } from "react";

//https://jasonwatmore.com/post/2020/02/17/react-alert-toaster-notifications
//https://github.com/vaheqelyan/react-awesome-popover
//https://codesandbox.io/s/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-forked-3kzx85?file

export const statusType = {
    success: 'success',
    error: 'error',
    info: 'info',
    warning: 'warning'
}

const Status = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);
    const [fullOpacity, setFullOpacity] = useState(true);
    const [toogleAnimation, setToogleAnimation] = useState(true);
    let hideTimer;
    let stopAnimationTimer;

    useImperativeHandle(ref, (a) => ({
        show(type, message, duration = 5000, loading = false) {
            setMessage(message);
            setType(type);
            setLoading(duration===0?true:loading);
            setToogleAnimation(true);
            if(hideTimer){
                clearTimeout(stopAnimationTimer); 
            }
            stopAnimationTimer = setTimeout(() => {
                setToogleAnimation(false);
            }, ((duration/4) === 0 ?2500:(duration/4)));
            
            setVisible(true);
            if(duration === 0){
                return;
            }
            if(hideTimer){
                clearTimeout(hideTimer); 
            }

            hideTimer = setTimeout(() => {
                hide();
            }, duration);
        },
        isVisible() {
           return visible;
        },
    }));

    const hide = () =>{
        setFullOpacity(false);
        setTimeout(() => {
            setVisible(false);
            setFullOpacity(true);
        }, 250);
    }

    if(!visible){
        return null;
    }
    return(
        <StatusContainer>
           <StatusWrapper style={props.style} loading={loading?1:0} type={type} toogle={toogleAnimation} fullOpacity={fullOpacity}>
                {(() => {
                    if(type === statusType.warning) {
                        return <FiAlertCircle/>
                    }else if(type === statusType.error) {
                        return <FiAlertTriangle/>
                    }else if(type === statusType.info) {
                        return loading?<BiRevision/>:<BiMessageRoundedError/>
                    }else {
                        return <FiCheckCircle/>
                    }
                })()}
                <StatusLabel>{message}</StatusLabel>
            </StatusWrapper>
        </StatusContainer>
    )
  });
  
  Status.defaultPros = {
    type: 'error'
  }

  export default Status
  