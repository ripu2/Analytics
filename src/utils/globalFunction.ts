import { CalculationType } from "./types";

//modular function to calculate different type of analytical calculations, need to pass the data and type as arguments

export const analyticalCalculator = (calculationType: CalculationType, data: number[]) => {
  switch(calculationType) {
    case CalculationType.mean: {
      const sampleSize = data.length;
      const sum = data.reduce((sampleData: number, accumulator: number) => {
        return sampleData + accumulator;
      })

      return (sum/sampleSize).toFixed(3);
    }

    case CalculationType.median: {
      const sampleSize = data.length;
      const dupData = data.sort();
      if(sampleSize % 2 !==0) return Number(dupData[(sampleSize+1)/2]).toFixed(3);
      else return  Number((dupData[sampleSize/2]+dupData[(sampleSize/2)+1])/2).toFixed(3)
    } 
  
    case CalculationType.mode: {
      const dupData = data.sort();
      let obj: any = {}
      dupData.forEach((ele: any) => {
        if(ele in obj) obj[ele]++
        else obj[ele] = 1
      })
      const entries = Object.entries(obj).sort((first: any,second: any) => second[1] - first[1]);
      return (Number(entries[0][0])).toFixed(3); 
    }
  } 
}