export interface GetTestTeaDTO {
  id: string;
  points: number; 
  levelTEA: number;
  obs?: string;
  createdDate: string; 
}

export interface TestTeaDTO {
  idChild: string;
  test: { [key: string]: number };
}