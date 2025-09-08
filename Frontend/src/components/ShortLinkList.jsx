import React from 'react'
import { List, ListItem, ListItemText, Paper } from '@mui/material'

export default function ShortLinkList({ links }) {
  return (
    <Paper sx={{ p: 2 }}>
      <List>
        {links.map((link, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={<a href={link.shortened} target="_blank" rel="noopener noreferrer">{link.shortened}</a>}
              secondary={`Expiry: ${new Date(link.expiry).toLocaleString()}, Original: ${link.url}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
