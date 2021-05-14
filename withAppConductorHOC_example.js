import React from 'react'
import { createStore } from 'redux'
import { Provider as ReactReduxProvider } from 'react-redux'
import { creaeAppConductor } from 'AppConductor'
import { noticeHandlers } from '../model/noticeHandlers'
import { composeWithDevTools } from 'redux-devtools-extension'

const withAppDecoration = (WrappableComponent) => {

  const { notifyAC, setACDependencies } = creaeAppConductor()

  /**
    * Create a tools reducer that just holds tools so we can bus
    * around tools via connecting to the store.  
    * 
    * Yes it's understood that this is not the purist way of doing things,
    * but chuck that!  It works well and no need for an extra context obj or 
    * import statements.  Furthermore it allows the tools to be injected in as
    * params to a component usining mapStateToProps, rather thn being a closure.
    */
  const toolsReducer = (state = {history, notifyAC}) => { return state }

  const topLevelStore = createStore(
    getRootReducer(toolsReducer),
    composeWithDevTools()
  )

  void setACDependencies(noticeHandlers, {dispatch: topLevelStore.dispatch, getState: topLevelStore.getState})

  return (props) => (
    <ReactReduxProvider store={topLevelStore}>
      <WrappableComponent />
    </ReactReduxProvider>
  )
}

export default withAppDecoration