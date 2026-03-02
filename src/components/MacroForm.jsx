import { useState } from 'react'
import './MacroForm.css'

function MacroForm() {
  const [unit, setUnit] = useState('metric')
  const [selectedGoal, setSelectedGoal] = useState('maintenance')

  return (
    <div className="form-card">
      <form className="form-content">

        {/* Unit System */}
        <div className="form-group">
          <label>Unit System:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                checked={unit === 'metric'}
                onChange={() => setUnit('metric')}
              />
              Metric
            </label>

            <label>
              <input
                type="radio"
                checked={unit === 'imperial'}
                onChange={() => setUnit('imperial')}
              />
              Imperial
            </label>
          </div>
        </div>

        {/* Weight Height Age */}
        <div className="form-row">
          <div className="input-group">
            <label>Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
            <input type="number" />
          </div>

          <div className="input-group">
            <label>Height</label>
            {unit === 'metric' ? (
              <input type="number" placeholder="cm" />
            ) : (
              <div className="height-row">
                <input type="number" placeholder="ft" />
                <input type="number" placeholder="in" />
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Age</label>
            <input type="number" />
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="gender" defaultChecked />
              Male
            </label>
            <label>
              <input type="radio" name="gender" />
              Female
            </label>
          </div>
        </div>

        {/* Activity */}
        <div className="form-group">
          <label>Activity Level:</label>
          <select>
            <option>Sedentary (little or no exercise)</option>
            <option>Lightly active (1-3 days/week)</option>
            <option>Moderately active (3-5 days/week)</option>
            <option>Very active (6-7 days/week)</option>
            <option>Extra active (athlete)</option>
          </select>
        </div>

        {/* Goals */}
        <div className="form-group">
          <label>Goal:</label>
          <div className="goal-grid">
            {[
              { value: 'lean-bulk', label: 'Lean Bulk' },
              { value: 'maintenance', label: 'Maintenance' },
              { value: 'cut', label: 'Cut' },
              { value: 'extreme-cut', label: 'Extreme Cut (mini cut)' },
            ].map((goal) => (
              <button
                type="button"
                key={goal.value}
                className={`goal-btn ${selectedGoal === goal.value ? 'active' : ''}`}
                onClick={() => setSelectedGoal(goal.value)}
              >
                {goal.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="action-row">
          <button type="button" className="primary-btn">
            Submit
          </button>
          <button type="button" className="secondary-btn">
            Clear
          </button>
        </div>

      </form>
    </div>
  )
}

export default MacroForm