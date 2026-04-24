import { useState } from 'react'
import './MacroForm.css'
import MacroResults from './MacroResults'

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

  const numericWeight = parseFloat(weight)
  const numericAge = parseInt(age, 10)
  const numericHeightCm = parseFloat(heightCm)
  const numericHeightFt = parseFloat(heightFt)
  const numericHeightIn = parseFloat(heightIn)

  const isWeightValid = Number.isFinite(numericWeight) && numericWeight > 0
  const isAgeValid = Number.isInteger(numericAge) && numericAge > 0
  const isMetricHeightValid = Number.isFinite(numericHeightCm) && numericHeightCm > 0
  const isImperialHeightValid =
    Number.isFinite(numericHeightFt) &&
    numericHeightFt > 0 &&
    Number.isFinite(numericHeightIn) &&
    numericHeightIn >= 0 &&
    numericHeightIn < 12

  const isFormValid =
    isWeightValid &&
    isAgeValid &&
    (unit === 'metric' ? isMetricHeightValid : isImperialHeightValid)

  const handleClear = () => {
    setUnit('metric')
    setSelectedGoal('maintenance')
    setWeight('')
    setHeightFt('')
    setHeightIn('')
    setHeightCm('')
    setAge('')
    setGender('male')
    setActivity('sedentary')
    setResults(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isFormValid) {
      setResults(null)
      return
    }

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
    const calculatedWeight = 
      unit === 'metric'
        ? numericWeight
        : parseFloat(weight) * 0.453592 // Convert lbs to kg
    
    const numericHeight = unit === 'metric'
      ? numericHeightCm
      : (numericHeightFt * 30.48) + (numericHeightIn * 2.54)
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
      (10 * calculatedWeight) + 
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
    const protein = calculatedWeight * 2 // 2g of protein per kg of body weight
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
              min="1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Height</label>
            {unit === 'metric' ? (
              <input 
              type="number" 
              min="1"
              placeholder="cm" 
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
            ) : (
              <div className="height-row">
                <input 
                  type="number" 
                  min="1"
                  placeholder="ft" 
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                />
                <input 
                  type="number" 
                  min="0"
                  max="11"
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
              min="1"
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
            <option value="lightly active">Lightly active (1-3 days/week)</option>
            <option value="moderately active">Moderately active (3-5 days/week)</option>
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
        {!isFormValid && (
          <p className="form-error">
            Complete all required fields with valid values before submitting.
          </p>
        )}

        <div className="action-row">
          <button type="Submit" className="primary-btn" disabled={!isFormValid}>
            Submit
          </button>
          <button type="button" className="secondary-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

      </form>

      {results && <MacroResults results={results} onClear={handleClear} />}
    </div>
  )
}

export default MacroForm
