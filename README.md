# First Pass - Grading Assistant

First Pass helps teaching assistants grade short-answer questions faster and more consistently. It reads each student response against your rubric and suggests a score for every criterion, a one-line reason for each, and draft feedback. Your TA reviews every suggestion and makes the final call.

It is a prototype, not a finished product. It was built to test whether this kind of tool is useful and trustworthy in a real course.

**Try it:** [link to the live site]
The site opens with an example question and eight invented student answers already graded, so you can walk through the full review process without entering anything.

---

## The problem it addresses

Short-answer questions are some of the best ways to assess understanding, and some of the hardest to grade well at scale.

- **Time.** A TA grading 100 responses spends hours on work that is largely matching answers to a rubric.
- **Drift.** The 5th and the 95th answer rarely get graded to exactly the same standard, and co-TAs calibrate differently.
- **Feedback quality.** Written feedback tends to get shorter as fatigue sets in, even though students value it most.

First Pass takes the first pass at each answer, so TAs spend their time judging edge cases instead of re-reading the rubric.

## How it works in a course

1. **Set up the question.** Enter the question and your rubric, with a point value and a short description of what earns credit for each criterion.
2. **Add calibration examples (optional).** Paste a few answers you or your TA have already graded. First Pass uses them to match your standard rather than a generic one.
3. **Add student responses.** Paste them in or import a spreadsheet. Use anonymized IDs rather than names.
4. **Review.** Each answer shows the suggested score per criterion, the reasoning behind it, and draft feedback. The TA accepts the suggestion or enters a different score, and can edit the feedback. Answers the tool is unsure about, or that fall outside the rubric, are flagged and shown first.
5. **Export.** Download final grades and feedback as a CSV for your gradebook or LMS.

## What the instructor can see

The **Insights** view is designed for oversight:

- **Agreement rate:** how often the TA's final grade matched the suggestion exactly, and how often it was within one point.
- **Score distribution:** suggested scores and final grades side by side.
- **Average by criterion:** which parts of the rubric students struggled with most.
- **Consistency check:** pairs of answers that make essentially the same points but received different scores, so they can be reconciled before grades are released.

## Safeguards

- **The TA grades; the tool suggests.** No grade is final until a person accepts or changes it, and every override is recorded.
- **Transparent reasoning.** Every suggested score comes with a reason tied to a specific rubric criterion, so a TA can see why, not just what.
- **Uncertainty is surfaced.** Low-confidence answers and answers that don't fit the rubric are flagged for closer review rather than scored silently.
- **Rubric-bound grading.** The tool is instructed to reward what the rubric describes, not length or confident tone.
- **No stored student data.** Responses stay in the grader's browser session until exported. Nothing is saved on the server.

## Before using it with real student work

- Student responses are sent to Anthropic's Claude API to generate suggestions. Please confirm this fits your institution's AI policy and FERPA guidance before using identifiable or live student work.
- Remove names and student ID numbers before grading.
- Start with a past assignment your TA has already graded. Comparing the agreement rate on that set is the simplest way to judge whether the suggestions meet your standard.

## Current limitations

- Designed for short-answer text responses, not essays, code, math work, or images.
- Suggestions are only as clear as the rubric. Vague criteria produce vague scoring.
- There is no LMS integration yet. Grades move in and out through CSV.
- Work is not saved between sessions. Export before closing the page.
- Accuracy has not yet been validated across multiple courses. Pilot data is the next step.

## Feedback and pilots

First Pass was developed by Absalom, a Full-Time MBA candidate at the Johns Hopkins Carey Business School, as part of a New Product Development course project.

If you teach a course with short-answer assessments and would be willing to try First Pass on a past assignment, or simply share how grading works in your course today, that input would directly shape the next version.

---

*Technical setup and deployment instructions are in [DEPLOY.md](DEPLOY.md).*
