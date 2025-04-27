export default function LoginButton({ signupHint }: { signupHint?: boolean }) {
    return (
        <a href={`/auth/login?returnTo=/home${signupHint ? '&screen_hint=signup' : ''}`}>
            <button>Log in</button>
        </a>
    )
}