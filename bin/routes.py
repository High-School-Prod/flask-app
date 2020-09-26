from flask import Blueprint, render_template
from __init__ import create_app


main = Blueprint('main', __name__)


@main.route('/')
def landing_page():
    return render_template('index.html')


@main.route('/terms-of-service')
def terms_of_service():
    return render_template('terms-of-service.html')


@main.route('/privacy-policy')
def privacy_policy():
    return render_template('privacy-policy.html')


@main.route('/login')
def login_page():
    return render_template('login/login-page.html.j2')


@main.route('/fake-api', methods=['POST'])
def fake_api():
    return "FAKE AUTH"


@main.route('/register')
def register_page():
    return render_template('login/register-page.html')


@main.route('/home')
def homepage():
    return render_template('homepage.html')


@main.route('/dashboard/<int:dashboard_id>')
def dashboard(dashboard_id):
    return render_template('dashboard.html', dashboard_hash=dashboard_id)
