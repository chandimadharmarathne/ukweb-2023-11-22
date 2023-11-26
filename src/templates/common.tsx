// @ts-nocheck
import React from "react";
import { getYear } from "../utils/formatters/date-format";
import { getSkillRange } from "./template.utils";

export const About = ({ content }) => {
  if (!content) return null;
  return (
    <section id="about">
      <legend>
        <h2>About Me</h2>
      </legend>
      <p>{content}</p>
    </section>
  );
};
export const Hobby = ({ content }) => {
  if (!content) return null;
  return (
    <section id="hobby">
      <legend>
        <h2>HOBBIES</h2>
      </legend>
      {content}
    </section>
  );
};

export const Skills = ({ content }) => {
  if (!content?.length) return null;
  return (
    <section id="skills">
      <legend>
        <h2>PRO skills</h2>
      </legend>
      {content?.map((block) => (
        <div className="range" key={block.key}>
          <div
            className="slider"
            style={getSkillRange(block.skill_level)}
          ></div>
          <p>{block.skill}</p>
        </div>
      ))}
    </section>
  );
};

export const Edu = ({ content }) => {
  if (!content?.length) return null;
  return (
    <section id="edu">
      <legend>
        <h2>EDUCATION INFORMATION</h2>
      </legend>
      <div className="information">
        {content.map((block, i) => (
          <div className="item" key={block.key ?? i}>
            <p>
              {getYear(block.from)} -{" "}
              {block.is_studying ? "Current" : getYear(block.to)}
            </p>
            <p data-type="title">{block.title}</p>
            <p>{block.institute}</p>
            <p></p>
          </div>
        ))}
      </div>
    </section>
  );
};
export const Pro = ({ content }) => {
  if (!content?.length) return null;
  return (
    <section id="pro">
      <legend>
        <h2>PROFFESIONAL INFORMATION</h2>
      </legend>
      <div className="information">
        {content?.map((block, i) => (
          <div className="item" key={block.key ?? i}>
            <p>
              {getYear(block.from)} -{" "}
              {block.is_working ? "Current" : getYear(block.to)}
            </p>
            <p data-type="title">{block.title}</p>
            <p>{block.company}</p>
            <p></p>
          </div>
        ))}
      </div>
    </section>
  );
};
export const Extra = ({ content }) => {
  if (!content?.length) return null;
  return (
    <section id="extra">
      <legend>
        <h2>EXTRA CURRICULAR ACTIVITIES</h2>
      </legend>
      <div className="information">
        {content.map((block) => (
          <div className="item" key={block.key}>
            <p>
              {getYear(block.from)} - {getYear(block.to)}
            </p>
            <p>{block.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
