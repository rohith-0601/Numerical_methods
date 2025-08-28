import React from "react";
import "./Home.css";

function HomePage() {
  return (
    <div className="container">
      <h1 className="heading">Prime Numbers Assignment </h1>
      <div className="cardGrid">
        {/* Card 1 */}
        <div className="card orangeCard q1Card">
          <div className="cardContent q1Content">
            <h3 className="q1Title">Question 1</h3>
            <p className="quote q1Text">
              A prime number is <b>12345678910987654321</b>. Here n is 10.
              <br />
              Find the next number that follows this pattern.
              <br />
              That number n lies between 1000 and 3000.
              <br />
              This was discovered by an <b>Indian</b>.
            </p>
            <button className="q1Button">Go to Q1</button>
          </div>
        </div>

        {/* Card 2 */}
       <div className="card q2Card">
  <div className="cardContent q2Content">
    <h3 className="q2Title">Question 2</h3>
    <p className="q2Text">
      11 is prime, 111 is not prime. We use the notation, 1<sub>N</sub> means N ones.
      For example, for N = 7, we mean seven ones: 1111111.  
      1<sub>N</sub> is represented by (10<sup>N−1</sup> − 1)/9.
    </p>
    <p className="q2Text">
      If N is prime, 1<sub>N</sub> might be prime. If N is not prime, 1<sub>N</sub> cannot be prime. 
      Thus, we have to check only when N is prime.
    </p>
    <p className="q2Text">
      Your task is to determine the 5 primes between N = 2 and N = 1040. 
      Remember that this involves both <strong>prime checking</strong> and 
      <strong> pattern recognition</strong>.
    </p>
    <button className="q2Button" onClick={() => window.location.href='/q2'}>
      Go to Q2
    </button>
  </div>
</div>



        {/* Card 3 */}
       {/* Card 3 */}
<div className="card q3Card">
  <div className="q3Header">Question 3</div>
  <p className="q3Text">
    We are interested in Mersenne primes. A Mersenne prime is a prime number 
    that is one less than a power of two. The largest Mersenne prime discovered 
    was on Oct 12, 2024 when 2^(p-1) where p=136,279,841. This has 41,024,320 digits. 
    Find the two primes where p lies between 2201 and 2299. 
    These primes were discovered in 1952.
  </p>
  <div className="q3ButtonWrapper">
    <button className="q3Button" onClick={() => window.location.href='/q3'}>
      Go to Q3 
    </button>
  </div>
</div>


        {/* Card 4 */}
        <div className="card purpleCard">
          <div className="cardHeader">
            <span className="caseStudyTag">CASE STUDIES</span>
            <span className="readMore">Read now →</span>
          </div>
          <p className="cardText">
            Mars achieves coverage of 80-90% of sources for true positives in
            weeks
          </p>
          <div className="logoPlaceholder">
            <img
              src="https://i.imgur.com/w1iV18V.png"
              alt="MARS Logo"
              className="logo"
            />
          </div>
        </div>

        {/* Card 5 */}
        <div className="card darkBlueCard">
          <div className="cardHeader">
            <span className="readMore">Read now →</span>
          </div>
          <p className="cardText">
            "[With Tines professional services]we were able to build whatever we
            wanted, and even add more features that we didn't previously cater
            for."
          </p>
          <div className="authorInfo">
            <p className="author">Issa Almannaei</p>
            <p className="role">
              Head of Security Operations Center, Beyon Cyber
            </p>
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
          <p className="cardText">
            faster product adoption with professional services
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
