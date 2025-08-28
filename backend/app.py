from flask import Flask, jsonify
from controllers import q1, q2, q3, q4, q5, q6, q7

app = Flask(__name__)

@app.route("/api/q1")
def api_q1():
    result = q1()
    if result:
        return jsonify({"status": "success", **result})
    return jsonify({"status": "not found"}), 404

@app.route("/api/q2")
def api_q2():
    return jsonify(q2())

@app.route("/api/q3")
def api_q3():
    return jsonify(q3())

@app.route("/api/q4")
def api_q4():
    return jsonify(q4())

@app.route("/api/q5")
def api_q5():
    return jsonify(q5())

@app.route("/api/q6")
def api_q6():
    return jsonify(q6())

@app.route("/api/q7")
def api_q7():
    return jsonify(q7())

if __name__ == "__main__":
    app.run(debug=True)
