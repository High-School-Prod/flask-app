from flask import Flask, render_template
from utils.hash_utils import get_8_digit_hash

app = Flask(__name__)


@app.route('/')
def landing_page():
    return render_template('index.html')


@app.route('/terms-of-service')
def terms_of_service():
    return render_template('terms-of-service.html')


@app.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy-policy.html')


@app.route('/login')
def login_page():
    return render_template('login/login-page.html.j2')


@app.route('/fake-api', methods=['POST'])
def fake_api():
    return "FAKE AUTH"


@app.route('/register')
def register_page():
    return render_template('login/register-page.html')


@app.route('/home')
def homepage():
    return render_template('homepage.html')


@app.route('/dashboard/<int:dashboard_id>')
def dashboard(dashboard_id):
    random_hash = get_8_digit_hash(dashboard_id)
    return render_template('dashboard.html', dashboard_hash=random_hash)


app.run(debug=True)
