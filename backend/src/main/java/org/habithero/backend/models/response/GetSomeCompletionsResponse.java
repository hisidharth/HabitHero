package org.habithero.backend.models.response;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;

import java.sql.Timestamp;
import java.util.ArrayList;

public record GetSomeCompletionsResponse(
        Timestamp startTime,
        Timestamp endTime,
        Habit habit,
        ArrayList<Completion> completions
) { }
