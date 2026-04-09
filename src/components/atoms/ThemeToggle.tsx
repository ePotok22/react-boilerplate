import { useCallback, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "auto";

function getInitialMode(): ThemeMode {
	if (globalThis.window === undefined) {
		return "auto";
	}

	const stored = globalThis.localStorage.getItem("theme");
	if (stored === "light" || stored === "dark" || stored === "auto") {
		return stored;
	}

	return "auto";
}

function resolveTheme(mode: ThemeMode): "light" | "dark" {
	if (mode !== "auto") {
		return mode;
	}
	const prefersDark = globalThis.matchMedia(
		"(prefers-color-scheme: dark)",
	).matches;
	return prefersDark ? "dark" : "light";
}

function applyThemeMode(mode: ThemeMode) {
	const resolved = resolveTheme(mode);

	document.documentElement.classList.remove("light", "dark");
	document.documentElement.classList.add(resolved);

	if (mode === "auto") {
		delete document.documentElement.dataset.theme;
	} else {
		document.documentElement.dataset.theme = mode;
	}

	document.documentElement.style.colorScheme = resolved;
}

export default function ThemeToggle() {
	const [mode, setMode] = useState<ThemeMode>("auto");

	useEffect(() => {
		const initialMode = getInitialMode();
		setMode(initialMode);
		applyThemeMode(initialMode);
	}, []);

	useEffect(() => {
		if (mode !== "auto") {
			return;
		}

		const media = globalThis.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => applyThemeMode("auto");

		media.addEventListener("change", onChange);
		return () => {
			media.removeEventListener("change", onChange);
		};
	}, [mode]);

	const toggleMode = useCallback(() => {
		const ORDER: ThemeMode[] = ["light", "dark", "auto"];
		const currentIdx = ORDER.indexOf(mode);
		const nextMode = ORDER[(currentIdx + 1) % ORDER.length] as ThemeMode;
		setMode(nextMode);
		applyThemeMode(nextMode);
		globalThis.localStorage.setItem("theme", nextMode);
	}, [mode]);

	const label =
		mode === "auto"
			? "Theme mode: auto (system). Click to switch to light mode."
			: `Theme mode: ${mode}. Click to switch mode.`;

	const LABEL_MAP: Record<ThemeMode, string> = {
		auto: "Auto",
		dark: "Dark",
		light: "Light",
	};

	return (
		<button
			type="button"
			onClick={toggleMode}
			aria-label={label}
			title={label}
			className="rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 font-semibold text-(--sea-ink) text-sm shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5"
		>
			{LABEL_MAP[mode]}
		</button>
	);
}
