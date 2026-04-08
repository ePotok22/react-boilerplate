import { useEffect } from "react";

export function usePageTitle(title: string, appName = "React Boilerplate") {
	useEffect(() => {
		const prev = document.title;
		document.title = title ? `${title} | ${appName}` : appName;
		return () => {
			document.title = prev;
		};
	}, [title, appName]);
}
