import './style.css'

import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useAnalytics, useWinData } from '../hooks/hooks';

import { Fields } from '../types';
import TableContainer from '../components/TableContainer'

function AnalyticsPage() {
  const [tableColumns, setTableColumns] = useState<string[]>([]);                                             // this state stores the table header in form of array

  const { getClasses, segregatedData } = useWinData();                                                        // custom hooks that return different classes of alcohol and data arranged with class and data in form of object

  const { getFieldData } = useAnalytics();                                                                    // custom hooks that return data for various fields

  const fetchColumns = useCallback(() => {
    const response = getClasses();
    setTableColumns(response.map((data: number) => {
      return `Class ${data}`
    }))
  }, [getClasses])

  useLayoutEffect(() => {                                                                                     // using useLayoutEffect instead of using useEffect because we want to load the data before first render
    fetchColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])                                                                                                      // since we want to fetch columns only before the first render, that's why haven't added any dependencies

  const flavanoidsData = useMemo(() => {
    return getFieldData(Fields.Flavanoids, tableColumns.length, segregatedData)
  }, [getFieldData, segregatedData, tableColumns.length])

  const gammaData = useMemo(() => {
    return getFieldData(Fields.Gamma, tableColumns.length, segregatedData)
  }, [getFieldData, segregatedData, tableColumns.length])


  return (
    <React.Fragment>
      <div className='AnalyticsPageTableContainer'>
        <TableContainer headers={tableColumns} tableData={flavanoidsData} />
        <TableContainer headers={tableColumns} tableData={gammaData} />
      </div>
    </React.Fragment>
  )
}

export default AnalyticsPage