export interface Hash {
  create(data: string): Promise<string>;
  compare(info: string, hashedData: string): Promise<boolean>
}
