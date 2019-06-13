export const selection = ( value ) => {
	if ( value === null || value === '' || value === undefined ) {
		return 'Required';
	}

	return true;
};
