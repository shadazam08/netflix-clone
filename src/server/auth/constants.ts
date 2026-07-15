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
  CREATED_SUCCESS: "Profile created successfully.",
  UPDATED_SUCCESS: "Profile updated successfully.",
  DELETED_SUCCESS: "Profile deleted successfully.",
  NOT_FOUND: "Profile not found.",
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
} as const;