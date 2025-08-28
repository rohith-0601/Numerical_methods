import React from 'react'
import "./Home.css";

function HomePage() {
    return ( 
    <div className="container">
      <h1 className="heading">Don't take our word for it</h1>
      <div className="cardGrid">

        {/* Card 1 */}
        <div className="card orangeCard">
          <div className="cardContent">
            <p className="quote">"This proactive support helped us overcome initial deployment challenges and optimize our use of the platform."</p>
            <p className="author">Abubakar Mohd</p>
            <p className="role">Chief Technology Officer, Beyon Cyber</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card greenCard">
          <div className="cardHeader">
            <span className="caseStudyTag">CASE STUDIES</span>
            <span className="readMore">Read now →</span>
          </div>
          <p className="cardText">Beyon Cyber uses Tines to fuel expansion and innovation</p>
          <div className="logoPlaceholder">
            <img src="https://i.imgur.com/e2n5q3o.png" alt="Beyon Cyber Logo" className="logo" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="card pinkCard">
          <div className="cardHeader">
            <span className="readMore">Read now →</span>
          </div>
          <p className="cardText">"Tines' service has made a huge impact on our decision-making with the product and internally."</p>
          <div className="authorInfo">
            <p className="author">Security Leader</p>
            <p className="role">National Research Firm</p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="card purpleCard">
          <div className="cardHeader">
            <span className="caseStudyTag">CASE STUDIES</span>
            <span className="readMore">Read now →</span>
          </div>
          <p className="cardText">Mars achieves coverage of 80-90% of sources for true positives in weeks</p>
          <div className="logoPlaceholder">
            <img src="https://i.imgur.com/w1iV18V.png" alt="MARS Logo" className="logo" />
          </div>
        </div>

        {/* Card 5 */}
        <div className="card darkBlueCard">
          <div className="cardHeader">
            <span className="readMore">Read now →</span>
          </div>
          <p className="cardText">"[With Tines professional services]we were able to build whatever we wanted, and even add more features that we didn't previously cater for."</p>
          <div className="authorInfo">
            <p className="author">Issa Almannaei</p>
            <p className="role">Head of Security Operations Center, Beyon Cyber</p>
          </div>
        </div>

        {/* Card 6 */}
        <div className="card lightBlueCard">
          <div className="largeNumber">30%</div>
          <p className="cardText">more workflows compared to the average</p>
        </div>

        {/* Card 7 */}
        <div className="card beigeCard">
          <div className="largeNumber">2x</div>
          <p className="cardText">faster product adoption with professional services</p>
        </div>
      </div>
    </div>
  );

}

export default HomePage;