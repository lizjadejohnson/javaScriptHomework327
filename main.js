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

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result:

  // Create a function named getLearnerData() that accepts these values as parameters,
  // in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]),
  // and returns the formatted result, which should be an array of objects as described.

  // 1. If an AssignmentGroup does not belong to its course (mismatching course_id),
  // your program should throw an error, letting the user know that the input was invalid.
  // (try/catch)

  // 2. You should also account for potential errors in the data that your program receives.
  // What if points_possible is 0? You cannot divide by zero.
  // What if a value that you are expecting to be a number is instead a string?
  // (try/catch, throw errors)

  // 3. If an assignment is not yet due, do not include it in the results or the average.
  // * Make a simple function which compares dates to see due yet. In actual program, call to check if due if not ignore it.

  // 4. If the learner's submission is late, deduct 10 percent of the total points possible from their score for that assignment.
  // * Make a simple function which compares dates to see if late. In actual program, call to check if late

  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
