import gmpy2
import sys
import time

sys.set_int_max_str_digits(20000)

# -------- Q1 --------
def kaprekar_number(n: int) -> int:
    num = 0
    for i in range(1, n + 1):
        num = num * (10 ** len(str(i))) + i
    for i in range(n - 1, 0, -1):
        num = num * (10 ** len(str(i))) + i
    return num

def q1():
    start_time = time.time()
    for n in range(1000, 3001):
        candidate = kaprekar_number(n)
        if gmpy2.is_prime(candidate):
            elapsed = time.time() - start_time
            return {
                "n": n,
                "kaprekar_number": str(candidate),
                "runtime_seconds": round(elapsed, 2)
            }
    return None

# -------- Q2-Q7 placeholders --------
def q2(): return {"message": "Q2 result here"}
def q3(): return {"message": "Q3 result here"}
def q4(): return {"message": "Q4 result here"}
def q5(): return {"message": "Q5 result here"}
def q6(): return {"message": "Q6 result here"}
def q7(): return {"message": "Q7 result here"}
