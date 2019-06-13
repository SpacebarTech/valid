interface Options {
	allowFloat? : boolean;
	required? : any;
}

export const number = ( options : Options = {} ) => ( val ) => {
	if ( options.allowFloat && /((?:[0-9]+)?\.?[0-9]+)/.test( val ) ) {
		return true;
	}
	// we have to use != instead of !== because
	// '10' != 10 evaluates to false
	// but
	// '10' !== 10 evaulates to true
	if ( typeof val !== 'number' && parseInt( val, 10 ) != val ) { // eslint-disable-line
		return 'Must be a number';
	}

	if ( options.required && ( !val && val !== 0 ) ) {
		return 'Required';
	}

	return true;
};
