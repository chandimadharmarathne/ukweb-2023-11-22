import { Container } from "@mui/material";
import React from "react";
import { dateFormat } from "../../utils/formatters/date-format";
import { About, Edu, Extra, Hobby, Pro, Skills } from "../common";
import { TemplatePage } from "../template.hook";
import "./style.css";

const CVTemplate: TemplatePage = React.forwardRef(
  ({ credentials, picture, blocks }, ref) => {
    return (
      <div className="cv-template">
        <Container className="cv-1 cv-common" ref={ref}>
          <aside>
            <div className="cover">
              <img
                src={picture ?? "/assets/user.png"}
                alt={credentials?.first_name}
                width={200}
                height={200}
              />
            </div>

            <About content={credentials?.about} />
            <Skills content={blocks?.skills} />

            <section id="reference">
              <legend>
                <h2>REFERENCE</h2>
              </legend>
              <div className="content">
                {blocks?.references?.map((block) => (
                  <div key={block.key}>
                    <p>{block.person}</p>
                    <p>{block.company}</p>
                    <p>Phone: {block.number}</p>
                    <p>Email: {block.email}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
          <main>
            <section id="main">
              <h1>
                {[credentials?.first_name, credentials?.last_name].join(" ")}
              </h1>
              <p className="job-title">{credentials?.job_title}</p>
              <div className="info">
                <div className="item">
                  <span className="title">Location </span>
                  <span>
                    <span>{credentials?.address},</span>
                    <span>{credentials?.zip_code}</span>
                  </span>
                </div>
                <div className="item">
                  <span className="title">Email</span>
                  <span>{credentials?.email}</span>
                </div>
                <div className="item">
                  <span className="title">Birth </span>
                  <span>{dateFormat(credentials?.date_of_birth)}</span>
                </div>
                <div className="item">
                  <span className="title">Telephone </span>
                  <span>{credentials?.contact_number}</span>
                </div>
              </div>
            </section>

            <Edu content={blocks?.edu_info} />
            <Pro content={blocks?.pro_info} />
            <Extra content={blocks?.extra_activities} />
            <Hobby content={credentials?.hobbies} />
          </main>
        </Container>
      </div>
    );
  }
);

export default CVTemplate;
