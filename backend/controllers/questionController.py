import gmpy2
import sys
import time
from sympy import isprime, primerange

sys.set_int_max_str_digits(20000)

# -------- Q1 --------
def kaprekar_number(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

# Generator to stream progress
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
    """Return the number consisting of n ones."""
    return int("1" * n)

def q2():
    start_time = time.time()
    repunit_primes = []

    for n in primerange(2, 1041):   # Only check prime N
        Rn = repunit(n)
        if isprime(Rn):
            repunit_primes.append({"n": n, "repunit": str(Rn)})

    elapsed = round(time.time() - start_time, 2)
    return {
        "repunit_primes": repunit_primes,
        "runtime_seconds": elapsed
    }

# -------- Placeholders for Q3-Q7 --------
def q3(): return {"message": "Q3 result here"}
def q4(): return {"message": "Q4 result here"}
def q5(): return {"message": "Q5 result here"}
def q6(): return {"message": "Q6 result here"}
def q7(): return {"message": "Q7 result here"}
