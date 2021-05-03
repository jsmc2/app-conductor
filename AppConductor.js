
export const NoticeMgtModule = (useDebug, logNotice, logPkg, logError) => {
    let dependencies = {}
    let debugFlags = {
        useDebug: false,
        logNotice: false,
        logPkg: false,
        logError: false,
    }

    const setDependencies = (handlers, dispatch, getState) => {
        dependencies.handlers = handlers
        dependencies.dispatch = dispatch
        dependencies.getState = getState
    }
    const setDebugFlags = (useDebug, logNotice, logPkg, logError) => {
        debugFlags.useDebug = useDebug
        debugFlags.logNotice = logNotice
        debugFlags.logPkg = logPkg
        debugFlags.logError = logError
    }

    const notify = async (notice) => {
        const { handlers, dispatch, getState } = dependencies
        if (debugFlags.useDebug && debugFlags.logNotice) {
            console.log(">>> @notify: Notice: ", notice)
        }
        if (handlers[notice.TITLE]) {
            const pkg = await handlers[notice.TITLE](notice, dispatch, getState, notify)
            if (debugFlags.useDebug && debugFlags.logPkg) {
                console.log(">>> @notify: Returned Pkg: ", pkg)
            }
            if ( pkg?.doDispatch && typeof pkg?.action === 'object') {
                dispatch(pkg.action) 
            }
            return pkg
        } 
        else {
            if (debugFlags.useDebug && sdebugFlags.logError) {
                console.error(">>> @notify: HANDLER NOT FOUND for: ", notice.TITLE, notice)
            }
        }
    }

    return { notify, addNoticeMgtDependencies }
} 
