import classNames from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';

import * as s from './button.pcss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

export function Button(props: ButtonProps): JSX.Element {
	const { text, className } = props;

	return (
		<button
			{ ...props }
			className={ classNames(s.button, className) }
		>
			{ text }
		</button>
	);
}
