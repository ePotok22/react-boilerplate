import { AlertOctagon, RefreshCw } from "lucide-react";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

export default class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { error: null, hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { error, hasError: true };
	}

	componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
		// Intentionally empty: error state is handled by getDerivedStateFromError.
		// Override this method in a subclass to log errors to an external service.
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
					<div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-error/10">
						<AlertOctagon size={40} className="text-error" />
					</div>
					<h1 className="mb-2 font-bold text-(--sea-ink) text-2xl">
						Something went wrong
					</h1>
					<p className="mb-6 max-w-md text-(--sea-ink-soft) text-sm">
						An unexpected error occurred. Please try refreshing the page.
					</p>
					{this.state.error && (
						<div className="mb-6 max-w-md overflow-hidden rounded-xl border border-error/15 bg-error/5 p-3">
							<p className="truncate font-mono text-error/80 text-xs">
								{this.state.error.message}
							</p>
						</div>
					)}
					<button
						type="button"
						className="ds-btn btn-primary gap-2"
						onClick={() => {
							this.setState({ error: null, hasError: false });
							globalThis.location.reload();
						}}
					>
						<RefreshCw size={16} />
						Refresh Page
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
