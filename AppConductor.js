
export const AppConductor = () => {
    let dependencies = {}
    let debugFlags = {
        useDebug: false,
        logNotice: false,
        logPkg: false,
        logError: false,
    }

    const setACDependencies = (handlers, dispatch, getState) => {
        dependencies.handlers = handlers
        dependencies.dispatch = dispatch
        dependencies.getState = getState
    }
    const setACDebugFlags = (useDebug, logNotice, logPkg, logError) => {
        debugFlags.useDebug = useDebug
        debugFlags.logNotice = logNotice
        debugFlags.logPkg = logPkg
        debugFlags.logError = logError
    }

    const notifyAC = async (notice) => {
        const { handlers, dispatch, getState } = dependencies
        if (debugFlags.useDebug && debugFlags.logNotice) {
            console.log(">>> @notifyAC: Notice: ", notice)
        }
        if (handlers[notice.TITLE]) {
            const pkg = await handlers[notice.TITLE](notice, dispatch, getState, notify)
            if (debugFlags.useDebug && debugFlags.logPkg) {
                console.log(">>> @notifyAC: Returned Pkg: ", pkg)
            }
            if ( pkg?.doDispatch && typeof pkg?.action === 'object') {
                dispatch(pkg.action) 
            }
            return pkg
        } 
        else {
            if (debugFlags.useDebug && sdebugFlags.logError) {
                console.error(">>> @notifyAC: HANDLER NOT FOUND for: ", notice.TITLE, notice)
            }
        }
    }

    return { notifyAC, setACDependencies, setACDebugFlags }
} 
