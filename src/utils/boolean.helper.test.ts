import { describe, expect, it } from "vitest";
import { isTruthyBoolean } from "./boolean.helper";

describe("isTruthyBoolean", () => {
	it("returns true for boolean true", () => {
		expect(isTruthyBoolean(true)).toBe(true);
	});

	it("returns false for boolean false", () => {
		expect(isTruthyBoolean(false)).toBe(false);
	});

	it('returns true for string "true"', () => {
		expect(isTruthyBoolean("true")).toBe(true);
	});

	it('returns true for string "TRUE"', () => {
		expect(isTruthyBoolean("TRUE")).toBe(true);
	});

	it('returns true for string " True "', () => {
		expect(isTruthyBoolean(" True ")).toBe(true);
	});

	it('returns false for string "false"', () => {
		expect(isTruthyBoolean("false")).toBe(false);
	});

	it("returns false for numbers", () => {
		expect(isTruthyBoolean(1)).toBe(false);
		expect(isTruthyBoolean(0)).toBe(false);
	});

	it("returns false for null and undefined", () => {
		expect(isTruthyBoolean(null)).toBe(false);
		expect(isTruthyBoolean(undefined)).toBe(false);
	});
});
