import { UserType } from "../../constants/input-data";
import {
  getProfilePic,
  grantedCV,
  getSystemImage,
} from "../../services/profile-service";
import { newTab } from "../../utils/new-tab";

export const NOTIFICATIONS: NotificationProps[] = [
  {
    type: "request_viewprofile_req",
    getPic: (img) => getProfilePic(img),
    getLink: () => "/requests",
  },
  {
    type: "request_viewprofile_accept",
    getPic: (img) => getProfilePic(img),
    getLink: (n) => {
      const params = new URLSearchParams({ key: n.data?.token }).toString();
      return n.data?.role === UserType.EMPLOYER
        ? `/job/${n.data?.id}?${params}`
        : `/candidate/${n.data?.id}?${params}`;
    },
  },
  {
    type: "request_viewcv_req",
    getPic: (img) => getProfilePic(img),
    getLink() {
      return "/requests?id=1";
    },
  },
  {
    type: "request_viewcv_accept",
    getPic: (img) => getProfilePic(img),
    onClick: async (n) => {
      const { has_manual } = n.data;
      if (has_manual) return await grantedCV(n.data?.token);
      const validate = newTab("generated-cv");
      validate(`/cv-gen/generated/${n.data.user_id}?token=${n.data.token}`);
    },
  },
  {
    type: "request_vacancy",
    getPic: (img) => getProfilePic(img),
    getLink: () => `/requests?id=2`,
  },
  {
    type: "view_profile",
    getPic: (img) => getProfilePic(img),
    getLink: () => "/profile/viewed",
  },
  { type: "job_apply_accept", getPic: (img) => getProfilePic(img) },
  {
    type: "job_apply",
    getPic: (img) => getProfilePic(img),
    getLink: ({ data }) => `/profile/company/overview/${data?.advertisement}`,
  },
  {
    type: "verify_badge_accept",
    getPic: (img) => getSystemImage(img),
  },
  {
    type: "verify_badge_decline",
    getPic: (img) => getSystemImage(img),
    getDescription: (n) => n.data.reason,
  },
  {
    type: "job_ad_approved",
    getPic: (img) => getSystemImage(img),
    getLink(n) {
      return `/job/${n.data.advertisement}`;
    },
  },
];
export type NotificationProps = {
  type: string;
  onClick?: (n: Notification) => void | Promise<void>;
  getLink?: (n: Notification) => string;
  getDescription?: (n: Notification) => string;
  getPic?: (imgPath: string) => string | undefined;
};

export interface Notification<Data = any> {
  id: number;
  title: string;
  timestamp: number;
  image: string;
  type: string;
  data?: Data;
}
