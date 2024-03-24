// CourseInfo object - The provided course information:
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// Assignment Group object:
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  //Array of assignment info objects:
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// Array of learner submission data objects:
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

///////////////////////////////////////////////////////////////////////////////////////////////////

// 1. If an AssignmentGroup does not belong to its course (mismatching course_id),
// your program should throw an error, letting the user know that the input was invalid.
// (try/catch) - try seeing if the assignment group id: (eg 12345) matches the course info id

const verifyCourseID = (courseInfo, assignmentGroup) => {
  if (assignmentGroup.course_id !== courseInfo.id) {
    throw new Error(
      `Course ID mismatch: ${assignmentGroup.course_id} does not match ${courseInfo.id}`
    );
  }
};
const getStudentList = () => {
  const studentList = LearnerSubmissions.map((learner) => learner.learner_id);
  // I knew sets exist, but I had to cheat to find how to do this:
  // Use a Set to remove duplicates, resulting in a list of unique learner_ids
  // console.log(Array.from(new Set(studentList)));
  return Array.from(new Set(studentList));
};

// 2. You should also account for potential errors in the data that your program receives.
// What if points_possible is 0? You cannot divide by zero.
// What if a value that you are expecting to be a number is instead a string?
// (try/catch, throw errors) - will implements later, ignore for now

// 3. If an assignment is not yet due, do not include it in the results or the average.
// * Make a simple function which compares dates to see due yet. In actual program, call to check if due if not ignore it.
const isDue = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);
  if (now >= due) {
    return true;
  } else {
    return false;
  }
};

// 4. If the learner's submission is late, deduct 10 percent of the total points possible from their score for that assignment.
// function which compares dates to see if late. Call to check if late, if it is, deduct.

const scoreCalc = (dueDate, submittedAt, score, possiblepts) => {
  const submissionDate = new Date(submittedAt);
  const dateDue = new Date(dueDate);
  // let finalScore = submissionDate > dateDue ? score - possiblepts * 0.1 : score;
  // Note - I had the above written, which I think is better, but the assignment calls for a case so ...
  let isOnTime = submissionDate <= dateDue ? "On Time" : "Late";
  let finalScore = score; // Initialize finalScore

  switch (isOnTime) {
    case "Late":
      // Apply penalty directly to the raw score if late
      finalScore -= possiblepts * 0.1; // Deduct 10% of possible points from score if late
      break;
    case "On Time":
      // No penalty, so finalScore remains unchanged
      break;
    default:
      // Ideally, you'll never hit this case, but it's good practice to handle unexpected cases
      console.error("Unexpected case for timeliness of submission");
      break;
  }

  // Then convert to a percentage for consistent representation
  return (finalScore / possiblepts) * 100;
};

//////////////////////////// MAIN PROGRAM ////////////////////////////

// Create a function named getLearnerData() that accepts these values as parameters,
// in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]),
// and returns the formatted result, which should be an array of objects as described.

function getLearnerData(course, ag, submissions) {
  verifyCourseID(course, ag);

  let studentList = getStudentList();
  const result = [];

  studentList.forEach((student) => {
    let assignmentCount = 0;
    let totalScore = 0;
    let totalPointsPossible = 0;
    let assignmentsResults = {};

    submissions.forEach((submission) => {
      if (student === submission.learner_id) {
        let assignmentID = submission.assignment_id;
        let submittedAt = submission.submission.submitted_at;
        let score = submission.submission.score;

        ag.assignments.forEach((assignment) => {
          if (assignmentID === assignment.id) {
            let dueDate = assignment.due_at;
            let isAssignmentDue = isDue(dueDate);

            if (isAssignmentDue) {
              let possiblepts = assignment.points_possible;
              let calculatedScore;

              try {
                if (possiblepts === 0) {
                  throw new Error("Points possible cannot be zero.");
                }

                calculatedScore = scoreCalc(
                  dueDate,
                  submittedAt,
                  score,
                  possiblepts
                );
                totalScore += calculatedScore; // No need to multiply by possiblepts again as scoreCalc already considers it
                assignmentsResults[assignmentID] = Number(
                  (calculatedScore / 100).toFixed(2)
                ); // Storing score percentage
              } catch (error) {
                console.error(
                  `Error with assignment ${assignmentID}: ${error.message}`
                );
              } finally {
                totalPointsPossible += possiblepts;
              }

              assignmentCount++;
            }
          }
        });
      }
    });

    if (assignmentCount > 0) {
      // Calculate average percentage score across all assignments
      let avg = (totalScore / totalPointsPossible) * 100;
      result.push({
        id: student,
        avg: Number(avg.toFixed(2)),
        ...assignmentsResults,
      });
    }
  });

  return result;
}

/////////////////////////////////////////////////////////////////////////////////////////

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(JSON.stringify(result, null, 2)); // Nicely format the output for readability
//Note that objects are unordered.
//Can't display how they are askinging with regards to order without losing the object structure they are also asking for...
