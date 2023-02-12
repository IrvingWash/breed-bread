export interface IIngredient {
	id: number;
	name: string;
	defaultWeight: number;
	convertedWeight: number;
}

export class Ingredient implements IIngredient {
	public id: number;
	public name: string;
	public defaultWeight: number;
	public convertedWeight: number;

	public constructor(id: number, name: string, weight: number) {
		this.id = id;
		this.name = name;
		this.defaultWeight = weight;
		this.convertedWeight = weight;
	}
}
