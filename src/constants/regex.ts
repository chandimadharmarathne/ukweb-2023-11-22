export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[.A-Za-z\d.!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/;

export const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const MOBILE_NUM_REGEX = /^(\+\d{1,3}[- ]?)?\d{10,15}$/;

export const FULL_NAME_REGEX = /^[a-zA-Z\s\d,."'-]+$/;

export const OTP_REGEX = /^[0-9]{6}$/;

export const NIC_REGEX = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;

export const TEXT_REGEX = /^.*$/m;

export const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
