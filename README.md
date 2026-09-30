# First Pass - Grading Assistant

**AI-suggested grades for short-answer questions, with the TA always making the final call.**

First Pass reads each student response against the instructor's rubric and proposes a score for every criterion, a short reason for each score, and draft feedback for the student. The teaching assistant reviews every suggestion, accepts or overrides it, and exports final grades. Instructors get a clear view of how closely human and AI judgments agree and where grading was inconsistent.

**Live demo:** [link to the live site]
The demo opens with a sample Responsible AI exam question and eight invented student answers already graded, so the full review workflow can be explored in under five minutes.

---

## The problem

Short-answer questions are one of the most effective ways to test real understanding. They are also among the most expensive to grade well.

- **Grading takes hours.** A single short-answer question on a 100-student exam can take a TA an entire evening, and most of that time is spent matching answers to a rubric.
- **Standards drift.** The 5th answer and the 95th answer are rarely held to exactly the same bar, and two TAs splitting a stack calibrate differently.
- **Feedback suffers.** Written comments get shorter as fatigue sets in, even though feedback is what students value most.
- **Instructors have little visibility.** Once grading is delegated, it is hard to know whether the rubric was applied consistently until students start contesting grades.

The idea came from direct experience: First Pass was inspired by grading short-answer exams as a TA for a graduate Responsible AI course.

## Who it is for

| | Role | What they need |
|---|---|---|
| **Primary user** | Graduate TAs and graders | Less time per answer, consistent standards, good feedback without burnout |
| **Decision maker** | Course instructors | Fair, defensible grades and oversight of delegated grading |
| **Likely buyer** | Departments and centers for teaching and learning | Tools that scale teaching support while meeting privacy and AI-use policy |

## How it works

1. **Define the question and rubric.** The instructor or TA enters each rubric criterion with its point value and a description of what earns credit.
2. **Calibrate (optional).** Adding a few answers the instructor has already graded teaches First Pass that instructor's specific standard.
3. **Add responses.** Paste answers or import a spreadsheet, using anonymized IDs.
4. **Review.** Each answer shows a suggested score per criterion, the reasoning behind it, a confidence level, and editable draft feedback. Low-confidence and unusual answers are flagged and shown first. The TA accepts each suggestion or enters their own score.
5. **Export.** Final grades and feedback download as a CSV, ready for the gradebook.

## Instructor oversight

The **Insights** view turns grading into something an instructor can audit:

- **Agreement rate:** how often final grades matched the AI suggestion exactly, and within one point.
- **Score distribution:** suggested and final scores side by side.
- **Performance by criterion:** which rubric elements students found hardest, useful for adjusting instruction.
- **Consistency check:** pairs of answers that make essentially the same points but received different scores, caught before grades are released.

## Responsible design

First Pass was designed around the principles taught in the course that inspired it.

- **Human in the loop.** The tool never assigns a grade. Every score is accepted or changed by a person, and overrides are recorded.
- **Explainable suggestions.** Each score is tied to a specific rubric criterion with a stated reason, so graders can see why, not only what.
- **Honest about uncertainty.** Ambiguous or off-rubric answers are flagged for closer review instead of scored silently.
- **Rubric-bound.** The model is instructed to reward what the rubric describes, not length, polish, or confident tone.
- **Minimal data handling.** Student responses are not stored on the server. They stay in the grader's browser until exported, and anonymized IDs are used throughout.

## How it differs from existing tools

Established platforms such as Gradescope already use AI to [group similar answers](https://guides.gradescope.com/hc/en-us/articles/24838908062093-AI-assisted-grading-and-answer-groups) so a grader can score a whole group at once. First Pass takes a different approach:

- It scores **each answer against each rubric criterion** and explains the score, rather than only clustering answers.
- It **drafts individualized feedback** for every student.
- It **learns an instructor's standard** from a handful of previously graded examples.
- It **measures human-AI agreement** and **flags inconsistent grading**, giving instructors evidence that the rubric was applied fairly.

## Current status

First Pass is a working prototype. The full grading, review, insights, and export workflow is functional, and live grading runs on Anthropic's Claude models.

**Known limitations**
- Built for short text responses; essays, code, math, and handwritten work are out of scope for now.
- Grading quality depends on rubric clarity. Vague criteria produce vague scoring.
- No accounts, saved sessions, or LMS integration yet; grades move through CSV export.
- Accuracy has not yet been validated against human graders at scale.

---

## Roadmap to a viable product

The central question is not whether AI can suggest grades, but whether instructors will **trust** the suggestions and whether institutions will **approve and pay** for them. The plan below tests those assumptions in order, cheapest first.

### Phase 1: Validate the need and the accuracy (next 4-6 weeks)

- **Customer discovery.** Interview 15-20 people across the value chain: TAs, instructors, a center for teaching and learning, and an academic technology or privacy office. Focus on how grading works today, where time is lost, what would make an AI suggestion trustworthy, and who approves new tools.
- **Accuracy benchmark.** Run First Pass on 2-3 past assignments that were already graded by humans, with permission and anonymized data. Measure exact agreement, agreement within one point, and where the tool and graders disagree.
- **Time study.** Time TAs grading a batch with and without First Pass.

**Go / no-go signals:** suggestions within one point of the human grade for a large majority of answers; a meaningful reduction in grading time; at least a few instructors willing to pilot.

### Phase 2: Classroom pilot (Spring 2027)

- Pilot in 2-3 courses at Johns Hopkins with a short-answer component, starting at Carey.
- Complete a privacy and AI-use review with the university before any live student work is graded.
- Track agreement rates, time saved, override patterns, grade disputes, and TA and instructor satisfaction.
- Collect student-facing feedback quality ratings from a sample of students.

### Phase 3: Build the product (Summer-Fall 2027)

Based on pilot results, prioritize:

- **Accounts and saved workspaces**, so grading can pause and resume and rubrics can be reused across terms.
- **LMS integration** with Canvas and Blackboard to import submissions and return grades without spreadsheets.
- **Multi-grader support**, so co-TAs share one calibrated standard and instructors see agreement across graders.
- **Audit log and reporting** for grade disputes and institutional review.
- **Enterprise requirements**: single sign-on, data processing agreements, and FERPA-aligned data handling.

### Phase 4: Business model and go-to-market

- **Pricing hypotheses to test:** a per-course license paid by departments, or an institution-wide license sold through centers for teaching and learning.
- **Beachhead market:** graduate professional schools, starting with business schools, where short-answer and case-based assessment is common and class sizes are growing.
- **Champions:** TAs feel the pain, instructors approve adoption, and teaching centers can recommend tools across a university.
- **Unit economics:** model per-answer AI costs against pricing to confirm healthy margins at scale.

### Key risks and how we will address them

| Risk | Mitigation |
|---|---|
| Instructors don't trust AI-suggested grades | Human-in-the-loop design, explained scores, and published agreement data from pilots |
| University privacy or AI-use policy blocks adoption | Engage privacy offices early; anonymization by default; no server-side storage of student work |
| Incumbent platforms add similar features | Differentiate on rubric-level explanations, calibration, and grading-consistency analytics; move quickly within a focused market |
| Accuracy varies by subject or question type | Stay focused on short-answer text; benchmark by discipline before expanding |
| Students contest AI-assisted grades | Every final grade is set by a person, with a rubric-linked reason and audit trail |

---

## About

First Pass was developed by Absalom, a Full-Time MBA candidate at the Johns Hopkins Carey Business School, as part of the New Product Development course (BU.460.730).

*Technical setup and deployment instructions are in [DEPLOY.md](DEPLOY.md).*
