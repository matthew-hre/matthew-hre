import "./index.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Footer() {
  const [commit, setCommit] = useState({ sha: "", time: "" });

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/matthew-hre/matthew-hre/commits`)
      .then((response) => {
        const commitSha = response.data[0].sha;
        let commitTime = response.data[0].commit.committer.date
          .replace("T", " at ")
          .replace("Z", " ");

        let splittedTime = commitTime.split(" at ");
        let time = splittedTime[1].split(":");
        let hour = parseInt(time[0]);
        time[0] = hour - 7 < 0 ? hour + 17 : hour - 7;
        time = time.join(":");
        splittedTime[1] = time;
        commitTime = splittedTime.join(" at ");

        setCommit({
          sha: commitSha,
          time: commitTime,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <footer>
      <hr />
      <span className="float-right">
        Last updated on {commit.time} [
        <a
          href={`https://github.com/matthew-hre/matthew-hre/commit/${commit.sha}`}
        >
          commit {commit.sha.split(" ")[0].substring(0, 7)}
        </a>
        ]
      </span>
      <b>Matthew Hrehirchuk</b> © 2023.
    </footer>
  );
}

export default Footer;
