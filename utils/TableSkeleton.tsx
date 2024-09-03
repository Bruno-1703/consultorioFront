import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const TableSkeleton = ({ rows = 5, columns = 5 }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {Array.from(new Array(columns)).map((_, index) => (
            <TableCell key={index}>
              <Skeleton variant="text" width={250} height={30} />
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from(new Array(rows)).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {Array.from(new Array(columns)).map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton variant="rectangular" height={40} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
