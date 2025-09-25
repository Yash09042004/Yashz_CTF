import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Leaderboard(){
  const [list, setList] = useState([])
  const [name, setName] = useState('')
  const [score, setScore] = useState('')
  const [loading, setLoading] = useState(false)

  const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(()=>{
    fetchList()
  }, [])

  async function fetchList(){
    setLoading(true)
    try{
      const res = await axios.get(API + '/api/leaderboard')
      setList(res.data)
    }catch(e){
      console.error(e)
    }
    setLoading(false)
  }

  async function submit(e){
    e.preventDefault()
    const sc = parseInt(score,10)
    if(!name || isNaN(sc)) return
    try{
      await axios.post(API + '/api/leaderboard', { username: name, score: sc })
      setName('')
      setScore('')
      fetchList()
    }catch(e){
      console.error(e)
    }
  }

  return (
    <div className="leaderboard">
      <form onSubmit={submit} className="submit-form">
        <input placeholder="Username" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Score" value={score} onChange={e=>setScore(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {loading ? <div>Loading...</div> : (
        <table>
          <thead><tr><th>Rank</th><th>Username</th><th>Score</th></tr></thead>
          <tbody>
            {list.map((item, idx)=> (
              <tr key={item._id}><td>{idx+1}</td><td>{item.username}</td><td>{item.score}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
