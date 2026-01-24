import { createContext } from 'svelte';

export class ContentHeaderState {
	#title = $state('');

	get title() {
		return this.#title;
	}

	set title(value: string) {
		this.#title = value;
	}
}

export const [getContentHeaderCTX, setContentHeaderCTX] = createContext<ContentHeaderState>();

export const mountContentHeaderCTX = () => {
	setContentHeaderCTX(new ContentHeaderState());
};
