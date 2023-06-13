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

export const Colors = {
	BLACK: "black",
	RED: "red",
	GREEN: "green",
	YELLOW: "yellow",
	BLUE: "blue",
	CYAN: "cyan",
	MAGENTA: "magenta",
	WHITE: "white",
	GRAY: "gray",
	GREY: "grey",
	BLACK_BRIGHT: "blackBright",
	RED_BRIGHT: "redBright",
	GREEN_BRIGHT: "greenBright",
	YELLOW_BRIGHT: "yellowBright",
	BLUE_BRIGHT: "blueBright",
	CYAN_BRIGHT: "cyanBright",
	MAGENTA_BRIGHT: "magentaBright",
	WHITE_BRIGHT: "whiteBright",
}
export const createClog = (prefixes = {}) => {

    const defaultPrefixes = {
        info: Colors.CYAN,
        error: Colors.RED,
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
        const prefix = `${chalk[style ?? Colors.BLACK_BRIGHT](method)}`;
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
