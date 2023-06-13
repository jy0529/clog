// @ts-check
import { createClog, Colors } from "../source/index.js";

const prefixes = {
	test: Colors.YELLOW
}

const clog = createClog(prefixes);

clog.test('testing')

clog.info('Getting Started')

clog.error('Error: catch error!')

