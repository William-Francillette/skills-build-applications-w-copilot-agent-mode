import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(usersEndpoint, controller.signal)
      .then((items) => {
        setUsers(items)
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
    return <p className="status-copy">Loading users...</p>
  }

  if (status === 'error') {
    return <p className="status-copy error">Could not load users: {error}</p>
  }

  return (
    <section className="data-section">
      <div className="section-heading">
        <p className="eyebrow">Members</p>
        <h1>Users</h1>
      </div>
      <div className="data-grid">
        {users.map((user) => (
          <article className="data-card" key={user._id ?? user.email ?? user.name}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <dl>
              <div>
                <dt>Team</dt>
                <dd>{user.team}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </div>
              <div>
                <dt>Active minutes</dt>
                <dd>{user.activeMinutes}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Users
