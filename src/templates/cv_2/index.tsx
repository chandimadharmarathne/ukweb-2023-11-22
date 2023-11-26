import { Container } from "@mui/material";
import React from "react";
import { TemplatePage } from "../template.hook";
import "./style.css";
import "../style.css";
import { getCountry } from "../../constants/countries";
import { About, Edu, Extra, Hobby, Pro, Skills } from "../common";

const CVTemplate: TemplatePage = React.forwardRef(
  ({ credentials, picture, blocks }, ref) => {
    return (
      <div className="cv-template">
        <Container className="cv-2 cv-common" ref={ref}>
          <aside>
            <div className="cover">
              <img
                src={picture ?? "/assets/user.png"}
                alt={credentials.first_name}
                width={200}
                height={200}
              />
            </div>
            <section id="main">
              <h1>
                {[credentials.first_name, credentials.last_name].join(" ")}
              </h1>
              <p className="job-title">{credentials.job_title}</p>
              <p>Birth - {credentials.date_of_birth}</p>
            </section>

            <section id="contact">
              <legend>
                <h2>Contact</h2>
              </legend>
              <div className="contact-item">
                <p>location</p>
                <p>
                  {credentials.address}, {credentials.zip_code},
                  {getCountry(credentials.country)?.label}
                </p>
              </div>
              <div className="contact-item">
                <p>Email</p>
                <p>{credentials.email}</p>
              </div>
            </section>
            <Skills content={blocks.skills} />
            <Hobby content={credentials.hobbies} />
          </aside>
          <main>
            <About content={credentials.about} />
            <Edu content={blocks.edu_info} />
            <Pro content={blocks.pro_info} />
            <Extra content={blocks.extra_activities} />

            <section id="reference">
              <legend>
                <h2>REFERENCE</h2>
              </legend>
              <div className="content">
                {blocks.references?.map((block) => (
                  <div key={block.key}>
                    <p>{block.person}</p>
                    <p>{block.company}</p>
                    <p>Phone: {block.number}</p>
                    <p>Email: {block.email}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </Container>
      </div>
    );
  }
);

export default CVTemplate;
