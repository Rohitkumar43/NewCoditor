export interface User {
  id: string;
  email: string;
  subscription?: {
    isValid: boolean;
    expiresAt: string;
  };
}
