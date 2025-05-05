package org.habithero.backend.models.response;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Map;

public record GetAllCompletionsResponse(
        Timestamp startTime,
        Timestamp endTime,
        Map<Integer, Habit> habits,
        Map<Integer, ArrayList<Completion>> completions
) {}
