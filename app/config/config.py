import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 's3cr3tK3y'
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5MB limit for uploads
    UPLOAD_FOLDER = os.path.join(os.path.dirname(basedir), 'uploads')
    ALLOWED_EXTENSIONS = {'pdf'}
    ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME') or 'admin'
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD') or 'test@admin'
    
    @staticmethod
    def init_app(app):
        # Create directories if they don't exist
        for directory in [app.config['UPLOAD_FOLDER'], 'instance']:
            try:
                if not os.path.exists(directory):
                    os.makedirs(directory)
            except Exception as e:
                app.logger.warning(f"Could not create directory {directory}: {str(e)}")

class DevelopmentConfig(Config):
    DEBUG = True
    TEMPLATES_AUTO_RELOAD = True
    # Use SQLite for development by default
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(os.path.dirname(os.path.dirname(basedir)), 'instance', 'dev.sqlite3')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    DEBUG = False
    # Use DATABASE_URL environment variable in production
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        'pool_size': 5,
        'pool_recycle': 1800,  # recycle connections after 30 minutes
        'pool_pre_ping': True,  # verify connections before using
        'pool_timeout': 30,
        'max_overflow': 2
    }

config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}
