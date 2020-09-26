from flask import Flask


def create_app():
	app = Flask(__name__)
	app.config.from_json('config/config.json')
	from bin.routes import main
	app.register_blueprint(main)
	return app