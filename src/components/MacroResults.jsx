import './MacroResults.css'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

function MacroResults({ results, onClear }) {

  
  const data = [
    { name: 'Protein', value: Math.round(results.protein), color: '#ca0000' },
    { name: 'Fats', value: Math.round(results.fat), color: '#cea427' },
    { name: 'Carbs', value: Math.round(results.carbs), color: '#21b121' }
  ]

  return (
    <div className="results-card">
      <h2>Your Macro Results</h2>

      
      <div className="chart-container">

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={75}
              outerRadius={105}
              paddingAngle={4}
            >
              
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="calories-center">
          <strong>{Math.round(results.calories)}</strong>
        </div>
      </div>

      <div className="macro-list">
        <p>Protein: {Math.round(results.protein)}g</p>
        <p>Fats: {Math.round(results.fat)}g</p>
        <p>Carbs: {Math.round(results.carbs)}g</p>
      </div>

      <div className="results-action">
        <button type="button" className="results-clear-btn" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default MacroResults
