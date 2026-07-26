export interface ActionResponse<T = undefined> {
  success: boolean;

  message?: string;

  errors?: Record<
    string,
    string[] | undefined
  >;

  data?: T;

  redirectTo?: string;
}