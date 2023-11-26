import jsPDF from "jspdf";
import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../../../components/styled-common/main";
import SubmitButton from "../../../components/submit-button";
import { getProfilePic } from "../../../services/profile-service";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import "../../../templates/style.css";
import { TemplateData, useTemplate } from "../../../templates/template.hook";
import Loader from "../../loader/Loader";

const PAGE_WIDTH = 1280;
const RATIO = 0.35;

type DownloadCVProps = {
  /** Used if the Saved cv renders */
  styleID?: number;
  viaSaved?: boolean;
  savedData?: any;
  profilePic?: string;
};

export const DownloadCV: any = ({
  styleID,
  viaSaved,
  savedData,
  profilePic,
}:any) => {
  const { style_id = "1" } = useParams();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { addSnack } = useSnackbar();
  const Template = useTemplate(styleID ?? parseInt(style_id));
  const raw = sessionStorage.getItem("@cv-data");
  const [data,setData] = useState<TemplateData | false>(false)
  useEffect(() => {
    
  }, []);
console.log("template",Template)

 useEffect(() =>{
  if(viaSaved){
    setData(savedData)
  }else{
    if(raw){
      setData(JSON.parse(raw))
    }
    else{
      setData(false)
    }
  }

 },[savedData,viaSaved,raw])

  const doc = new jsPDF({
    format: "A4",
    unit: "px",
    orientation: "portrait",
    encryption: {
      userPermissions: ["copy", "print"],
    },
  });
  const save = () => {
    return new Promise((resolve) => {
      if (ref.current && data) {
        doc.setProperties({
          author: "",
          title: `${data.credentials?.first_name}'s CV `,
          creator: "",
          subject: "Curriculum Vitae generated from",
          keywords: "CV",
        });
        doc.html(ref.current, {
          width: PAGE_WIDTH * RATIO,
          windowWidth: PAGE_WIDTH,
          image: {
            type: "jpeg",
            quality: 80,
          },
          callback: function (doc) {
            doc.save(`${data.credentials?.first_name}'s CV`);
            resolve(true);
            if (data.dontSave) sessionStorage.removeItem("@cv-data");
          },
        });
      } else resolve(false);
    });
  };
  const download = async () => {
    const downloaded = await save();
    if (downloaded)
      addSnack?.({
        severity: "success",
        message: "You've successfully downloaded your CV",
      });
  };
  if (!hasData(data, viaSaved)) return null;
  return (
    <Main style={{
     // width:50,
     width:"700px",
   // overflowX:"hidden",
    
    }}>
      <Suspense fallback={<Loader />}>
        <Template
          
          {...data}
          ref={ref}
          picture={
            getProfilePic(profilePic) ??
            data.picture ??
            getProfilePic(data.credentials?.dp)
          }
        />
        {
          !viaSaved && <SubmitButton
          onClick={download}
          sx={{
            zIndex: 55,
            position: "sticky",
            bottom: (theme) => theme.spacing(1),
            margin: (theme) => theme.spacing(1),
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          Download
        </SubmitButton>
        }
      </Suspense>
    </Main>
  );
};

const hasData = (
  data: TemplateData | false,
  viaSaved?: boolean
): data is TemplateData => viaSaved || data !== false;
