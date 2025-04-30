package org.habithero.backend.entities;

public class Habit {
    private int habitId;
    private String userId;
    private String habitName;
    private int frequency;
    private String category;

    public Habit(int habitId, String userId, String habitName, int frequency, String category) {
        this.habitId = habitId;
        this.userId = userId;
        this.habitName = habitName;
        this.frequency = frequency;
        this.category = category;
    }

    public int getHabitId() {
        return habitId;
    }

    public void setHabitId(int habitId) {
        this.habitId = habitId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getHabitName() {
        return habitName;
    }

    public void setHabitName(String habitName) {
        this.habitName = habitName;
    }

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }
}
