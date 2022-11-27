import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import "./form.css"

export const FormTemplate = (props) => {
  return <Route exact path={props.path} render={(propsRoute) => {
    return <Fragment>
      <div className="align">
        <div className="grid">
        <props.component {...propsRoute} />
        </div>
      </div>
    </Fragment>
  }} />
}