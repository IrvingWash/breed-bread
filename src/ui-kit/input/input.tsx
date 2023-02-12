import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';

import * as s from './input.pcss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps): JSX.Element {
	const { className } = props;

	return (
		<input { ...props } className={ classNames(s.input, className) } />
	);
}
