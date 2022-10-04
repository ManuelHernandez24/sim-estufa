import { DataTable, DataTableExpandedRows } from 'primereact/datatable';
import { Column, ColumnBodyType, ColumnProps } from 'primereact/column';
import { ComponentsWithTime } from '../models';
import { useState } from 'react';
import formatNumber from '../utils/formatNumber';

interface SimDTProps {
  data: ComponentsWithTime[];
}

const SimDT: React.FC<SimDTProps> = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState<DataTableExpandedRows>({});

  const numericBody: ColumnBodyType = (data, options) => {
    const value = data[options.field];

    return (
      <span className={`${value > 0 ? 'text-sky-600' : 'text-red-500'}`}>
        {formatNumber(value ?? 0)}
      </span>
    );
  };

  const columns: ColumnProps[] = [
    { field: 'time', header: 'Mes' },
    { field: 'density', header: 'Densidad (persona/km2)', body: numericBody },
    { field: 'contamination', header: 'Contaminación (AQI)', body: numericBody },
    { field: 'capital', header: 'Capital ($)', body: numericBody }
  ];

  const expandedColumns: ColumnProps[] = [
    { field: 'name', header: 'Crecimiento de ' },
    { field: 'density', header: 'Densidad (persona/km2)', body: numericBody },
    { field: 'contamination', header: 'Contaminación (AQI)', body: numericBody },
    { field: 'capital', header: 'Capital ($)', body: numericBody }
  ];

  const rowExpansionTemplate = (data: ComponentsWithTime) => (
    <DataTable value={data.growth} responsiveLayout="scroll" size={'small'}>
      {expandedColumns.map((col) => (
        <Column {...col} sortable />
      ))}
    </DataTable>
  );

  return (
    <DataTable
      paginator
      value={data}
      rows={10}
      rowsPerPageOptions={[10, 20, 50]}
      expandedRows={expandedRows}
      onRowToggle={(e) => {
        setExpandedRows(e.data as DataTableExpandedRows);
      }}
      responsiveLayout="scroll"
      rowExpansionTemplate={rowExpansionTemplate}
      dataKey="id"
      size={'small'}>
      <Column expander style={{ width: '3em' }} />
      {columns.map((col) => (
        <Column {...col} sortable />
      ))}
    </DataTable>
  );
};

export default SimDT;
