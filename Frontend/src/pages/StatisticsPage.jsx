import React, { useState, useEffect } from 'react'
import { Container, Typography, Paper } from '@mui/material'
import AnalyticsTable from '../components/AnalyticsTable'

export default function StatisticsPage() {
  const [analytics, setAnalytics] = useState([])

  useEffect(() => {
    let stored = localStorage.getItem('shortenedLinks')
    if (stored) {
      let links = JSON.parse(stored)
      setAnalytics(links.map(link => ({
        shortened: link.shortened,
        created: new Date(Date.now() - 30 * 60000).toISOString(),
        expiry: link.expiry,
        clicks: Math.floor(Math.random() * 100),
        clickDetails: [
          { time: new Date().toISOString(), source: 'web', geo: 'IN' }
        ]
      })))
    }
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
         URL Statistics
      </Typography>
      <Paper sx={{ p: 2 }}>
        <AnalyticsTable analytics={analytics} />
      </Paper>
    </Container>
  )
}
