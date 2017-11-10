export const immutableNestedGetIn = (immutable_object, getInPath, fallbackResponse) =>{
    // if (!immutable_object) {
    //     return fallbackResponse;
    // }
    // for (let i = 0; i < getInPath.length; i++) {
    //     if (i === 0) {
    //         if (!immutable_object.has(getInPath[0]) || !immutable_object.get(getInPath[0])) {
    //             return fallbackResponse;
    //         }
    //     }
    //     const check = getInPath.slice(0,i+1);
    //     if (!immutable_object.hasIn(check) || !immutable_object.getIn(check)) {
    //         return fallbackResponse;
    //     }
    // }
    // return immutable_object.getIn(getInPath);
    try {
        return immutable_object.getIn(getInPath);
    }
    catch (err) {
        return fallbackResponse;
    }
};