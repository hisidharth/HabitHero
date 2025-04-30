package org.habithero.backend.models.response;

import org.habithero.backend.entities.Habit;

import java.util.ArrayList;

public class GetAllHabitsResponse {
    private ArrayList<Habit> habits;

    public GetAllHabitsResponse(ArrayList<Habit> habits) {
        this.habits = habits;
    }

    public ArrayList<Habit> getHabits() {
        return this.habits;
    }
}
