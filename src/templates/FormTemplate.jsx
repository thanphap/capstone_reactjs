import { Fragment } from 'react'
import { Route } from 'react-router-dom'

export const FormTemplate = (props) => {
  return <Route exact path={props.path} render={(propsRoute) => {
    return <Fragment>
      <props.component {...propsRoute} />
    </Fragment>
  }} />
}