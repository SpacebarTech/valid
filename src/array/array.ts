import { hasProperty } from '@jetstech/utils';

interface Options {
	minLength? : number | ( ( form : any, val : number ) => any );
	noDuplicates? : number;
}

const array = ( options : Options = {} ) => { // eslint-disable-line

	// this function is used as a couried
	// function around each of the methods
	// returned below to avoid repeated logic
	const applyOptions = additionalFunc => ( val : number, form ) => {
		if ( !Array.isArray( val ) ) {
			throw new Error( `First parameter "val" must be array. Instead found ${val}` );
		}

		if ( hasProperty( 'minLength', options ) ) {
			let { minLength } = options;

			if ( typeof minLength === 'function' ) {
				minLength = minLength( form, val );
			}

			if ( val.length < minLength ) {
				return `Must add at least ${minLength} items`;
			}
		}

		if ( options.noDuplicates ) {
			const createdItems = {};
			let hasDuplicates  = false;

			val.forEach( ( value ) => {
				const entry = value[options.noDuplicates];

				if ( createdItems[entry] ) {
					hasDuplicates = true;

					return;
				}

				createdItems[entry] = true;
			} );

			if ( hasDuplicates ) {
				return 'Remove duplicates';
			}
		}

		return additionalFunc( val );
	};

	return {
		items : validator => applyOptions( ( val ) => {

			let allValid = true;
			const validationObject = {};
			val.forEach( ( value, i ) => {
				const valid = validator( value );

				// single = because reasons.
				// don't change it.
				if ( valid != true ) { // eslint-disable-line
					allValid = false;

					validationObject[i] = valid;
				}

			} );

			if ( allValid ) {
				return true;
			}

			return validationObject;
		} ),
	};
};
