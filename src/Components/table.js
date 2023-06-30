import React, { useState } from 'react';
import Pagination from '../pagination';


const Table = ({data,headings,deleteFn,editFn}) => {
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div >    
     
    <table className="viewtable" border={2} align="center">
      <thead>
        <tr>
          {headings.map(column => (
            <th key={column}>{column.toUpperCase()}</th>
          ))}
           {(deleteFn&&editFn)?(<th>ACTION&emsp;</th>):""}
        </tr>
      </thead>
      <tbody>
        {currentItems.map(row => (
          <tr key={row.id}>
            {headings.map(column => (
              <td key={column}>{row[column]}</td>
             
            ))}
            {deleteFn&&editFn?(
             <td><i className="fa-solid fa-pen-to-square" data-testid="EditButton"  onClick={() =>editFn(row.id)} style={{color:"blue",fontSize:20}}>
              </i>&emsp;
              <i className="fa-solid fa-circle-xmark" data-testid="DeleteButton" onClick={() =>deleteFn(row.id)} style={{color:"red",fontSize:20}}>

              </i>
            </td>):""}
          
            
          </tr>
        ))}
      </tbody>
   
    </table>
    <Pagination
      itemsPerPage={itemsPerPage}
      totalItems={data.length}
      paginate={paginate}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />
    </div>
    )
};

export default Table;



