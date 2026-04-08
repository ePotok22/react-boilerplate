import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface KbdProps {
	children: ReactNode;
	className?: string;
}

export default function Kbd({ children, className }: Readonly<KbdProps>) {
	return <kbd className={cn("ds-kbd", className)}>{children}</kbd>;
}
