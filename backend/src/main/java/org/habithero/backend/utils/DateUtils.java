package org.habithero.backend.utils;

import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.temporal.TemporalAdjusters;

public class DateUtils {
    public static Pair<Timestamp, Timestamp> getPeriodTimestamps(int offset) {
        LocalDate startDate = LocalDate
                .now()
                .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .minusDays(7L * offset);

        Timestamp startTimestamp = Timestamp.from(startDate.atStartOfDay(ZoneOffset.UTC).toInstant());

        LocalDate endDate = startDate.plusDays(7L);
        Timestamp endTimestamp = Timestamp.from(endDate.atStartOfDay(ZoneOffset.UTC).toInstant());

        return new Pair<>(startTimestamp, endTimestamp);
    }
}
