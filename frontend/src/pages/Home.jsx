import React from "react";
import "./Home.css";

function HomePage() {
  return (
    <div className="container">
      <h1 className="heading">Prime Numbers Assignment </h1>
      <div className="cardGrid">

        {/* Question 1 */}
        <div className="card q1Card orangeCard">
          <div className="q1Content">
            <h3 className="q1Title">Question 1</h3>
            <p className="q1Text">
              A prime number is <b>12345678910987654321</b>. Here n is 10.<br/>
              Find the next number that follows this pattern.<br/>
              That number n lies between 1000 and 3000.<br/>
              This was discovered by an <b>Indian</b>.
            </p>
            <button className="q1Button">Go to Q1</button>
          </div>
        </div>

        {/* Question 2 */}
        <div className="card q1Card greenCard">
          <div className="q1Content">
            <h3 className="q1Title">Question 2</h3>
            <p className="q1Text">
              11 is prime, 111 is not prime. We use the notation, 1<sub>N</sub> means N ones.<br/>
              If N is prime, 1<sub>N</sub> might be prime. Otherwise, it cannot be prime.<br/>
              Determine the 5 primes between N = 2 and N = 1040.
            </p>
            <button className="q1Button" onClick={() => window.location.href='/q2'}>Go to Q2</button>
          </div>
        </div>

        {/* Question 3 */}
        <div className="card q1Card pinkCard">
          <div className="q1Content">
            <h3 className="q1Title">Question 3</h3>
            <p className="q1Text">
              Find the two Mersenne primes where p lies between 2201 and 2299.  
              A Mersenne prime is one less than a power of two.
            </p>
            <button className="q1Button" onClick={() => window.location.href='/q3'}>Go to Q3</button>
          </div>
        </div>

        {/* Question 4 */}
        <div className="card q1Card lightBlueCard">
          <div className="q1Content">
            <h3 className="q1Title">Question 4</h3>
            <p className="q1Text">
              Brocard's conjecture: There are at least four primes between (p<sub>n</sub>)² and (p<sub>n+1</sub>)².<br/>
              Using the two primes from #3, determine at least four primes between their squares.
            </p>
            <button className="q1Button">Go to Q4</button>
          </div>
        </div>

        {/* Question 5 */}
        <div className="card q1Card darkBlueCard">
          <div className="q1Content">
            <h3 className="q1Title">Question 5</h3>
            <p className="q1Text">
              Palindromic primes are prime numbers that are also palindromes.<br/>
              Examples: 11, 122333221, 1223334444555554444333221.<br/>
              Find a palindromic prime with at least 50 digits.
            </p>
            <button className="q1Button">Go to Q5</button>
          </div>
        </div>

        {/* Question 6 */}
        <div className="card q1Card beigeCard">
          <div className="q1Content">
            <h3 className="q1Title">Question 6</h3>
            <p className="q1Text">
              A perfect number equals the sum of its positive proper divisors excluding itself.<br/>
              Example: 6, 28. Using primes from #3, prove 2<sup>p-1</sup>(2<sup>p</sup> − 1) yields a perfect number.
            </p>
            <button className="q1Button">Go to Q6</button>
          </div>
        </div>

        {/* Question 7 */}
        <div className="card purpleCard q1Card">
          <div className="q1Content">
            <h3 className="q1Title">Question 7</h3>
            <p className="q1Text">
              Take one of the following open problems in prime numbers and prove them for a number greater than 50 digits:
            </p>
            <ul className="q1Text">
              <li><b>Wieferich primes:</b> Only 1093 and 3511 are known, but conjectured to be infinite.</li>
              <li><b>Goldbach's conjecture:</b> Every even n &gt; 2 is the sum of two primes.</li>
              <li><b>Weak Goldbach Problem:</b> Every odd n &gt; 5 is the sum of three primes.</li>
              <li><b>Prime differences:</b> Every even number is the difference of two primes.</li>
              <li><b>Legendre's conjecture:</b> There is a prime between consecutive integer squares, implying at least two primes between prime squares for pₙ ≥ 3.</li>
              <li><b>Oppermann's conjecture:</b> For n &gt; 1, there is a prime between n(n-1) and n², and another between n² and n(n+1).</li>
            </ul>
            <button className="q1Button">Go to Q7</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default HomePage;
