import { Observable } from 'src/helpers/observable';
import { IIngredient, Ingredient } from 'src/recipe/ingredient';
import { BreadWeight, IRecipe, Recipe } from 'src/recipe/recipe';

export interface IngredientInput {
	id: number;
	name: string;
	weight: number;
}

export interface IRecipeViewModel {
	addIngredientInput(): void;
	getIngredientInputs(): IngredientInput[];
	convertWeights(breadWeight: BreadWeight): void;
	getConvertedIngredients(): IIngredient[];
}

export class RecipeViewModel implements IRecipeViewModel {
	public convertedIngredients$: Observable<IIngredient[]>;
	public ingredientInputs$: Observable<IngredientInput[]>;

	private _recipe: IRecipe;
	private _ingredientID: number;

	public constructor() {
		this.convertedIngredients$ = new Observable<IIngredient[]>([]);

		this.ingredientInputs$ = new Observable<IngredientInput[]>([]);
		this.addIngredientInput();

		this._recipe = new Recipe();
		this._ingredientID = 0;
	}

	public addIngredientInput(): void {
		const inputs = this.getIngredientInputs();

		inputs.push({ id: this._ingredientID, name: '', weight: 0 });

		this.ingredientInputs$.setValue(inputs);

		this._ingredientID++;
	}

	public getIngredientInputs(): IngredientInput[] {
		return this.ingredientInputs$.getValue();
	}

	public convertWeights(breadWeight: BreadWeight): void {
		this._saveIngredients();

		this._recipe.setBreadWeight(breadWeight);

		this.convertedIngredients$.setValue(this._recipe.getIngredients());
	}

	public getConvertedIngredients(): IIngredient[] {
		return this.convertedIngredients$.getValue();
	}

	private _saveIngredients(): void {
		this.ingredientInputs$.getValue().forEach((ingredientInput) => {
			this._recipe.addIngredient(
				new Ingredient(
					ingredientInput.id,
					ingredientInput.name,
					ingredientInput.weight
				)
			);
		});
	}
}
