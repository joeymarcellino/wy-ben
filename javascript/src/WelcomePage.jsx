export default function WelcomePage({onNext}) {
    return (
	<div className="form-page welcome-page">
	    <h1>Wyoming Public Benefit Screener</h1>
	    <p>Check your eligibility for Wyoming's benefit programs by answering a few questions.</p>
	    <button onClick={onNext} className="get-started-button">Get started</button>
	</div>
      )
  }
  
