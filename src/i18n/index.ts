import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import enCommon from "./locales/en/common.json";
import enDashboard from "./locales/en/components/dashboard.json";
import enFooter from "./locales/en/components/footer.json";
import enHeader from "./locales/en/components/header.json";
import enShowcase from "./locales/en/components/showcase.json";
import enErrors from "./locales/en/pages/errors.json";
import enHome from "./locales/en/pages/home.json";
import thCommon from "./locales/th/common.json";
import thDashboard from "./locales/th/components/dashboard.json";
import thFooter from "./locales/th/components/footer.json";
import thHeader from "./locales/th/components/header.json";
import thShowcase from "./locales/th/components/showcase.json";
import thErrors from "./locales/th/pages/errors.json";
import thHome from "./locales/th/pages/home.json";
import { LANGUAGE } from "@/enums/language";

const STORAGE_KEY = "language";

function getStoredLanguage(): LANGUAGE {
	if (globalThis.window === undefined) {
		return LANGUAGE.EN;
	}
	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored === LANGUAGE.TH) {
		return LANGUAGE.TH;
	}
	return LANGUAGE.EN;
}

export function setStoredLanguage(lang: LANGUAGE) {
	localStorage.setItem(STORAGE_KEY, lang);
}

i18next.use(initReactI18next).init({
	defaultNS: "common",
	fallbackLng: LANGUAGE.EN,
	interpolation: {
		escapeValue: false,
	},
	lng: getStoredLanguage(),
	ns: ["common", "header", "footer", "dashboard", "showcase", "home", "errors"],
	resources: {
		[LANGUAGE.EN]: {
			common: enCommon,
			dashboard: enDashboard,
			errors: enErrors,
			footer: enFooter,
			header: enHeader,
			home: enHome,
			showcase: enShowcase,
		},
		[LANGUAGE.TH]: {
			common: thCommon,
			dashboard: thDashboard,
			errors: thErrors,
			footer: thFooter,
			header: thHeader,
			home: thHome,
			showcase: thShowcase,
		},
	},
});

export { getStoredLanguage };
export default i18next;
