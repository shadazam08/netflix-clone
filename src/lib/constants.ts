export const ROUTES = {
  ADMIN_MOVIES: "/admin/movies",
} as const;

export const SUCCESS_MESSAGES = {
  CONTENT_CREATED: "Movie created successfully.",
  CONTENT_UPDATED: "Movie updated successfully.",
  CONTENT_DELETED: "Movie deleted successfully.",
} as const;

export const ERROR_MESSAGES = {
  CONTENT_CREATE_FAILED: "Unable to create movie.",
  CONTENT_UPDATE_FAILED: "Unable to update movie.",
  CONTENT_DELETE_FAILED: "Unable to delete movie.",
  VALIDATION_FAILED: "Validation failed.",
} as const;