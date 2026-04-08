import { useTranslation } from "react-i18next";
import { LANGUAGE } from "@/enums/language";
import { setStoredLanguage } from "@/i18n";

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();

	const toggle = () => {
		const next = i18n.language === LANGUAGE.EN ? LANGUAGE.TH : LANGUAGE.EN;
		i18n.changeLanguage(next);
		setStoredLanguage(next);
		document.documentElement.lang = next;
	};

	return (
		<button
			type="button"
			onClick={toggle}
			className="rounded-xl p-2 text-(--sea-ink-soft) transition hover:bg-(--link-bg-hover) hover:text-(--sea-ink)"
			aria-label="Toggle language"
		>
			<span className="font-semibold text-sm">
				{i18n.language === LANGUAGE.EN ? "TH" : "EN"}
			</span>
		</button>
	);
}
