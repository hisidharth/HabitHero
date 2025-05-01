package org.habithero.backend.entities;

import java.sql.Date;
import java.sql.Timestamp;

public class Completion {
    private int completionId;
    private int habitId;
    private String userId;
    private Timestamp timeCompleted;

    public Completion(int completionId, int habitId, String userId, Timestamp timeCompleted) {
        this.completionId = completionId;
        this.habitId = habitId;
        this.userId = userId;
        this.timeCompleted = timeCompleted;
    }

    public int getCompletionId() {
        return completionId;
    }

    public void setCompletionId(int completionId) {
        this.completionId = completionId;
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

    public Timestamp getTimeCompleted() {
        return timeCompleted;
    }

    public void setTimeCompleted(Timestamp timeCompleted) {
        this.timeCompleted = timeCompleted;
    }
}
