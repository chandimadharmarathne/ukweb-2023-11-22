import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import slides from "../components/candidate/edit.data";
import { useAuthentication } from "../store/providers/auth.provider";
import { useSnackbar } from "../store/providers/snackbar.provider";
import { authRequest, CustomRequestError } from "../utils/Axios";
import { Response } from "../utils/utils.types";
import { useAuthBackend } from "./backend";

interface Options {
  customRoute: boolean;
}

const useCandidateBackend = <Data extends object = Record<string, unknown>>(
  id: string,
  options?: Options
) => {
  const { addSnack } = useSnackbar();
  const { id: candidateID } = useParams();
  const { completedstep = -1, completed, token } = useAuthentication();
  const route = options?.customRoute ? id : `/candidate/${id}`;

  const data = useAuthBackend<Response<Data>, CustomRequestError>(
    route,
    {
      onlyFetchIf:
        !!token &&
        (options?.customRoute ||
          !!candidateID ||
          completed ||
          // in Public endpoints "id" is something like documents?id=8
          completedstep! >=
            slides.findIndex((slide) => slide.id === /\w+/.exec(id)?.[0])),
    },
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
      errorRetryCount: 0,
    }
  );

  useEffect(() => {
    if (data.error?.statusCode === 401) return;
    if (data.error)
      addSnack?.({
        severity: "error",
        message: data.error.message,
      });
  }, [data.error]);

  const submit = async <T = Data>(
    data: T,
    config?: AxiosRequestConfig<any>,
    onSuccess?: () => void
  ) => {
    const { success, result } = await authRequest<{
      success: boolean;
      result?: string;
    }>({
      url: route,
      data,
      method: "POST",
      ...config,
    });
    if (success) {
      addSnack?.({
        severity: "success",
        message: result ?? "Successfully updated",
      });
      onSuccess?.();
      return;
    }
    if (!success) throw new Error("Couldn't Submit due to Error");
  };

  return {
    ...data,
    data: data.data?.result,
    submit,
  };
};

export default useCandidateBackend;
