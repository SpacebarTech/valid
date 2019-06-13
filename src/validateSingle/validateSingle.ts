import { validate } from '../';

interface Values {
	singleField? : {
		validate? : any;
	};
}

export const validateSingle = ( datum, validation ) => {
	// this next part seems like overkill
	// but is necessary to leverage the
	// validate function
	// ? refactor validate method to support this
	// ? use case?
	const values : Values = {};
	const fields : Values = {
		singleField : {},
	};

	values.singleField = datum;
	fields.singleField.validate = validation;

	// validate the item
	return validate( values, fields );
};
