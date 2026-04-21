import { useState } from 'react'
import './MacroForm.css'

function MacroForm() {
  const [unit, setUnit] = useState('metric')
  const [selectedGoal, setSelectedGoal] = useState('maintenance')
  const [weight, setWeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [heightCm, setHeightCm] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('sedentary')
  const [results, setResults] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically calculate the macros based on the input values

    //log para ver los valores ingresados
    console.log({
      unit,
      weight,
      height: unit === 'metric' ? `${heightCm} cm` : `${heightFt}ft ${heightIn}in`,
      age,
      gender,
      activity
    })

    //calculate macros using the input values and selected goal
    const numericWeight = 
      unit === 'metric'
        ? parseFloat(weight)
        : parseFloat(weight) * 0.453592 // Convert lbs to kg
    const numericAge = parseInt(age, 10)
    
    const numericHeight = unit === 'metric' ? parseFloat(heightCm) : (parseFloat(heightFt) * 30.48) + (parseFloat(heightIn) * 2.54)
    const activityMultiplier = {
      sedentary: 1.2,
      'lightly active': 1.375,
      'moderately active': 1.55,
      'very active': 1.725,
      'extra active': 1.9
    }[activity]
    
    const genderMultiplier = gender === 'male' ? 5 : -161

    // Calculate BMR using Mifflin-St Jeor Equation
    const bmr = 
      (10 * numericWeight) + 
      (6.25 * numericHeight) - 
      (5 * numericAge) + 
      genderMultiplier
    const maintenanceCalories = bmr * activityMultiplier

    let goalCalories = maintenanceCalories
    if (selectedGoal === 'lean-bulk') {
      goalCalories += 250 // Add calories for lean bulk
    } else if (selectedGoal === 'cut') {
      goalCalories -= 500 // Subtract calories for cut
    } else if (selectedGoal === 'extreme-cut') {
      goalCalories -= 700 // Subtract more calories for extreme cut
    }

    //calculate macros based on goal calories
    const protein = numericWeight * 2 // 2g of protein per kg of body weight
    const fat = (goalCalories * 0.25) / 9 // 25% of the calories from fat, divided by 9 to convert to grams
    const carbs = (goalCalories - (protein * 4) - (fat * 9)) / 4 // The rest of the calories for carbohydrates, divided by 4 to convert to grams

    setResults({
      calories: goalCalories,
      protein,
      fat,
      carbs,
      goal: selectedGoal,
    })


    console.log('Maintenance Calories:', maintenanceCalories)
    console.log('Goal Calories:', goalCalories)
    console.log('Selected Goal:', selectedGoal)
    console.log('Calories:', goalCalories)
    console.log('Protein:', protein)
    console.log('Fats:', fat)
    console.log('Carbs:', carbs)


  }

  return (
    <div className="form-card">
      <form className="form-content" onSubmit={handleSubmit}>

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
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Height</label>
            {unit === 'metric' ? (
              <input 
              type="number" 
              placeholder="cm" 
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
            ) : (
              <div className="height-row">
                <input 
                  type="number" 
                  placeholder="ft" 
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="in" 
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="input-group">
            <label>Age</label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
            />
          </div>
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender:</label>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                name="gender" 
                checked={gender === 'male'}
                onChange={() => setGender('male')}
              />
              Male
            </label>
            <label>
              <input 
                type="radio" 
                name="gender" 
                checked={gender === 'female'}
                onChange={() => setGender('female')}
              />
              Female
            </label>
          </div>
        </div>

        {/* Activity */}
        <div className="form-group">
          <label>Activity Level:</label>
          <select value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light active">Lightly active (1-3 days/week)</option>
            <option value="moderate active">Moderately active (3-5 days/week)</option>
            <option value="very active">Very active (6-7 days/week)</option>
            <option value="extra active">Extra active (athlete)</option>
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
          <button type="Submit" className="primary-btn">
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