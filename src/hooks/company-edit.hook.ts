import useCandidateBackend from "./candidate-edit.hook";

export const useCompanyEditBackend = <T extends Record<string, any>>() => {
  return useCandidateBackend<T>("/company", { customRoute: true });
};
