import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UrlShortenerPage from '../pages/UrlShortenerPage'
import StatisticsPage from '../pages/StatisticsPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UrlShortenerPage />} />
        <Route path="/stats" element={<StatisticsPage />} />
        <Route path="/:shortcode" element={<UrlShortenerPage />} />
      </Routes>
    </BrowserRouter>
  )
}
