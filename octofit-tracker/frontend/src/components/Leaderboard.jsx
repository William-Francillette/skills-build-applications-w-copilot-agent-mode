import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(leaderboardEndpoint, controller.signal)
      .then((items) => {
        setLeaderboard(items)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message)
          setStatus('error')
        }
      })

    return () => controller.abort()
  }, [])

  if (status === 'loading') {
    return <p className="status-copy">Loading leaderboard...</p>
  }

  if (status === 'error') {
    return <p className="status-copy error">Could not load leaderboard: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Rankings</p>
        <h1>Leaderboard</h1>
      </div>
      <div className="leaderboard-list">
        {leaderboard.map((entry) => (
          <article className="rank-row" key={entry._id ?? entry.rank}>
            <span className="rank">#{entry.rank}</span>
            <div>
              <h2>{entry.user}</h2>
              <p>{entry.team}</p>
            </div>
            <strong>{entry.points} pts</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Leaderboard
