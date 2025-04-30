'use client';

import { UserT } from "@/lib/api/models";
import { LayoutList, LucideProps, Plus, Settings } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FC, useState } from "react";
import CreateHabitWindow from "../windows/habit/create";
import EditUserWindow from "../windows/user/edit";

function NavItem({ title, Icon }: { title: string, Icon: FC<LucideProps> }) {
    return (
        <motion.div
            className="p-2 w-full rounded flex gap-4 items-center hover:bg-bg-dark"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
        >
            <Icon width={15} height={15} className="text-fg-dark" />
            <p className="text-sm text-fg-dark hidden sm:block">{title}</p>
        </motion.div>
    )
}

export default function NavBar({ user }: { user: UserT }) {
    const [createHabitWindowVisible, setCreateHabitWindowVisible] = useState<boolean>(false);
    const [editUserWindowVisible, setEditUserWindowVisible] = useState<boolean>(false);

    return (
        <div className="bg-bg-medium p-2 flex flex-col justify-center sm:justify-start gap-10 sm:gap-0">
            <Link href="/home">
                <NavItem title="Overview" Icon={LayoutList} />
            </Link>
            <button onClick={() => setCreateHabitWindowVisible(true)}>
                <NavItem title="Add Habit" Icon={Plus} />
            </button>
            <button onClick={() => setEditUserWindowVisible(true)}>
                <NavItem title="Settings" Icon={Settings} />
            </button>
            <CreateHabitWindow visible={createHabitWindowVisible} setVisible={setCreateHabitWindowVisible} />
            <EditUserWindow visible={editUserWindowVisible} setVisible={setEditUserWindowVisible} user={user} />
        </div>
    )
}