from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from controllers.questionController import q1_stream, q2, q3, q4, q5, q6, q7

app = Flask(__name__)
CORS(app)  # Allow React frontend to fetch

# SSE endpoint for Q1
@app.route("/api/q1/stream")
def api_q1_stream():
    try:
        start = int(request.args.get("start", 1000))
        end = int(request.args.get("end", 3000))
    except (ValueError, TypeError):
        start, end = 1000, 3000

    # Ensure start is <= end
    if start > end:
        start, end = end, start

    return Response(q1_stream(start=start, end=end), mimetype="text/event-stream")
@app.route("/api/q2")
def api_q2():
    start = int(request.args.get("start", 2))
    end = int(request.args.get("end", 1040))
    return jsonify(q2(start=start, end=end))

# app.py
@app.route("/api/q3")
def api_q3(): 
    start = int(request.args.get("start", 2201))
    end = int(request.args.get("end", 2300))
    return jsonify(q3(start=start, end=end))




@app.route("/api/q4")
def api_q4():
    return jsonify(q4())

@app.route("/api/q5")
def api_q5():
    # Get min_digits from query params, default to 50
    min_digits = request.args.get("min_digits", default=50, type=int)
    return jsonify(q5(min_digits=min_digits))
@app.route("/api/q6")
def api_q6():
    # Call q6() which reads `p_values` from query string
    result = q6()
    return jsonify(result)

@app.route("/api/q7")
def api_q7():
    N1 = request.args.get("N1")
    N2 = request.args.get("N2")
    return jsonify(q7(N1, N2))

if __name__ == "__main__":
    app.run(debug=True)
