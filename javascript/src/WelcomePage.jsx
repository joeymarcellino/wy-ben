export default function WelcomePage({onNext}) {
    return (
      <div className="form-page welcome-page">
        <h1>Welcome!</h1>
	<p>Check your eligibility for Wyoming's benefit programs.</p>
        <button onClick={onNext} className="get-started-button">Get started</button>
      </div>
      )
  }
  
