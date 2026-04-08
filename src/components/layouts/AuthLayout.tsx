interface AuthLayoutProps {
	readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
	return (
		<main className="flex min-h-screen items-center justify-center bg-base-200 px-4">
			<div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">
				{children}
			</div>
		</main>
	);
}
