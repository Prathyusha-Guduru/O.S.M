from flask import render_template,url_for,flash,request,redirect,Blueprint
from flask_login import current_user,login_required
from flask import abort
from Blog.models import BlogPost, User
from Blog.blog_posts.forms import BlogPostForm
from Blog import blog_posts, db

blog_posts = Blueprint('blog_posts',__name__)
#Creating a blogpost
#Viewing a blogpost
#Updating a blogpost
#Deleting a blogpost

@blog_posts.route('/create',methods = ['GET','POST'])
@login_required
def create_post():
	form = BlogPostForm()
	if form.validate_on_submit():
		blog_post = BlogPost(title = form.title.data,text = form.text.data,user_id=current_user.id)

		db.session.add(blog_post)
		db.session.commit()
		flash('Blog Post Created')

		return redirect(url_for('core.feed'))
	return render_template('create_post.html',form = form)

@blog_posts.route('/<int:blog_post_id>')
def blog_post(blog_post_id):

	blog_post = BlogPost.query.get_or_404(blog_post_id)
	print(f"One blog post is {blog_post}")
	author = User.query.get(blog_post.user_id)
	access = False
	if author.username == current_user.username:
		access = True
	else:
		access = False
	print(f"Cureent user is {current_user.username}")
	print(f"pOST's author is {author.username}")
	return render_template('blog_post.html',title = blog_post.title,date = blog_post.date,post = blog_post,author = author,access = access)

@blog_posts.route('/<int:blog_post_id>/update',methods = ['GET','POST'])
@login_required
def update(blog_post_id):
	blog_post = BlogPost.query.get_or_404(blog_post_id)
	author = User.query.get(blog_post.user_id)
	print(f"Updating section, author name : {author.username}, current_user_name : {current_user.username}")
	if author.username != current_user.username:
		abort(403)

	form = BlogPostForm()
	if form.validate_on_submit():
		blog_post.title = form.title.data
		blog_post.text = form.text.data
		db.session.commit()
		flash('Form Updated')
		return redirect(url_for('blog_posts.blog_post',blog_post_id = blog_post_id))

	elif request.method == 'GET':
		form.title.data = blog_post.title
		form.text.data = blog_post.text

	return render_template('create_post.html',title = 'Updating',form = form)


@blog_posts.route('/<int:blog_post_id>/delete',methods = ['GET','POST'])
@login_required
def delete_post(blog_post_title):
	
	blog_post = BlogPost.query.filter_by(title = blog_post_title).first()
	author = User.query.get(blog_post.user_id)
	print(f"Deleting section, author name : {author.username}, current_user_name : {current_user.username}")
	if author.username != current_user.username:
		abort(403)
	db.session.delete(blog_post)
	db.session.commit()
	flash('bLOG  poST Deleted')
	return redirect(url_for('core.feed'))

