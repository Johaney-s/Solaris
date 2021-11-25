import { ChangeEvent, useCallback, useState } from 'react';

// hook from seminar
const useField = (id: string, required?: boolean) => {
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);

	const error = required && touched && !value;

	return [
		value,
		{
			id,
			value,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setTouched(true), []),
			required,
			error,
			helperText: error ? 'Required' : undefined
		}
	] as const;
};

export default useField;
