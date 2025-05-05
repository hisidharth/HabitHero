'use client';

import { CompletionT } from "@/lib/api/models";
import { useDeleteCompletionMutation } from "@/lib/mutations/completion/delete";
import { dateToStr } from "@/lib/util/date";
import { Trash } from "lucide-react";
import { motion } from "motion/react";
import { unstable_ViewTransition as ViewTransition } from "react";

function DeleteCompletionButton({ completion }: { completion: CompletionT }) {
    const { mutate } = useDeleteCompletionMutation(completion.habitId, completion.completionId);

    return (
        <motion.button
            className="p-1 rounded hover:bg-bg-light"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
                mutate();
            }}
        >
            <Trash width={15} height={15} className="text-fg-light" />
        </motion.button>
    )
}

export default function CompletionTable({ completions }: { completions: Array<CompletionT> }) {
    return (
        <div className="rounded-xl">
            <div className="grid grid-cols-[40px_2fr_1fr_40px] text-sm text-fg-dark bg-bg-dark text-nowrap">
                <div className="flex justify-center items-center p-2 border-fg-light border-r"><p>#</p></div>
                <div className="p-2 border-r border-fg-light"><p>Time Completed</p></div>
                <div className="p-2 border-r border-fg-light"><p>XP Earned</p></div>
            </div>
            {completions.map((completion, index) => {
                const date = new Date(completion.timeCompleted);
                return (
                    <ViewTransition key={completion.completionId} name={`completion-table-row-${completion.completionId}`}>
                        <div className={`grid grid-cols-[40px_2fr_1fr_40px] text-sm text-fg-medium bg-bg-${index % 2 === 0 ? 'medium' : 'dark'}`}>
                            <div className="flex justify-center items-center p-2 border-fg-light border-r"><p>{index + 1}.</p></div>
                            <div className="p-2 border-r border-fg-light"><p>{dateToStr(date)}</p></div>
                            <div className="p-2 border-r border-fg-light text-bg-accent"><p>+{completion.xpEarned}</p></div>
                            <div className="flex justify-center items-center p-2">
                                <DeleteCompletionButton completion={completion} />
                            </div>
                        </div>
                    </ViewTransition>
                );
            })}
        </div>
    )
}