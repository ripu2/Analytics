import { WineData } from "../../../utils/types";

export type ClassWiseData = Record<string, WineData[]>;

export enum Fields {
  Flavanoids = "Flavanoids",
  Gamma = "Gamma",
}