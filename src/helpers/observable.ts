export type Observer<T> = (value: T) => void;

export class Observable<T> {
	private _value: T;
	private _observers: Observer<T>[] = [];

	public constructor(value: T) {
		this._value = value;
	}

	public getValue(): T {
		return this._value;
	}

	public setValue(updatedValue: T): void {
		this._value = updatedValue;

		this._notify();
	}

	public subscribe(observer: Observer<T>): void {
		this._observers.push(observer);
	}

	public unsubscribe(observer?: Observer<T>): void {
		if (observer === undefined) {
			this._observers.length = 0;

			return;
		}

		const observerElementId = this._observers.indexOf(observer);

		if (observerElementId === -1) {
			return;
		}

		this._observers.splice(observerElementId, 1);
	}

	private _notify(): void {
		for (const observer of this._observers) {
			observer(this._value);
		}
	}
}
