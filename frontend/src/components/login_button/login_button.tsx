import { LogIn } from "lucide-react";

export default function LoginButton({ signupHint }: { signupHint?: boolean }) {
    return (
        <a href={`/auth/login?returnTo=/home${signupHint ? '&screen_hint=signup' : ''}`}>
            <div className="flex items-center gap-2 text-bg-dark bg-fg-accent rounded p-3">
                <LogIn width={15} height={15} className="text-bg-dark" />
                <span className="text-sm">Login</span>
            </div>
        </a>
    )
}