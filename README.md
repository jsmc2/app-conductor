
This is as private-ish ALPHA stage package (meaning no guarantee it will work), which is a conductor pattern implementation for javascript apps.  Can be used with React and other frameworks.

In a component based architecture, many feel that components should ONLY handle events - "NON prospective-cross-cutting events" - that are strickly within their boundries and strickly within their concern.  All other events should be handled at the app level.  Wouldn't it be nice if there was have a generalized implementation to provide for this?  

...There is: App Conductor.

Components execute notify to notify the App Conductor of prospective cross-cutting events via a notice (a pojo), which must have a "TITLE" key.  

Note for the reading ahead, App Conductor has a setup function addNoticeMgtDependencies(handlers, dispatch, getState) for injecting in closure dependencies for the conductor.

The App Conductor handles notice, which are simple POJOs.

Notices are meant to convey information about a) events in the view - or from anywhere in the app, or b) requests for action. 

Notices about events should have this general structure: {TITLE: "Unique PAST-TENSED snake case title about what happend" (it should only describe what happened, not what should be done!), O
there optional properties about the details of the event and its context.

Notices for requests have the same structure but the TITLE property is instructive, for example "Yada_Is_Reqested".  Note, the idea of "requested" and not "demanded" is a key idea of the conductor pattern.  Just like a symphony orchestra, players never demand anything from the conductor! 

Notices are sent to the App Conductor from the view or wherever in the app by the function notifyAC(notice)

The App Conductor handles these notices by delegating them to injected notice handlers typically named after notice titles.
 
Notice handlers are called with the notice and an "accessories" object, which can be set with whatever properties you want on initialization, for example Redux's dispatch and getState functions.  Furthermore the notifyAC function is added to accessories.  Hence notice hander's should have a declaration like this: function some_handler_named_after_a_notice_title(notice, ac) {...}.  Note "ac" here is short for accessories (and also app-conductor).
 
These handlers can do anything - yep even side-effects.  One common chore - if one is using a Redux store - is to build an action (a pojo) which can then be dispatched to the the Redux store's reducers.
 
Redux users typically conventional redux patterns and middleware such as redux-thunk or redux-saga, and nothing wrong with that, but it's felt that the App-Conductor with handlers provides for an extremely flexible, generalized and non-vendor approach to handling events that lead to state changes and app level activity, since it doesn't conflate an event management/handling solution with a store-state mgt solution.  
 
Note, handlers can also (recursively) call notify as part of their handling logic.

For React app developers, the file withAppConductorHOC_example.js shows an implementation of creating an higher-order-component for isomorphically tieing in your App component (or the like) to the App Conductor system.
