import config from './config';
import TEMPLATE from "./template";



const validate = (options) => {
    let errorMsg = ''
    if (!errorMsg && options.submitCallback) {
        if (typeof options.submitCallback !== "function") {
            errorMsg = `回调函数submitCallback应该是一个函数`
        }
    }

    return {
        status: errorMsg ? false : true,
        msg: errorMsg,
    }
}

export default function (context, $select, options) {
    const result = validate(options)

    if (!result.status) {
        console.error(result.msg)
        return false;
    }
}
