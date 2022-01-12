from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

# Create your models here.


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
            # "Busca si hay otro slug que conincida con el mismo original_slug"
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