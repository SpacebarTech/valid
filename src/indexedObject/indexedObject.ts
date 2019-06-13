export const indexedObject = childrenValidation => ( obj, unit ) => {
	let allValid = 1;

	const indexes = Object.keys( obj );
	const validation = indexes.reduce( ( validationObj, index ) => {
		const item = obj[index];

		const validations     = Object.keys( childrenValidation );
		const childValidation = validations.reduce( ( allChildValidation, key ) => {
			const validate       = childrenValidation[key];
			const childValidated = {};

			childValidated[key] = validate( item[key], unit, item );
			allValid &= childValidated[key]; // eslint-disable-line

			return Object.assign( allChildValidation, childValidated );
		}, {} );

		const addedValidation = {};
		addedValidation[index] = childValidation;

		return Object.assign( validationObj, addedValidation );
	}, {} );

	return allValid || validation;
};
