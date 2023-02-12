import { Observable } from 'src/helpers/observable';
import { IIngredient, Ingredient } from 'src/recipe/ingredient';
import { BreadWeight, IRecipe, Recipe } from 'src/recipe/recipe';

export interface IngredientInput {
	id: number;
	name: string;
	weight: number;
}

export interface IRecipeViewModel {
	convertedIngredients$: Observable<IIngredient[]>;
	ingredientControls$: Observable<IngredientInput[]>;
	addIngredientControl(): void;
	getIngredientControls(): IngredientInput[];
	convertWeights(breadWeight: BreadWeight): void;
	getConvertedIngredients(): IIngredient[];
}

export class RecipeViewModel implements IRecipeViewModel {
	public convertedIngredients$: Observable<IIngredient[]>;
	public ingredientControls$: Observable<IngredientInput[]>;

	private _recipe: IRecipe;
	private _ingredientID: number;

	public constructor() {
		this._recipe = new Recipe();
		this._ingredientID = 0;

		this.convertedIngredients$ = new Observable<IIngredient[]>([]);
		this.ingredientControls$ = new Observable<IngredientInput[]>([]);
		this.addIngredientControl();
	}

	public addIngredientControl(): void {
		const inputs = this.getIngredientControls();

		inputs.push({ id: this._ingredientID, name: '', weight: 0 });

		this.ingredientControls$.setValue(inputs);

		this._ingredientID++;
	}

	public getIngredientControls(): IngredientInput[] {
		return this.ingredientControls$.getValue();
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
		this._recipe.clearIngredients();

		this.ingredientControls$.getValue().forEach((ingredientInput) => {
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
