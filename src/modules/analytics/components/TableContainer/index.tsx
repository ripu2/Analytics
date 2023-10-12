import './style.css'

import React, { useCallback, useMemo } from 'react'

import { TableContainerProps } from './types'

function TableContainer(props: TableContainerProps) {
  const { headers, tableData } = props;

  const renderValues = useCallback((element: string[]) => {
    return element.map((innerElement: string, index: number) => {
      return <td key={index}>{innerElement}</td>
    })
  }, [])

  const renderRows = useMemo(() => {
    return tableData.map((tableElement: string[], index: number) => {
      return <tr key={index}>
        {renderValues(tableElement)}
      </tr>
    });
  }, [tableData, renderValues])

  const renderColumns = useMemo(() => {
    return headers.map((column: string, index: number) => {
      return (
        <th key={index}>{column}</th>
      )
    })
  }, [headers])

  return (
    <table>
      <tr>
        <th>Measure</th>

        {renderColumns}
      </tr>
      {renderRows}
    </table>
  )
}

export default React.memo(TableContainer)