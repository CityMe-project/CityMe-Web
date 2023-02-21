import React from 'react'
import { LoadingIcon, MaskContainer } from './MaskElements'

const Mask = ({fullpage, loading = true, style,  children}) => {
  return (
    <>
      <MaskContainer style={style} fullpage={fullpage?1:0}>
        {loading && <LoadingIcon/>}
        {children}
      </MaskContainer>
    </>
  )
}

export default Mask
