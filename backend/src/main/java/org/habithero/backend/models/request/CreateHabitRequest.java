package org.habithero.backend.models.request;

public class CreateHabitRequest {
    private String habitName;
    private int frequency;
    private String category;
    public String getHabitName() {
        return habitName;
    }

    public int getFrequency() {
        return frequency;
    }

    public String getCategory() {
        return category;
    }
}
