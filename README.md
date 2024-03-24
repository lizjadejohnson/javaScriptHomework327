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

What could you have done differently during the planning stages of your project to make the execution easier?
I feel like I started out doing a good job creating small functions, but then when it came to
iterate through objects and arrays and things, for some reason I just gave that up.
Of course, when I'm calculating grades and everything I'm calling functions.
But my program feels really congested with all the looping within looping within looping.
I feel like maybe I could have done a better job of creating new data formats upfront or something.

Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
I think I need to spend more time working with switch statements. I don't really find them confusing per se,
but they like never feel right to implement. I had a really hard time as I was writing this coming up with
a way to use them. I sort of just forced it at the end.

What would you add to, or change about your application if given more time?
I am fully aware this is a hulking behemoth probably twice as big as it needs to be haha. I would definitely
try to refactor how I'm handling the old data, the new data, and encapsulating functions just to make it all
a lot more tight.
