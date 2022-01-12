from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost

class BlogPostAdmin(SummernoteModelAdmin):
    exclude = ('slug', )  #Excluye estos campos
    list_display = ('id', 'title', 'category', 'date_created')
    list_display_links = ('id', 'title') # link donde hacer click
    search_fields = ('title', )
    list_per_page = 25
    summernote_fields = ('content', )

admin.site.register(BlogPost, BlogPostAdmin)