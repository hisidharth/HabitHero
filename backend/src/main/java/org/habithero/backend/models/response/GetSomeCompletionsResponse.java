package org.habithero.backend.models.response;

import org.habithero.backend.entities.Completion;
import org.habithero.backend.entities.Habit;

import java.util.ArrayList;

public record GetSomeCompletionsResponse(Habit habit, ArrayList<Completion> completions) {
}
