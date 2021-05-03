
This is as private-ish ALPHA stage package, which is a conductor pattern implementation for javascript apps.  Can be used with React and other frameworks.

In a component based architecture, many feel that components should ONLY handle events - "NON prospective-cross-cutting events" - that are strickly within their boundries and strickly within their concern.  All other events should be handled at the app level.  Wouldn't it be nice if there was have a generalized implementation to provide for this?  

...There is: App Conductor

Components execute notify to notify the App Conductor of prospective cross-cutting events via a notice (a pojo), which must have a "TITLE" key.  

Note for the reading ahead, App Conductor has a setup function addNoticeMgtDependencies(handlers, dispatch, getState) for injecting in closure dependencies for the conductor.
 
The App Conductor handles these notices by delegating them to injected notice handlers typically named after notice titles.
 
Notice handlers are called with the notice, getState, and a self-reference to notify.
 
These handlers can do anything - yep even side-effects, but one chore that can be done is to build an action (a pojo) which is then dispatched to a store - say a redux store's reducers.  To provide for this one can inject in a redux stores (or similiar type stores) dispatch and getState methods which then the conductor can pass to notice handler if the handler functions have calling params to accept them.
 
Note, if using redux one can use conventional redux patterns and middleware such as redux-thunk or redux-saga, but it's felt that the App-Conductor with handlers provides for an extremely flexible, generalized and non-vendor approach to handling events that lead to state changes and app level activity, since it doesn't conflate an event management/handling solution with a store-state mgt solution.  
 
Note, handlers can also (recursively) call notify as part of their handling logic.

For React app developers, the file withAppConductorHOC_example.js shows and implementation of creating an higher-order-component for isomorphically tieing in your App component (or the like) to the App Conductor system.