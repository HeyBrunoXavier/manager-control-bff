export interface ProjectResDto {
  name: string;
  client: string;
  address: string;
  uf: string;
  house_number: number;
  status: "initialized" | "in progress" | "stopped" | "finished";
  area: number;
  price: number;
  userId?: string;
  createdAt?: Date;
}

export interface ListProjectResDto {
  projects: ProjectResDto[];
}

export interface CreatedProjectResDto {
  project: ProjectResDto;
}
