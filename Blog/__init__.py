#Under Blog package
from Blog.blog_posts.forms import BlogPostForm
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os
app = Flask(__name__)
app.config['SECRET_KEY'] = 'izzasecret'
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir,'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from flask_login import LoginManager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'users.login'


from Blog.models import BlogPost


from flask_login.utils import login_required

from flask_migrate import Migrate



Migrate(app,db)

################################
###DATABASE SETUP###############
################################

app.config['SECRET_KEY'] = 'izzasecret'
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir,'data.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
Migrate(app,db)





################################
### LOGIN CONFIG ###############
################################



from Blog.core.views import core
from Blog.users.views import users
from Blog.error_pages.handlers import error_pages
from Blog.blog_posts.views import blog_posts
from Blog.health.views import health



app.register_blueprint(core)
app.register_blueprint(error_pages)
app.register_blueprint(users)
app.register_blueprint(blog_posts)
app.register_blueprint(health)


