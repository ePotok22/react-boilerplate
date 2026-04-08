import gsap from "gsap";
import { type DependencyList, type RefObject, useEffect, useRef } from "react";

interface UseGSAPConfig {
	scope?: RefObject<Element | null>;
	dependencies?: DependencyList;
}

interface UseGSAPReturn {
	context: React.RefObject<gsap.Context | null>;
	contextSafe: <T extends (...args: unknown[]) => unknown>(fn: T) => T;
}

export function useGSAP(
	callbackOrConfig?: (() => void) | UseGSAPConfig,
	config?: UseGSAPConfig,
): UseGSAPReturn {
	const ctxRef = useRef<gsap.Context | null>(null);

	const isConfig = (c: unknown): c is UseGSAPConfig =>
		c !== null && typeof c === "object" && !Array.isArray(c);

	let callback: (() => void) | undefined;
	let resolved: UseGSAPConfig | undefined;

	if (typeof callbackOrConfig === "function") {
		callback = callbackOrConfig;
		resolved = isConfig(config) ? config : undefined;
	} else if (isConfig(callbackOrConfig)) {
		resolved = callbackOrConfig;
	}

	const deps = resolved?.dependencies ?? [];
	const scope = resolved?.scope;

	useEffect(() => {
		const ctx = gsap.context(() => {
			callback?.();
		}, scope?.current ?? undefined);

		ctxRef.current = ctx;

		return () => {
			ctx.revert();
		};
		// biome-ignore lint/correctness/useExhaustiveDependencies: dependency array is dynamically passed by the consumer
	}, deps);

	return {
		context: ctxRef,
		contextSafe: <T extends (...args: unknown[]) => unknown>(fn: T): T => {
			return ((...args: unknown[]) => {
				const ctx = ctxRef.current;
				if (ctx) {
					let result: unknown;
					ctx.add(() => {
						result = fn(...args);
					});
					return result;
				}
				return fn(...args);
			}) as T;
		},
	};
}
