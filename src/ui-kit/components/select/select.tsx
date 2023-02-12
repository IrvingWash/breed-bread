import React from 'react';

interface SelectProps {
	options: string[];
	changeHandler(event: React.ChangeEvent<HTMLSelectElement>): void;
	name?: string;
	value?: string | number,
	defaultValue?: string | number;
	className?: string;
}

export function Select(props: SelectProps): JSX.Element {
	const {
		options,
		changeHandler,
		name,
		value,
		className,
	} = props;

	return (
		<select
			name={ name }
			value={ value }
			className={ className }
			onChange={ changeHandler }
		>
			{ renderOptions() }
		</select>
	);

	function renderOptions(): JSX.Element[] {
		return options.map((option) => (
			<option key={ option } value={ option }>{ option }</option>
		));
	}
}
