export const AUTH_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password.",
  EMAIL_ALREADY_EXISTS: "Email already registered.",
  ACCOUNT_NOT_ACTIVE: "Account is not active.",
  ROLE_NOT_FOUND: "Default role not found.",
  REGISTRATION_SUCCESS: "Registration successful.",
  LOGIN_SUCCESS: "Login successful.",
  LOGOUT_SUCCESS: "Logout successful.",
  REGISTION_FAIL: "Registration failed.",
  LOGIN_FAILD: "Login failed.",
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

export const CATEGORY_MESSAGES = {
  FETCH_SUCCESS: "Categories fetched successfully.",
  FETCH_ONE_SUCCESS: "Category fetched successfully.",
  CREATED_SUCCESS: "Category created successfully.",
  UPDATED_SUCCESS: "Category updated successfully.",
  DELETED_SUCCESS: "Category deleted successfully.",
  NOT_FOUND: "Category not found.",
  SLUG_EXISTS: "Category slug already exists.",
} as const;

export const GENRE_MESSAGES = {
  FETCH_SUCCESS: "Genres fetched successfully.",
  FETCH_ONE_SUCCESS: "Genre fetched successfully.",
  CREATED_SUCCESS: "Genre created successfully.",
  UPDATED_SUCCESS: "Genre updated successfully.",
  DELETED_SUCCESS: "Genre deleted successfully.",
  NOT_FOUND: "Genre not found.",
  SLUG_EXISTS: "Genre slug already exists.",
} as const;

export const LANGUAGE_MESSAGES = {
  FETCH_SUCCESS: "Languages fetched successfully.",
  FETCH_ONE_SUCCESS: "Language fetched successfully.",
  CREATED_SUCCESS: "Language created successfully.",
  UPDATED_SUCCESS: "Language updated successfully.",
  DELETED_SUCCESS: "Language deleted successfully.",
  NOT_FOUND: "Language not found.",
  CODE_ALREADY_EXISTS: "Language code already exists.",
} as const;

export const COUNTRY_MESSAGES = {
  FETCH_SUCCESS: "Countries fetched successfully.",
  FETCH_ONE_SUCCESS: "Country fetched successfully.",
  CREATED_SUCCESS: "Country created successfully.",
  UPDATED_SUCCESS: "Country updated successfully.",
  DELETED_SUCCESS: "Country deleted successfully.",
  NOT_FOUND: "Country not found.",
  CODE_ALREADY_EXISTS: "Country code already exists.",
} as const;

export const TAG_MESSAGES = {
  FETCH_SUCCESS: "Tags fetched successfully.",
  FETCH_ONE_SUCCESS: "Tag fetched successfully.",
  CREATED_SUCCESS: "Tag created successfully.",
  UPDATED_SUCCESS: "Tag updated successfully.",
  DELETED_SUCCESS: "Tag deleted successfully.",
  NOT_FOUND: "Tag not found.",
  SLUG_EXISTS: "Tag slug already exists.",
} as const;

export const PERSON_MESSAGES = {
  LIST_SUCCESS: "People fetched successfully.",
  GET_SUCCESS: "Person fetched successfully.",
  CREATE_SUCCESS: "Person created successfully.",
  UPDATE_SUCCESS: "Person updated successfully.",
  DELETE_SUCCESS: "Person deleted successfully.",
  NOT_FOUND: "Person not found.",
  NAME_EXISTS: "Person name already exists.",
  SLUG_EXISTS: "Person slug already exists.",
} as const;

export const STUDIO_MESSAGES = {
  LIST_SUCCESS: "Studios fetched successfully.",
  GET_SUCCESS: "Studio fetched successfully.",
  CREATE_SUCCESS: "Studio created successfully.",
  UPDATE_SUCCESS: "Studio updated successfully.",
  DELETE_SUCCESS: "Studio deleted successfully.",
  NOT_FOUND: "Studio not found.",
  NAME_EXISTS: "Studio name already exists.",
  SLUG_EXISTS: "Studio slug already exists.",
} as const;

