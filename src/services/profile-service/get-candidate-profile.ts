import { authRequest } from "../../utils/Axios";
import { Response } from "../../utils/utils.types";

export const getLoggedCandidateFullProfile = async () => {
  const res = await authRequest<Response<Result>>({
    url: "/candidate",
  });
  return res.result;
};

export const getAthenticatedCandidateFullProfile = async (token?: string) => {
  const res = await authRequest<Response<Result>>({
    url: "/candidate",
    params: { token },
  });
  return res.result;
};
interface Result {
  data_overview: Dataoverview;
  data_about: string;
  data_info: Datainfo;
  data_family: Datafamily;
  data_vehicle: Datavehicle;
  data_education: Dataeducation;
  data_qualifications: Dataqualification[];
  data_preference: Datapreference;
  data_docs: Datadocs;
}

interface Datadocs {
  cover: string;
  cv: string;
  degree?: any;
}

interface Datapreference {
  industry: string;
  salary: number;
  salary_type: number;
  notice_period: number;
  notice_period_type: number;
  job_type: string;
}

interface Dataqualification {
  title: string;
  company: string;
  from: string;
  to?: string;
  is_working: boolean;
}

interface Dataeducation {
  data: Data;
  other: Other[];
}

interface Other {
  title: string;
  institute: string;
  from: string;
  to: string;
  is_studying: boolean;
}

interface Data {
  edu_level: number;
  ol: Ol;
  al: Al;
}

interface Al {
  index_num?: any;
  year?: any;
}

interface Ol {
  index_num: number;
  year: number;
}

interface Datavehicle {
  vehicle_model: number;
  license_type: number;
}

interface Datafamily {
  father_name: string;
  father_occupation: string;
  mother_name: string;
  mother_occupation: string;
  marital_status: number;
  spouse_name: string;
  spouse_occupation: string;
  number_of_children: number;
}

interface Datainfo {
  date_of_birth: string;
  gender: number;
  nic: string;
  country: string;
  district: number;
  zip_code: number;
  address: string;
}

interface Dataoverview {
  first_name: string;
  last_name: string;
  contact_number: string;
  industry: string;
  job_title: string;
  email: string;
  facebook_profile_url: string;
  linked_in_profile_url: string;
  other_links: string[];
  badge: number;
  dp?: any;
}
