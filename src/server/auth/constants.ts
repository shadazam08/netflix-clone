export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_ALREADY_EXISTS: "Email already registered.",
  ACCOUNT_NOT_ACTIVE: "Account is not active.",
  ROLE_NOT_FOUND: "Default role not found.",
  REGISTRATION_SUCCESS: "Registration successful.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",
  REGISTION_FAIL:"Registration failed.",
  LOGIN_FAILD:"Login failed.",
  UNAUTHORIZED: "Unauthorized.",
  FORBIDDEN: "Forbidden.",
} as const;

export const PROFILE_MESSAGES = {
  FETCH_SUCCESS: "Profiles fetched successfully.",
  FETCH_ONE_SUCCESS: "Profile fetched successfully.",
  CREATED_SUCCESS: "Profile created successfully.",
  UPDATED_SUCCESS: "Profile updated successfully.",
  DELETED_SUCCESS: "Profile deleted successfully.",
  NOT_FOUND: "Profile not found.",
  LIMIT_EXCEEDED: "Maximum number of profiles reached.",
  LAST_PROFILE: "At least one profile must exist.",
} as const;

export const CONTENT_MESSAGES = {
  FETCH_SUCCESS: "Content fetched successfully.",
  FETCH_ONE_SUCCESS: "Content fetched successfully.",
  CREATED_SUCCESS: "Content created successfully.",
  UPDATED_SUCCESS: "Content updated successfully.",
  DELETED_SUCCESS: "Content deleted successfully.",
  NOT_FOUND: "Content not found.",
  SLUG_EXISTS: "Content slug already exists.",
} as const;

export const MEDIA_MESSAGES = {
  FETCH_SUCCESS: "Media fetched successfully.",
  FETCH_ONE_SUCCESS: "Media fetched successfully.",
  CREATED_SUCCESS: "Media created successfully.",
  UPDATED_SUCCESS: "Media updated successfully.",
  DELETED_SUCCESS: "Media deleted successfully.",
  NOT_FOUND: "Media not found.",
  ALREADY_EXISTS: "Media of this type already exists.",
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
} as const;