export const MOVIE_MESSAGES = {
  LIST_SUCCESS: "Movies fetched successfully.",
  GET_SUCCESS: "Movie fetched successfully.",
  CREATE_SUCCESS: "Movie created successfully.",
  UPDATE_SUCCESS: "Movie updated successfully.",
  DELETE_SUCCESS: "Movie deleted successfully.",
  NOT_FOUND: "Movie not found.",
  CONTENT_NOT_FOUND: "Content not found.",
  CONTENT_ALREADY_ASSIGNED: "Content is already assigned to another movie.",
} as const;

export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

export const TV_SHOW_MESSAGES = {
  LIST_SUCCESS: "TV shows fetched successfully.",
  GET_SUCCESS: "TV show fetched successfully.",
  CREATE_SUCCESS: "TV show created successfully.",
  UPDATE_SUCCESS: "TV show updated successfully.",
  DELETE_SUCCESS: "TV show deleted successfully.",
  NOT_FOUND: "TV show not found.",
  CONTENT_NOT_FOUND: "Content not found.",
  CONTENT_ALREADY_ASSIGNED: "Content is already assigned to another TV show.",
} as const;

export const SEASON_MESSAGES = {
  LIST_SUCCESS: "Seasons fetched successfully.",
  GET_SUCCESS: "Season fetched successfully.",
  CREATE_SUCCESS: "Season created successfully.",
  UPDATE_SUCCESS: "Season updated successfully.",
  DELETE_SUCCESS: "Season deleted successfully.",
  NOT_FOUND: "Season not found.",
  TV_SHOW_NOT_FOUND: "TV show not found.",
  SEASON_ALREADY_EXISTS: "Season number already exists for this TV show.",
} as const;

export const EPISODE_MESSAGES = {
  LIST_SUCCESS: "Episodes fetched successfully.",
  GET_SUCCESS: "Episode fetched successfully.",
  CREATE_SUCCESS: "Episode created successfully.",
  UPDATE_SUCCESS: "Episode updated successfully.",
  DELETE_SUCCESS: "Episode deleted successfully.",
  NOT_FOUND: "Episode not found.",
  SEASON_NOT_FOUND: "Season not found.",
  EPISODE_ALREADY_EXISTS: "Episode number already exists for this season.",
} as const;

export const VIDEO_SOURCE_MESSAGES = {
  LIST_SUCCESS: "Video sources fetched successfully.",
  GET_SUCCESS: "Video source fetched successfully.",
  CREATE_SUCCESS: "Video source created successfully.",
  UPDATE_SUCCESS: "Video source updated successfully.",
  DELETE_SUCCESS: "Video source deleted successfully.",
  NOT_FOUND: "Video source not found.",
  CONTENT_NOT_FOUND: "Content not found.",
  EPISODE_NOT_FOUND: "Episode not found.",
} as const;

export const SUBTITLE_MESSAGES = {
  LIST_SUCCESS: "Subtitles fetched successfully.",
  GET_SUCCESS: "Subtitle fetched successfully.",
  CREATE_SUCCESS: "Subtitle created successfully.",
  UPDATE_SUCCESS: "Subtitle updated successfully.",
  DELETE_SUCCESS: "Subtitle deleted successfully.",
  NOT_FOUND: "Subtitle not found.",
  CONTENT_NOT_FOUND: "Content not found.",
} as const;

export const AUDIO_TRACK_MESSAGES = {
  LIST_SUCCESS: "Audio tracks fetched successfully.",
  GET_SUCCESS: "Audio track fetched successfully.",
  CREATE_SUCCESS: "Audio track created successfully.",
  UPDATE_SUCCESS: "Audio track updated successfully.",
  DELETE_SUCCESS: "Audio track deleted successfully.",
  NOT_FOUND: "Audio track not found.",
  CONTENT_NOT_FOUND: "Content not found.",
} as const;

export const RATING_MESSAGES = {
  LIST_SUCCESS: "Ratings fetched successfully.",
  GET_SUCCESS: "Rating fetched successfully.",
  CREATE_SUCCESS: "Rating created successfully.",
  UPDATE_SUCCESS: "Rating updated successfully.",
  DELETE_SUCCESS: "Rating deleted successfully.",
  NOT_FOUND: "Rating not found.",
  PROFILE_NOT_FOUND: "Profile not found.",
  CONTENT_NOT_FOUND: "Content not found.",
} as const;
