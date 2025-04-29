'use client';

import { LayoutList, LucideProps, Plus, Settings } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { FC } from "react";

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

export default function NavBar() {
    return (
        <div className="bg-bg-medium p-2 flex flex-col justify-center sm:justify-start gap-10 sm:gap-0">
            <Link href="/home">
                <NavItem title="Overview" Icon={LayoutList} />
            </Link>
            <Link href="#">
                <NavItem title="Add Habit" Icon={Plus} />
            </Link>
            <Link href="#">
                <NavItem title="Settings" Icon={Settings} />
            </Link>
        </div>
    )
}