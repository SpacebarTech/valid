interface Options {
	required? : ( args? : any[] ) => any;
	pattern? : RegExp;
}

export const string = ( options : Options = {} ) => ( ...args ) => {
	const str = args[0];

	const required = ( () => {
		if ( typeof options.required === 'function' ) {
			return options.required( ...args );
		}

		return options.required;
	} )();

	if ( required && !str ) {
		return 'Required';
	}

	if ( options.pattern ) {
		const valid = options.pattern.test( str ) || ( !required && !str );

		if ( !valid ) {
			return 'Field has invalid characters';
		}
	}

	return true;

};
