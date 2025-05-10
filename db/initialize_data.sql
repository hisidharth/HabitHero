USE habithero;

# Test data for Users table;
INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test1', 'Test 1', 'test1@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test2', 'Test 2', 'test2@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test3', 'Test 3', 'test3@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test4', 'Test 4', 'test4@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test5', 'Test 5', 'test5@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test6', 'Test 6', 'test6@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test7', 'Test 7', 'test7@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test8', 'Test 8', 'test8@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test9', 'Test 9', 'test9@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test10', 'Test 10', 'test10@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test11', 'Test 11', 'test11@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test12', 'Test 12', 'test12@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test13', 'Test 13', 'test13@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test14', 'Test 14', 'test14@example.com', 1, 1000);

INSERT INTO Users (UserID, Username, Email, CurrentLevel, XP)
VALUES ('test15', 'Test 15', 'test15@example.com', 1, 1000);

# Test data for Habits table;
INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test1', 'Test 1', 7, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test1', 'Test 2', 7, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test1', 'Test 3', 7, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test1', 'Test 4', 7, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test1', 'Test 5', 7, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test2', 'Test 6', 14, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test3', 'Test 7', 14, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test4', 'Test 8', 14, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test5', 'Test 9', 14, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test6', 'Test 10', 14, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test7', 'Test 11', 1, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test7', 'Test 12', 1, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test8', 'Test 13', 1, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test8', 'Test 14', 1, 'Test');

INSERT INTO Habits (UserID, HabitName, Frequency, Category)
VALUES ('test9', 'Test 15', 1, 'Test');

# Test data for Completions table;
INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (1, 'test1', '2025-05-07 09:25:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (1, 'test1', '2025-05-07 09:30:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (1, 'test1', '2025-05-07 09:35:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (1, 'test1', '2025-05-07 09:40:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (1, 'test1', '2025-05-07 09:45:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-05-07 09:25:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-05-07 09:30:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-05-07 09:35:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-05-07 09:40:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-05-07 09:45:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-04-07 09:25:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-04-07 09:30:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-04-07 09:35:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-04-07 09:40:00.000000', 100);

INSERT INTO Completions (HabitID, UserID, TimeCompleted, XPEarned)
VALUES (11, 'test7', '2025-04-07 09:45:00.000000', 100);