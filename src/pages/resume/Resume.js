import "../../index.css";
import "./resume.css";

import ResumeOption from "./ResumeOption.js";

function Resume() {
  return (
    <main>
      <h1>Resume</h1>
      <h2>Resume</h2>
      <form>
        <h3>What Are You Looking For?</h3>
        <fieldset>
          <legend>Technologies</legend>
          <ResumeOption name="HTML" value="html" />
          <ResumeOption name="CSS" value="css" />
          <ResumeOption name="JavaScript" value="js" />
          <ResumeOption name="React" value="react" />
          <ResumeOption name="MySQL" value="mysql" />
          <ResumeOption name="Java" value="java" />
          <ResumeOption name="Python" value="python" />
        </fieldset>
        <fieldset>
          <legend>Skills</legend>
          <ResumeOption name="Front-End" value="front-end" />
          <ResumeOption name="Back-End" value="back-end" />
          <ResumeOption name="Full-Stack" value="full-stack" />
          <ResumeOption name="Database" value="database" />
          <ResumeOption name="Education" value="education" />
        </fieldset>
        <fieldset>
          <legend>Experience</legend>
          <ResumeOption name="Internship" value="internship" />
          <ResumeOption name="Co-op" value="coop" />
          <ResumeOption name="Full-Time" value="full-time" />
          <ResumeOption name="Part-Time" value="part-time" />
          <ResumeOption name="Volunteer" value="volunteer" />
        </fieldset>
        <fieldset>
          <legend>Education</legend>
          <ResumeOption name="High School" value="high-school" />
          <ResumeOption name="University" value="university" />
          <ResumeOption name="Awards" value="awards" />
          <ResumeOption name="Certifications" value="certifications" />
        </fieldset>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
      </form>
    </main>
  );
}

export default Resume;
