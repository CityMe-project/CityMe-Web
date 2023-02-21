import React from 'react'
import { Button } from '../../Inputs'
import {Form, FormH1, FormInput, IconLink} from '../SurveyElements';
import { BiRefresh } from 'react-icons/bi';

function Login({
    set,
    values,
    handle,
    withCode,
    onReload,
    onSubmit,
    disabled,
    data
}) {
  return (
    <>
      <Form onSubmit={onSubmit}>
          <FormH1>{data.title}
          {
          (() => {
            if (withCode) {
              return <IconLink onClick={onReload}><BiRefresh /></IconLink>
            }
          })()
          }
          </FormH1>
          <FormInput disabled={withCode?true:disabled}  autocomplete="off" required placeholder={data.label.email} name="email" type='email' value={values.email} onChange={handle}/>
          {
          (() => {
            if (withCode) {
              return <FormInput disabled={disabled} required placeholder={data.label.code} name="code" type='text' value={values.code} onChange={handle}/>
            }
          })()
          }
          <Button disabled={disabled} type='submit' big={1} darkmode={1} primary={1} >{data.label.enter}</Button>
        </Form>
    </>
  )
}

export default Login
