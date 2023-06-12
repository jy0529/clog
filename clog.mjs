import chalk from "chalk";

/**
 * 
 * @example
 *
 * import { createClog } from 'clog'
 * 
 * const prefixes = {
 *  info: 'cyan',
 *  error: 'red',
 *  success: 'green'
 * };
 * const clog = createClog(prefixes)
 *  
 * clog.info('ready') => info - ready
 * clog.success('build end.') => success - build end.
 * 
 */
export const createClog = (prefixes = {}) => {
    const defaultPrefixes = {
        info: 'cyan',
        error: 'red',
        success: 'green',
    };

    prefixes = Object.assign({}, defaultPrefixes, prefixes);

    const clog = Object.keys(prefixes).reduce((clog, method) => {
        defineMethod(clog, method, prefixes[method]);
        return clog;
    }, {});

    return new Proxy(clog, {
        get(target, method) {
            if (!target[method]) {
                defineMethod(target, method);
            } 
            return target[method];
        }
    });
}

function defineMethod(clog, method, style) {
    clog[method] = (...message) => {
        const prefix = `${chalk[style ?? 'blackBright'](method)}`;
        const sep =  '-'.padStart(6 - method.length, ' ');
        console[getConsoleMethod(method)](prefix, sep, ...message);
    }
}

function getConsoleMethod(methodName) {
    const defaultMethods = ['error', 'warn'];

    if (defaultMethods.includes(methodName)) {
        return methodName;
    } else {
        return 'log';
    }
}