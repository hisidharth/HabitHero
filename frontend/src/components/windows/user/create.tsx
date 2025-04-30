'use client';

import Button from "@/components/ui/button";
import TextBox from "@/components/ui/textbox";
import Window, { WindowFooter, WindowFooterStart, WindowSpacer } from "@/components/ui/window";
import { MaxUserNameLength } from "@/lib/api/values";
import { useCreateUserMutation } from "@/lib/mutations/user/create";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

export default function CreateUserWindow({ email }: { email: string }) {
    const { mutate, isIdle } = useCreateUserMutation();

    const [username, setUsername] = useState<string>('');
    const [usernameValid, setUsernameValid] = useState<boolean>();

    const valid = usernameValid;

    return (
        <Window visible={true} title="Complete Profile" Icon={User}>
            <WindowSpacer>
                <TextBox value={username} setValue={setUsername} maxChars={MaxUserNameLength} multiline={false} setValid={setUsernameValid} title="Username" placeholder="Username..." />
            </WindowSpacer>
            <WindowSpacer>
                <WindowFooter>
                    <WindowFooterStart>
                        <button onClick={() => { }}>
                            <div className="flex items-center gap-1 text-fg-medium">
                                <LogOut width={15} height={15} />
                                <p className="text-sm max-w-32 truncate">{email}</p>
                            </div>
                        </button>
                    </WindowFooterStart>
                    <Button title="Continue" valid={valid && isIdle} cn="bg-bg-accent text-fg-accent" onClick={() => {
                        mutate({
                            username: username,
                            email: email
                        });
                    }} />
                </WindowFooter>
            </WindowSpacer>
        </Window>
    )
}