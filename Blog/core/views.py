# core/views.py
from Blog.blog_posts.views import blog_post
from flask import render_template,request,Blueprint
from Blog.models import BlogPost

core = Blueprint('core',__name__)
@core.route('/')
def index():

	return render_template('index.html')

@core.route('/info')
def info():
	return render_template('info.html')

@core.route('/feed')
def feed():
	page = request.args.get('page',1,type=int)
	blog_posts = BlogPost.query.order_by(BlogPost.date.desc()).paginate(page = page,per_page = 5)
	print(f"BLOG POST ARE --------------------------------------- {blog_posts}")
	return render_template('feed.html',blog_posts = blog_posts)