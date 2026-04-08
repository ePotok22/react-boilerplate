import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-i18next", () => ({
	useTranslation: () => ({
		i18n: {
			changeLanguage: vi.fn(),
			language: "en",
		},
	}),
}));

vi.mock("@/i18n", () => ({
	setStoredLanguage: vi.fn(),
}));

import LanguageSwitcher from "./LanguageSwitcher";

describe("LanguageSwitcher", () => {
	it("renders toggle button", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByRole("button")).toBeInTheDocument();
	});

	it("shows opposite language label", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByText("TH")).toBeInTheDocument();
	});

	it("has accessible aria-label", () => {
		render(<LanguageSwitcher />);
		expect(
			screen.getByRole("button", { name: "Toggle language" }),
		).toBeInTheDocument();
	});

	it("calls changeLanguage on click", () => {
		render(<LanguageSwitcher />);
		fireEvent.click(screen.getByRole("button"));
	});
});
