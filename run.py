import os
from app import create_app

# Get environment from ENV variable or use development by default
environment = os.environ.get('FLASK_ENV', 'development')
app = create_app(environment)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=(environment == 'development'))
