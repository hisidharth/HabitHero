'use client';

import { CompletionT, HabitT } from "@/lib/api/models";
import { useCreateCompletionMutation } from "@/lib/mutations/completion/create";
import { Check, Settings } from "lucide-react";
import { motion, useAnimate } from "motion/react";
import { useEffect, useState, unstable_ViewTransition as ViewTransition } from "react";
import ProgressBar from "../progess_bar/progress_bar";
import EditHabitWindow from "../windows/habit/edit";

import Link from "next/link";
import './habit_card.css';

function LogCompletionButton({ habit }: { habit: HabitT }) {
    const { mutateAsync, reset, isIdle, isPending } = useCreateCompletionMutation();

    const [scope, animate] = useAnimate();
    const [animationPlayed, setAnimationPlayed] = useState<boolean>(false);

    useEffect(() => {
        if (isPending && !animationPlayed) {
            const clickAnimation = async () => {
                await animate(scope.current, {
                    y: ['0px', '-10px', '0px', '-10px', '0px'],
                }, { duration: 0.5, ease: 'easeOut' });
            }

            setAnimationPlayed(true);
            clickAnimation();
        }

        else if (!isPending && animationPlayed) {
            setAnimationPlayed(false);
        }

    }, [isPending, animationPlayed]);

    return (
        <motion.button
            ref={scope}
            className={`${isIdle ? 'bg-bg-accent' : 'bg-bg-accent'} text-fg-accent text-xs rounded p-2`}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isIdle}
            onClick={async () => {
                await mutateAsync({ habitId: habit.habitId });
                reset();
            }}
        >
            <Check width={15} height={15} className="text-fg-accent" />
        </motion.button>
    )
}

export default function HabitCard({ habit, completions, disableLog }: { habit: HabitT, completions?: Array<CompletionT>, disableLog: boolean }) {
    const [editWindowVisible, setEditWindowVisible] = useState<boolean>(false);

    const numCompletions = completions?.length ?? 0;
    const complete = numCompletions >= habit.frequency;

    return (
        <ViewTransition name={`habit-card-${habit.habitId}`}>
            <div className={`flex flex-col gap-5 p-6 w-full rounded-md bg-bg-medium`}>
                <div className="flex grow items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={`/home/habit/${habit.habitId}`}>
                            <span className="text-fg-dark font-bold">{habit.habitName}</span>
                        </Link>
                        <span className="text-fg-medium text-xs">{habit.category}</span>
                    </div>
                    <div className="relative z-10">
                        <motion.button
                            className="bg-bg-light p-1 rounded hover:bg-bg-dark"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditWindowVisible(!editWindowVisible)}
                        >
                            <Settings width={15} height={15} className="text-fg-light" />
                        </motion.button>
                        <EditHabitWindow visible={editWindowVisible} setVisible={setEditWindowVisible} habit={habit} />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <ProgressBar value={numCompletions / habit.frequency} />
                </div>
                <div className="flex grow items-center justify-between">
                    <div className="flex items-center gap-3">
                        {disableLog ? (
                            <div className="bg-bg-light text-fg-accent text-xs rounded p-2">
                                <Check width={15} height={15} className="text-fg-accent" />
                            </div>
                        ) : (
                            <LogCompletionButton habit={habit} />
                        )}
                        <span className="text-xs">
                            {numCompletions < habit.frequency ? (
                                <span className="text-fg-medium">{habit.frequency - numCompletions} time(s) to go!</span>
                            ) : (numCompletions === habit.frequency) ? (
                                <motion.div
                                    initial={{ y: '0px' }}
                                    animate={{
                                        scale: ['100%', '110%', '100%'],
                                        y: ['0px', '-50px', '0px', '-10px', '0px', '-2px', '0px']
                                    }}
                                    transition={{
                                        duration: 1,
                                        yoyo: Infinity,
                                        ease: 'easeOut'
                                    }}
                                >
                                    <span className="text-fg-dark">You did it!</span>
                                </motion.div>
                            ) : (
                                <span className="text-fg-dark">Above and beyond!</span>
                            )}

                        </span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <span className="text-fg-medium text-xs">TIMES</span>
                        <span className={`${complete ? 'text-bg-accent' : 'text-fg-dark'} font-bold`}>{numCompletions}/{habit.frequency}</span>
                    </div>
                </div>
            </div>
        </ViewTransition>
    )
}