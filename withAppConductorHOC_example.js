import React from 'react'
import { createStore } from 'redux'
import { Provider as ReactReduxProvider } from 'react-redux'
import { creaeAppConductor } from 'AppConductor'
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { getRootReducer } from '../model/reducers'

import { noticeHandlers } from '../model/noticeHandlers'

import { composeWithDevTools } from 'redux-devtools-extension'

const withFacingDownApex = (WrappableComponent) => {
  /**
   * Setting up the history, other tooling and the store in this 
   * component, instead of outside in the file scope, are steps to 
   * help prevent scope bleed if-and-when rendering from a server.
   */
  const history = createBrowserHistory()

  const { notifyAC, setACDependencies } = creaeAppConductor()

  // Create a tools reducer that just holds tools so we can bus a
  // ...round tools via connecting to the store.  
  // Yes it's understood that this is not the academically pure way of doing things,
  // ...but chuck that! ... it works well and no need for an extra context obj.
  const toolsReducer = (state = {history, notifyAC}) => { return state }

  const topLevelStore = createStore(
    getRootReducer(toolsReducer),
    composeWithDevTools()
  )


  void setACDependencies(noticeHandlers, topLevelStore.dispatch, topLevelStore.getState)

  return (props) => (
    <ReactReduxProvider store={topLevelStore}>
      <Router history={history}>
        <WrappableComponent />
      </Router>
    </ReactReduxProvider>
  )
}

export default withFacingDownApex