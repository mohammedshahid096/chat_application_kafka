export interface UserSchemaType {
  id: string;
  name: string;
  email: string;
  password?: string;
  profileUrl: string | null;
  created_at?: Date;
}
