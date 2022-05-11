import React from 'react';
import {
  Pagination, PaginationItem,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { withStyles } from '@mui/styles';
import _ from 'lodash';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import useIsLtr from '../hooks/useIsLtr';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f2f2f4',
    },
  },
}))(TableRow);

export default (props) => {
  const { paginationInfo, handlePagination } = props;
  const isLtr = useIsLtr();
  const getTds = (item) => (_.map(item, (value, key) => (
    <TableCell key={key} component="td" scope="row" align="center">
      {value}
    </TableCell>
  )));

  const handlePageChange = (e, value) => {
    if (handlePagination) handlePagination(value - 1);
    // gotoPage(value - 1);
  };

  return (
    <div>
      <TableContainer style={{ direction: 'rtl' }}>
        <Table size="small" aria-label="a dense table" className={props.tableClassName}>
          <TableHead>
            <TableRow>
              {
                props.headerData.map((item, index) => (
                  <TableCell align="center" key={index}>{item}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {

              props.data?.map((item, index) => (
                <StyledTableRow
                  style={{ cursor: props.rowOnClick ? 'pointer' : 'unset' }}
                  key={index}
                  onClick={props.rowOnClick ? () => props.rowOnClick(item) : () => {}}
                  onContextMenu={props.onContextMenu ? () => props.onContextMenu(item) : () => {}}
                >
                  {
                    getTds(Object.fromEntries(
                      Object.entries(item).slice(0, (props.headerData).length),
                    ))
                  }
                </StyledTableRow>
              ))
            }
          </TableBody>
        </Table>
        {
          paginationInfo && paginationInfo.pageCount > 1
          && (

             <div className="paginationBtns">
               <Pagination
                 count={paginationInfo.pageCount}
                 renderItem={(item) => (
                   <PaginationItem
                     components={{
                       previous: isLtr ? ArrowBackIosIcon : ArrowForwardIosIcon,
                       next: !isLtr ? ArrowBackIosIcon : ArrowForwardIosIcon,
                       last: isLtr ? LastPageIcon : FirstPageIcon,
                       first: isLtr ? FirstPageIcon : LastPageIcon,
                     }}
                     {...item}
                   />
                 )}
                 style={{
                   display: 'flex',
                   justifyContent: 'center',
                   direction: !isLtr ? 'rtl' : 'ltr',
                 }}
                 color="primary"
                 onChange={handlePageChange}
                 showFirstButton
                 showLastButton
               />
             </div>

          )
        }
      </TableContainer>
    </div>
  );
};
