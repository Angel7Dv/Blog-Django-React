### summer note 
| Textos enriquecidos con imagenes 

https://github.com/summernote/django-summernote



1. crea la base de datos en postgre
        CREATE DATABASE Blog OWNER postgres;

1. crea el proyecto django y la aplicacion blog

1. ajustar los settings 

    1. INSTALLED_APPS = [
    ......
    'rest_framework',       
    'corsheaders',
    'django_summernote',
    'blog'
    ]

    2. MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware', #

    3. TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR), 'build'],  # < -----
        'APP_DIRS': True,
    
    4. DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'blog', # <--- Nombre de la base de datos creada
        'USER': 'postgres',
        'PASSWORD': '[YOUR POSTGRES DATABASE PASSWORD]',
        'HOST': '127.0.0.1' 
        }
    

    5. STATIC_URL = '/static/'
        STATICFILES_DIRS = [
            os.path.join(BASE_DIR, 'build/static')
        ]
        STATIC_ROOT = os.path.join(BASE_DIR, 'static')
    
    6.  MEDIA_URL = '/media/'
        MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

    7. REST_FRAMEWORK = {
            'DEFAULT_PERMISSION_CLASSES': [
                'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
            ]
        }
        X_FRAME_OPTIONS = 'SAMEORIGIN' # sumernote

        SUMMERNOTE_THEME = 'bs4'       # sumernote

        CORS_ORIGIN_ALLOW_ALL = True


1. configuracion de la settings/urls.py

    from django.contrib import admin
    from django.urls import path, include, re_path
    from django.views.generic import TemplateView
    from django.conf import settings
    from django.conf.urls.static import static

    urlpatterns = [
        path('api-auth/', include('rest_framework.urls')),          # agregar 
        path('summernote/', include('django_summernote.urls')),     # Texto enriquecido
        #path('api/blog/', include('blog.urls')),                    # Urls de la app blog
        path('admin/', admin.site.urls),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)   # Las imagenes agregadas

                    # regular exprecion usada por react
    urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))] # Las urls para las imagenes



1. Models

from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Categories(models.TextChoices):
    WORLD = 'world'
    ENVIRONMENT = 'environment'
    TECHNOLOGY = 'technology'
    DESIGN = 'design'
    CULTURE = 'culture'
    BUSINESS = 'business'
    POLITICS = 'politics'
    OPINION = 'opinion'
    SCIENCE = 'science'
    HEALTH = 'health'
    STYLE = 'style'
    TRAVEL = 'travel'

class BlogPost(models.Model):
    title = models.CharField(max_length=50)
    slug = models.SlugField()

    #CATEGORIES
    category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.WORLD)
    
    thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/')
    excerpt = models.CharField(max_length=150)

    # DATE
    month = models.CharField(max_length=3)
    day = models.CharField(max_length=2)

    # CONTENIDO O BODY
    content = models.TextField()       
    featured = models.BooleanField(default=False)
    date_created = models.DateTimeField(default=datetime.now, blank=True)

    def save(self, *args, **kwargs):
        original_slug = slugify(self.title) # creacion automatica apartir del titulo

        # LOGICA PARA LAS URLS UNICAS
        
        queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count() 
        count = 1
        slug = original_slug
        # (queryset) si encuentra otro con este mismo slug
        while(queryset): 
            slug = original_slug + '-' + str(count)
            count += 1
            # vuelve a hacer la verificacion
            queryset = BlogPost.objects.all().filter(slug__iexact=slug).count() 

        self.slug = slug 

        # Destacado** Solo exite un destacado, si este lo es, pone falso al anterior destacado
        if self.featured:
            try:
                temp = BlogPost.objects.get(featured=True)
                if self != temp:
                    temp.featured = False
                    temp.save()
            except BlogPost.DoesNotExist:
                pass
        
        super(BlogPost, self).save(*args, **kwargs)

    def __str__(self):
        return self.title


1. admin + configuracion Textfield

from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from .models import BlogPost

class BlogPostAdmin(SummernoteModelAdmin):
    # exclude = ('slug', )
    # list_display = ('id', 'title', 'category', 'date_created')
    # list_display_links = ('id', 'title')
    # search_fields = ('title', )
    # list_per_page = 25
    summernote_fields = ('content', )

admin.site.register(BlogPost, BlogPostAdmin)


1. serializers

from rest_framework import serializers
from .models import BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
        lookup_field = 'slug'  # Campo de busqueda

# 1. Views

from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer

class BlogPostListView(ListAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

class BlogPostDetailView(RetrieveAPIView):
    queryset = BlogPost.objects.order_by('-date_created')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

class BlogPostFeaturedView(ListAPIView):
    queryset = BlogPost.objects.all().filter(featured=True)
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
    permission_classes = (permissions.AllowAny, )

class BlogPostCategoryView(APIView):
    serializer_class = BlogPostSerializer
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data
        category = data['category']
        queryset = BlogPost.objects.order_by('-date_created').filter(category__iexact=category)

        serializer = BlogPostSerializer(queryset, many=True)

        return Response(serializer.data)

1. URLS

from django.urls import path
from .views import BlogPostListView, BlogPostDetailView, BlogPostFeaturedView, BlogPostCategoryView

urlpatterns = [
    path('', BlogPostListView.as_view()),
    path('featured', BlogPostFeaturedView.as_view()),
    path('category', BlogPostCategoryView.as_view()),
    path('<slug>', BlogPostDetailView.as_view()),
]


# Frontend

npm install --save axios react-router-dom

