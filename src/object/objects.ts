export const object = validations => ( ...args ) => {
	const data = args[0];

	let allValid = 1;

	const validationKeys = Object.keys( validations );
	const validation     = validationKeys.reduce( ( allValidation, key ) => {
		const item     = data[key];
		const validate = validations[key];

		const addedValidation = {};
		const childArgs       = ( [item] ).concat( args );
		const valid = validate( ...childArgs );

		// if ( valid !== true ) {
		addedValidation[key] = valid;
		// }

		allValid &= valid; // eslint-disable-line

		return Object.assign( allValidation, addedValidation );
	}, {} );

	return allValid || validation;
};
