/**
 * Valid
 *
 * First, import everything into the `valid` namespace and
 * export as default so that the user can do the following:
 *
 *   import valid from "@jetstech/valid"
 *
 * Then export the remaining members so that the user can
 * also do:
 *
 *   import { object, validate } from "@jetstech/valid";
 */

import * as valid from './src/index';

export default valid;
export * from './src/index';
