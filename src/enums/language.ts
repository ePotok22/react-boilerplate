export const LANGUAGE = {
	EN: "en",
	TH: "th",
} as const;

export type LANGUAGE = (typeof LANGUAGE)[keyof typeof LANGUAGE];
