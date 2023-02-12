import React from 'react';

import { Select } from '@ui-kit/components/select/select';

import { BreadWeight } from '../../recipe';

import * as s from './bread-weight-select.pcss';
import classNames from 'classnames';

interface BreadWeightSelectProps {
	className?: string;
	weight: BreadWeight;
	options: string[];
	onWeightChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function BreadWeightSelect(props: BreadWeightSelectProps): JSX.Element {
	return (
		<div className={ classNames(s.breadWeightSelect, props.className) }>
			<label htmlFor='target-weight'>Target bread weight</label>
			<Select
				name={ 'target-weight' }
				value={ String(props.weight) }
				options={ props.options }
				changeHandler={ props.onWeightChange }
			/>
		</div>
	);
}
