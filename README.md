This is the SBA 308 project for the Per Scholas full-stack development program.

We were provided with sample data and the basic expectations were as follows:

Create a function named getLearnerData() that accepts these values as parameters,
in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]),
and returns the formatted result, which should be an array of objects as described.

1. If an AssignmentGroup does not belong to its course (mismatching course_id),
   your program should throw an error, letting the user know that the input was invalid.
   // (try/catch)

2. You should also account for potential errors in the data that your program receives.
   What if points_possible is 0? You cannot divide by zero.
   What if a value that you are expecting to be a number is instead a string?
   // (try/catch, throw errors)

3. If an assignment is not yet due, do not include it in the results or the average.
   // \* Make a simple function which compares dates to see due yet. In actual program, call to check if due if not ignore it.

4. If the learner's submission is late, deduct 10 percent of the total points possible from their score for that assignment.
   // \* Make a simple function which compares dates to see if late. In actual program, call to check if late

The ultimate goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
{
// the ID of the learner for which this data has been collected
"id": number,
// the learner’s total, weighted average, in which assignments
// with more points_possible should be counted for more
// e.g. a learner with 50/100 on one assignment and 190/200 on another
// would have a weighted average score of 240/300 = 80%.
"avg": number,
// each assignment should have a key with its ID,
// and the value associated with it should be the percentage that
// the learner scored on the assignment (submission.score / points_possible
<assignment_id>: number,
// if an assignment is not yet due, it should not be included in either
// the average or the keyed dictionary of scores
}
