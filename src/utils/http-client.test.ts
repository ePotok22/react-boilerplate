import { describe, expect, it } from "vitest";
import { isUrlSafe, sanitizeUrlParam } from "./http-client";

describe("sanitizeUrlParam", () => {
	it("removes script tags", () => {
		expect(sanitizeUrlParam('<script>alert("xss")</script>')).toBe(
			'scriptalert("xss")/script',
		);
	});

	it("removes angle brackets", () => {
		expect(sanitizeUrlParam("<div>test</div>")).toBe("divtest/div");
	});

	it("trims whitespace", () => {
		expect(sanitizeUrlParam("  hello  ")).toBe("hello");
	});

	it("returns empty string for script-only input", () => {
		expect(sanitizeUrlParam("<script></script>")).toBe("script/script");
	});
});

describe("isUrlSafe", () => {
	it("allows https URLs", () => {
		expect(isUrlSafe("https://example.com")).toBe(true);
	});

	it("allows http URLs", () => {
		expect(isUrlSafe("http://example.com")).toBe(true);
	});

	it("rejects javascript protocol", () => {
		// eslint-disable-next-line no-script-url
		expect(isUrlSafe("javascript:void(0)")).toBe(false);
	});

	it("rejects data protocol", () => {
		expect(isUrlSafe("data:text/html,<h1>hi</h1>")).toBe(false);
	});

	it("rejects invalid URLs", () => {
		expect(isUrlSafe("not-a-url")).toBe(false);
	});

	it("checks allowed domains", () => {
		expect(isUrlSafe("https://api.example.com/path", ["example.com"])).toBe(
			true,
		);
	});

	it("rejects non-allowed domains", () => {
		expect(isUrlSafe("https://evil.com/path", ["example.com"])).toBe(false);
	});
});
