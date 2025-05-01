'use client';

import { X } from "lucide-react";
import { motion } from "motion/react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export interface NumberBoxProps {
    value: number,
    setValue: Dispatch<SetStateAction<number>>,
    setValid: Dispatch<SetStateAction<boolean | undefined>>,
    title: string,
    min: number,
    max: number
};

export default function NumberBox({ value, setValue, setValid, title, min, max }: NumberBoxProps) {
    const [valueStr, setValueStr] = useState<string>(value.toString());

    const isValid = useCallback((value: string) => {
        const i = parseInt(value);
        return i >= min && i <= max;
    }, [min, max]);

    useEffect(() => {
        const valid = isValid(valueStr);

        setValid(valid);
        if (valid) {
            setValue(parseInt(valueStr));
        }
    })

    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm text-fg-medium">{title}</p>
            <motion.div
                className="w-full min-w-64 p-2 bg-bg-medium flex flex-col"
            >
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min={min}
                        max={max}
                        value={valueStr}
                        onChange={(e) => setValueStr(e.target.value)}
                        className="bg-transparent outline-none text-sm text-fg-dark grow"
                    />
                    {!isValid(valueStr) && (
                        <X width={15} height={15} className="text-red-600" />
                    )}
                </div>
            </motion.div>
        </div>
    )
}