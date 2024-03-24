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
  // Apply penalty directly to the raw score if late
  let finalScore = submissionDate > dateDue ? score - possiblepts * 0.1 : score;
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

  //for every student in StudentList....
  studentList.forEach((student) => {
    //Set their assignment count and total score to 0 for now
    //create assignment and grade array
    let assignmentCount = 0;
    let totalScore = 0;
    let assignmentsResults = {};
    //forEach iterate overall objects in learnerSubmissions
    submissions.forEach((submission) => {
      //check if student is a match to LearnerSubmissions ->  learner_id, if so, do:
      if (student === submission.learner_id) {
        //Save all this as variables that are easier to refer to:
        let assignmentID = submission.assignment_id;
        let submittedAt = submission.submission.submitted_at;
        let score = submission.submission.score;
        //For each assignment in AssignmentGroup...:
        AssignmentGroup.assignments.forEach((assignment) => {
          if (assignmentID === assignment.id) {
            let dueDate = assignment.due_at;
            //Check if assignment is due:
            let isAssignmentDue = isDue(dueDate);
            if (isAssignmentDue) {
              //If it is due, we need to calculate their score
              //To calculate score we need to know when it was due, when it was submitted, their score and the total possible score.
              let possiblepts = assignment.points_possible;
              let calculatedScore = scoreCalc(
                dueDate,
                submittedAt,
                score,
                possiblepts
              ); //Calc the score incl if its late
              assignmentCount++; //keep track of total student assignments for avg
              totalScore += calculatedScore; //keep track of total student score for avg
              assignmentAndGrade.push(["assignmentID", "score"]); //Push the assignment and grade pair to array
            }
          }
        });
        let avg = assignmentCount > 0 ? totalScore / assignmentCount : 0; // Calculate average score if there are assignments considered
        result.push({ id: student, avg, ...assignmentsResults }); // Add student result to the final array
      }
    });
  });
  return result;
}

/////////////////////////////////////////////////////////////////////////////////////////

// const resultExampleFormat = [
//   {
//     // the ID of the learner for which this data has been collected
//     id: 125,
//     // the learner’s total, weighted average, in which assignments with more points_possible should be counted for more
//     avg: 0.985, // (47 + 150) / (50 + 150)

//     //Assignments:
//     //  Each assignment should be listed and have the key be set to its ID
//     //  and the value should be the percentage that the learner scored on the assignment (submission.score / points_possible)
//     1: 0.94, // 47 / 50
//     2: 1.0, // 150 / 150
//   },
//   {
//     id: 132,
//     avg: 0.82, // (39 + 125) / (50 + 150)
//     1: 0.78, // 39 / 50
//     2: 0.833, // late: (140 - 15) / 150
//   },
// ];

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
