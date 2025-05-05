package org.habithero.backend.models.response;

import org.habithero.backend.entities.Habit;

import java.util.ArrayList;

public record GetAllHabitsResponse(ArrayList<Habit> habits) {
}
