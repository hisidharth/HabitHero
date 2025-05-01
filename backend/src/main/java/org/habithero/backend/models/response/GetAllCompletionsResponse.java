package org.habithero.backend.models.response;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;

import java.util.ArrayList;
import java.util.Map;

public class GetAllCompletionsResponse {
    private Map<Integer, Habit> habits;
    private Map<Integer, ArrayList<Completion>> completions;
    public GetAllCompletionsResponse(Map<Integer, Habit> habits, Map<Integer, ArrayList<Completion>> completions) {
        this.habits = habits;
        this.completions = completions;
    }
    public Map<Integer, Habit> getHabits() {
        return habits;
    }

    public Map<Integer, ArrayList<Completion>> getCompletions() {
        return completions;
    }
}
