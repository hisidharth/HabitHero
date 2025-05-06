import { dateToStr } from "@/lib/util/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function DateSelector({ startDate, endDate, nextUrl, prevUrl }: { startDate: Date, endDate: Date, prevUrl: string, nextUrl?: string }) {
    return (
        <div className="flex items-center gap-2">
            <Link href={prevUrl}>
                <ChevronLeft width={15} height={15} className="text-fg-dark" />
            </Link>
            <p className="text-fg-medium text-sm">{dateToStr(startDate, false)} - {dateToStr(endDate, false)}</p>
            {nextUrl && (
                <Link href={nextUrl}>
                    <ChevronRight width={15} height={15} className="text-fg-dark" />
                </Link>
            )}
        </div>
    )
}