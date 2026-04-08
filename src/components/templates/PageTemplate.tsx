interface PageTemplateProps {
	readonly children: React.ReactNode;
}

export default function PageTemplate({
	children,
}: Readonly<PageTemplateProps>) {
	return (
		<main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-8">
			{children}
		</main>
	);
}
