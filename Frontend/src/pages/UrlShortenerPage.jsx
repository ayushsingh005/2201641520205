import React, { useState } from 'react'
import { Container, Typography, Button, Paper, Alert, Stack } from '@mui/material'
import UrlShortenerForm from '../components/UrlShortenerForm'
import ShortLinkList from '../components/ShortLinkList'
import { useNavigate } from 'react-router-dom'

export default function UrlShortenerPage() {
  const [links, setLinks] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  function handleShortened(results) {
    const existing = JSON.parse(localStorage.getItem('shortenedLinks') || '[]')
    const updated = [...existing, ...results]
    localStorage.setItem('shortenedLinks', JSON.stringify(updated))
    setLinks(results)
    setMessage('URLs shortened successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  function goToStats() {
    navigate('/stats')
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', color: 'primary.main' }}>
        URL Shortener
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
        <UrlShortenerForm onShortened={handleShortened} />
      </Paper>

      {links.length > 0 && (
        <Stack spacing={2}>
          <Typography variant="h6">Recently Shortened Links</Typography>
          <ShortLinkList links={links} />
        </Stack>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={goToStats}
        sx={{ mt: 3 }}
      >
        View Statistics
      </Button>
    </Container>
  )
}
