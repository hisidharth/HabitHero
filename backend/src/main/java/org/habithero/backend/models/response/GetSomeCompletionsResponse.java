package org.habithero.backend.models.response;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;

import java.util.ArrayList;

public class GetSomeCompletionsResponse {
    private Habit habit;
    private ArrayList<Completion> completions;

    public GetSomeCompletionsResponse(Habit habit, ArrayList<Completion> completions) {
        this.habit = habit;
        this.completions = completions;
    }

    public Habit getHabit() {
        return habit;
    }

    public ArrayList<Completion> getCompletions() {
        return completions;
    }
}
