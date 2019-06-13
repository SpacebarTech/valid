export const validate = ( data, fields ) => {
	let allValid = 1;

	const fieldKeys  = Object.keys( fields );
	const validation = fieldKeys.reduce( ( allValidation, key ) => {
		const item  = data[key];
		const field = fields[key];

		const addedValidation = {};
		const valid = ( () => {

			// if the type is just a normal function, we can
			// just call it and return the value
			if ( typeof field.validate === 'function' ) {
				return field.validate( item, data );
			}

			// otherwise, it will have to be an array of
			// functions which we can loop through
			if ( !Array.isArray( field.validate ) ) {
				throw Error( 'field.validate must be a function or an array of functions' );
			}

			// try all the validations
			const validations  = field.validate.map( func => func( item, data ) );
			const validatedIdx = validations.findIndex( a => a === true );

			// if one of the validations has passed, we
			// can return true
			if ( validatedIdx !== -1 ) {
				return true;
			}

			// otherwise we're going to return the validation
			// with the fewest number of errors
			const leastWrong = validations.reduce( ( obj, thisValidation ) => {

				// on the first iteration, we need to default to whatever
				// validation we're looking at
				if ( !obj ) {
					return thisValidation;
				}

				// otherwise, check how many errors are in this validation
				// compared to the previously leastWrong validation
				const theseErrors = Object.keys( thisValidation );
				const thoseErrors = Object.keys( obj );

				// return this validation if it has fewer errors
				if ( theseErrors.length < thoseErrors.length ) {
					return thisValidation;
				}

				// otherwise stick to the object we have
				return obj;
			}, null );

			return leastWrong;
		} )();

		// if ( valid !== true ) {
		addedValidation[key] = valid;
		// }

		allValid &= valid; // eslint-disable-line

		return Object.assign( allValidation, addedValidation );
	}, {} );

	return allValid || validation;
};
