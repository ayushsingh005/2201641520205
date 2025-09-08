import React, { useState } from 'react'
import { TextField, Button, Grid, Alert, Stack } from '@mui/material'
import { log } from '../middleware/loggingMiddleware'

function generateShortcode(url) {
  return btoa(url + Date.now()).slice(0, 7)
}

export default function UrlShortenerForm({ onShortened }) {
  const [inputs, setInputs] = useState([{ url: '', validity: '', shortcode: '' }])
  const [error, setError] = useState('')

  function handleChange(idx, field, value) {
    const updated = inputs.map((item, i) => i === idx ? { ...item, [field]: value } : item)
    setInputs(updated)
  }

  function addField() {
    if (inputs.length < 5)
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }])
  }

  function validateUrl(url) {
    try {
      return Boolean(new URL(url))
    } catch {
      return false
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const results = []
    for (let input of inputs) {
      if (!validateUrl(input.url)) {
        setError('Invalid URL format')
        log('Invalid URL', input.url)
        return
      }
      let validity = parseInt(input.validity)
      if (isNaN(validity) || validity < 1) validity = 30
      let sc = input.shortcode.trim()
      if (sc && (!/^[a-zA-Z0-9]{3,10}$/.test(sc))) {
        setError('Shortcode must be alphanumeric, 3-10 chars')
        log('Invalid shortcode', sc)
        return
      }
      if (!sc) sc = generateShortcode(input.url)
      results.push({
        url: input.url,
        shortened: window.location.origin + '/' + sc,
        expiry: new Date(Date.now() + validity * 60000).toISOString(),
        shortcode: sc
      })
      log('URL shortened', { url: input.url, shortcode: sc, validity })
    }
    onShortened(results)
  }

  return (
    <Stack spacing={2}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {inputs.map((input, idx) => (
            <Grid item xs={12} key={idx}>
              <Stack spacing={2}>
                <TextField
                  label="Long URL"
                  fullWidth
                  value={input.url}
                  onChange={e => handleChange(idx, 'url', e.target.value)}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label="Validity (minutes)"
                      type="number"
                      fullWidth
                      value={input.validity}
                      onChange={e => handleChange(idx, 'validity', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Shortcode (optional)"
                      fullWidth
                      value={input.shortcode}
                      onChange={e => handleChange(idx, 'shortcode', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {inputs.length < 5 && <Button variant="outlined" onClick={addField}>Add URL</Button>}
          <Button variant="contained" color="primary" type="submit">Shorten URLs</Button>
        </Stack>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </Stack>
  )
}
