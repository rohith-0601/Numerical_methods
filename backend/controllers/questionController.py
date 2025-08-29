import gmpy2
import sys
import time
from sympy import isprime, primerange
from gmpy2 import mpz, next_prime

sys.set_int_max_str_digits(20000)

# -------- Q1 --------
def kaprekar_number(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

def q1_stream():
    start_time = time.time()
    for n in range(1000, 3001):
        candidate = kaprekar_number(n)
        elapsed = round(time.time() - start_time, 2)
        yield f"data: {{\"current_n\": {n}, \"runtime_seconds\": {elapsed}}}\n\n"
        if gmpy2.is_prime(candidate):
            yield f"data: {{\"found\": true, \"n\": {n}, \"kaprekar_number\": \"{candidate}\", \"runtime_seconds\": {elapsed}}}\n\n"
            break

# -------- Q2 --------
def repunit(n):
    return int("1" * n)

def q2():
    start_time = time.time()
    repunit_primes = []

    for n in primerange(2, 1041):
        Rn = repunit(n)
        if isprime(Rn):
            repunit_primes.append({"n": n, "repunit": str(Rn)})

    elapsed = round(time.time() - start_time, 2)
    return {"repunit_primes": repunit_primes, "runtime_seconds": elapsed}

# -------- Q3: Mersenne primes --------
def lucas_lehmer(p):
    if p == 2:
        return True
    M = gmpy2.mpz(2)**p - 1
    s = gmpy2.mpz(4)
    for _ in range(p - 2):
        s = (s * s - 2) % M
    return s == 0

def q3():
    start_time = time.time()
    mersenne_primes = []

    for p in range(2201, 2300):
        if gmpy2.is_prime(p) and lucas_lehmer(p):
            M = gmpy2.mpz(2)**p - 1
            mersenne_primes.append({
                "p": p,
                "mersenne_number": str(M)
            })

    elapsed = round(time.time() - start_time, 2)
    return {"mersenne_primes": mersenne_primes, "runtime_seconds": elapsed}

# -------- Q4: Brocard's conjecture using Q3 results --------
def q4():
    start_time = time.time()
    q3_result = q3()  # Use Q3 results by default
    mersennes = q3_result.get("mersenne_primes", [])

    if len(mersennes) < 2:
        return {"error": "Not enough Mersenne primes from Q3 to calculate Q4."}

    M1 = mpz(mersennes[0]["mersenne_number"])
    M2 = mpz(mersennes[1]["mersenne_number"])

    # Find first 4 primes between M1^2 and M2^2
    low = M1**2
    high = M2**2
    primes = []
    candidate = next_prime(low)
    while candidate < high and len(primes) < 4:
        primes.append(candidate)
        candidate = next_prime(candidate)

    elapsed = round(time.time() - start_time, 2)
    return {"primes": [str(p) for p in primes], "runtime_seconds": elapsed}

# -------- Placeholders for Q5-Q7 --------
def q5(): return {"message": "Q5 result here"}
def q6(): return {"message": "Q6 result here"}
def q7(): return {"message": "Q7 result here"}
