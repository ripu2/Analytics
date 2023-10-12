import { CalculationType, WineData } from "../../../utils/types"
import { ClassWiseData, Fields } from "../types"
import { useCallback, useState } from "react"

import { analyticalCalculator } from "../../../utils/globalFunction"

const wineData: WineData[] = require('../../../utils/data.json')

export function useWinData(){
  const [segregatedData, setSegregateData] = useState<ClassWiseData>({})

  const segregateData = (classes: number[]) => {                                                                               // function that is making class wise data for better segregation and access to data
    let classWiseData: ClassWiseData = {}
    const updatedWineData =  wineData.map((wine: WineData) => {
      return {
        ...wine,
        Gamma: (wine.Ash * wine.Hue) / wine.Magnesium                                                                          //adding gamma value in data only in order to avoid same calculation every time
      }
    })
    classes.forEach((classNumber: number) => {
        const currentClassData: WineData[] = updatedWineData.filter((wine: WineData) => wine.Alcohol === classNumber)
        classWiseData = {
          ...classWiseData,
          [`Class ${classNumber}`]: currentClassData
        }
        
    })
    setSegregateData(classWiseData);
  }

  const getClasses = () => {
    const unique = [...new Set(wineData.map((item: WineData) => item.Alcohol))]                                                   // function to extract the unique classes from the data set
    segregateData(unique);
   return unique;
  }

  return {getClasses, segregatedData}
}



export function useAnalytics() {

  const handleCalculations = useCallback((data: WineData[], operation: CalculationType, field: Fields) => {
    let arr: number[] = []
    data.forEach((ele: WineData) => {
      arr = [...arr, Number(ele[field])]
    })
    return analyticalCalculator(operation, arr);
  }, [])

  const generateData = useCallback((field: Fields, operation: CalculationType, columnSize: number, data: ClassWiseData) => {      // function to generates data and do the necessary calculation
    let arr: any = [`${field} ${operation}`]
    for (let i = 0; i < columnSize; i++) {
      arr = [
        ...arr,
        handleCalculations(data[`Class ${i + 1}`], operation, field)
      ]
    }

    return arr
  }, [handleCalculations])

  const getFieldData = useCallback((fieldName: Fields, dataSize: number, data: ClassWiseData) => {                                 //function transforms data into array form so that it can be rendered into given segments
    return Object.values(CalculationType).map((calculation: CalculationType) => {
      return [...generateData(fieldName, calculation, dataSize , data)]
    })
  }, [generateData])

  return {handleCalculations, generateData, getFieldData}
}