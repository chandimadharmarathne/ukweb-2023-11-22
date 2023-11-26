import { BACKEND_URL } from "../../constants/config";

export const getProfilePic = (name?: string) =>
  !!name ? `${BACKEND_URL}/static/profiles/${name}` : undefined;

export const getAdCover = (name?: string) =>
  !!name ? `${BACKEND_URL}/static/ads/${name}` : undefined;

export const getCVTemplate = (name?: string) =>
  !!name ? `/assets/${name}` : undefined;

export const getSystemImage = (name?: string) =>
  !!name ? `${BACKEND_URL}/static/system/${name}` : undefined;

export const getUploadedImage = (name?: string) =>
  !!name ? `${BACKEND_URL}/static/uploads/${name}` : undefined;

export const getCountryImage = (code?: string) =>
  !!code ? `https://flagcdn.com/w20/${code.toLowerCase()}.png` : undefined;

export const getSiteLogo = () => `${BACKEND_URL}/static/system/logo.svg`;
