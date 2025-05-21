from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate
import os
from app.config.config import config
from app.models.models import db

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    Migrate(app, db)
    
    # Register blueprints
    from app.api import api_bp
    from app.auth import auth_bp
    from app.frontend import frontend_bp
    
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp)
    app.register_blueprint(frontend_bp)
    
    # Create database tables with error handling
    with app.app_context():
        try:
            if not app.config.get('SQLALCHEMY_DATABASE_URI'):
                raise ValueError("Database URI not configured. Please set DATABASE_URL environment variable.")
                
            # Attempt to create tables
            db.create_all()
            app.logger.info("Database tables created successfully")
        except Exception as e:
            app.logger.error(f"Database initialization error: {str(e)}")
            # In production, don't raise the error - let the app start anyway
            # The tables may already exist or will be created by migrations
            if app.config['ENV'] != 'production':
                raise
    
    return app
