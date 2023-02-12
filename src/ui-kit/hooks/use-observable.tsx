import { useState, useEffect } from 'react';

import { Observable } from 'src/helpers/observable';

export function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
	const [value, setValue] = useState(initialValue);

	useEffect(
		() => {
			observable$.subscribe(observer);
			return () => observable$.unsubscribe();
		},
		[observable$]
	);

	function observer(newValue: T): void {
		if (Array.isArray(newValue)) {
			return setValue([...newValue] as T);
		}

		setValue(newValue);
	}

	return value;
}
