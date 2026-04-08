export const THEME = {
	DARK: "dark",
	LIGHT: "light",
} as const;

export type THEME = (typeof THEME)[keyof typeof THEME];
