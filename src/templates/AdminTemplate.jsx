import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'

export const AdminTemplate = (props) => {
  return <Route exact path={props.path} render={(propsRoute) => {
    return <Fragment>
      <Sidebar/>
      <props.component {...propsRoute} />
    </Fragment>
  }} />
}