import { Response } from "express";

export interface ApiResponse extends Response {
  populate: (data: any) => Response;
  answer: (status: number, data: any) => Response;
  terminate: (status: number, message: string) => void;
}
