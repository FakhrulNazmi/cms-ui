import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';
import './Table.css';

// Table Component
const Table = ({ data }) => {
  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'certificate_name' },
      { Header: 'Description', accessor: 'description' },
      {
        Header: 'Created Date',
        accessor: 'created_at',
        id: 'created_date', // Explicit id
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format date
      },
      {
        Header: 'Created Time',
        accessor: 'created_at',
        id: 'created_time', // Explicit id
        Cell: ({ value }) => new Date(value).toLocaleTimeString(), // Format time
      },
      {
        Header: 'Updated Date',
        accessor: 'updated_at',
        id: 'updated_date', // Explicit id
        Cell: ({ value }) => new Date(value).toLocaleDateString(), // Format date
      },
      {
        Header: 'Updated Time',
        accessor: 'updated_at',
        id: 'updated_time', // Explicit id
        Cell: ({ value }) => new Date(value).toLocaleTimeString(), // Format time
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="table">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Certificate Component
const Certificate = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:27017/certificate', {
        method: 'GET',
        headers: { token: localStorage.token },
      });
      const cert = await response.json();
      setData(cert);
      console.log(JSON.stringify(cert)); // Log the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Fragment>
      <h1>Certificate</h1>
      <div className="table-container">
        <Table data={data} /> {/* Pass the data to Table component */}
      </div>
    </Fragment>
  );
};

export default Certificate;
