import { Container } from "@mui/material";
import React from "react";
import { getCountry } from "../../constants/countries";
import { dateFormat } from "../../utils/formatters/date-format";
import { About, Edu, Extra, Hobby, Pro, Skills } from "../common";
import { TemplatePage } from "../template.hook";
import "./style.css";

const CVTemplate: TemplatePage = React.forwardRef(
  ({ credentials, picture, blocks }, ref) => {
    return (
      <div className="cv-template">
        <Container className="cv-common cv-5" ref={ref}>
          <aside>
            <section id="main">
              <div className="cover">
                <img
                  src={picture ?? "/assets/user.png"}
                  alt={credentials.first_name}
                  width={200}
                  height={200}
                />
              </div>
              <h1>
                {[credentials.first_name, credentials.last_name].join(" ")}
              </h1>
              <p className="job-title">{credentials.job_title}</p>
              <p>Birth - {dateFormat(credentials.date_of_birth)}</p>
            </section>
            <About content={credentials.about} />

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
              <div className="contact-item">
                <p>Telephone</p>
                <p>{credentials.contact_number}</p>
              </div>
            </section>
            <Skills content={blocks.skills} />
          </aside>
          <main>
            <Pro content={blocks.pro_info} />
            <Edu content={blocks.edu_info} />
            <Extra content={blocks.extra_activities} />
            <div className="flex">
              <Hobby content={credentials.hobbies} />

              <section id="reference">
                <legend>
                  <h2>REFERENCE</h2>
                </legend>
                <div className="content">
                  {blocks.references?.map((block) => (
                    <div className="item" key={block.key}>
                      <p>{block.person}</p>
                      <p>{block.company}</p>
                      <p>Phone: {block.number}</p>
                      <p>Email: {block.email}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </Container>
      </div>
    );
  }
);

export default CVTemplate;
