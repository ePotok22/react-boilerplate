import { cn } from "@/utils/cn";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
	alt?: string;
	className?: string;
	fallback?: string;
	size?: AvatarSize;
	src?: string;
	status?: "online" | "offline" | "busy" | "away";
}

const SIZE_MAP: Record<AvatarSize, string> = {
	lg: "ds-avatar-lg",
	md: "",
	sm: "ds-avatar-sm",
	xl: "ds-avatar-xl",
	xs: "ds-avatar-xs",
};

const STATUS_MAP: Record<string, string> = {
	away: "ds-avatar-status-away",
	busy: "ds-avatar-status-busy",
	offline: "ds-avatar-status-offline",
	online: "ds-avatar-status-online",
};

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((w) => w[0])
		.filter(Boolean)
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

export default function Avatar({
	alt = "",
	className,
	fallback,
	size = "md",
	src,
	status,
}: Readonly<AvatarProps>) {
	const initials = fallback ? getInitials(fallback) : "?";

	return (
		<div className={cn("ds-avatar", SIZE_MAP[size], className)}>
			{src ? (
				<img
					src={src}
					alt={alt || fallback || "avatar"}
					loading="lazy"
					className="ds-avatar-img"
				/>
			) : (
				<span className="ds-avatar-fallback">{initials}</span>
			)}
			{status && (
				<span className={cn("ds-avatar-status", STATUS_MAP[status])} />
			)}
		</div>
	);
}
