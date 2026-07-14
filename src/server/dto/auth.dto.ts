export interface AuthResponseDto {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;

  profiles: {
    id: string;
    name: string;
    avatar: string | null;
    isPrimary: boolean;
    type: string;
  }[];
}