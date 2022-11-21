import { Fragment } from 'react'
import { Route } from 'react-router-dom'

export const FormTemplate = (props) => {
  return <Route exact path={props.path} render={(propsRoute) => {
    return <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-6">
          </div>
          <div className="col-6">
            <props.component {...propsRoute} />
          </div>
        </div>
      </div>
    </Fragment>
  }} />
}