import React from 'react'
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material'

export default function AnalyticsTable({ analytics }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Short URL</TableCell>
            <TableCell>Created</TableCell>
            <TableCell>Expiry</TableCell>
            <TableCell>Clicks</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analytics.map((row, idx) => (
            <TableRow key={idx}>
              <TableCell><a href={row.shortened} target="_blank" rel="noopener noreferrer">{row.shortened}</a></TableCell>
              <TableCell>{new Date(row.created).toLocaleString()}</TableCell>
              <TableCell>{new Date(row.expiry).toLocaleString()}</TableCell>
              <TableCell>{row.clicks}</TableCell>
              <TableCell>
                {row.clickDetails.map((cd, i) => (
                  <div key={i}>
                    {new Date(cd.time).toLocaleString()}, {cd.source}, {cd.geo}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
