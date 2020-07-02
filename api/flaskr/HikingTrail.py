class HikingTrail:

    def __init__(self,  **kwargs):
        self.name = kwargs.get('name')
        self.head_latitude = kwargs.get('latitude')
        self.head_longitude = kwargs.get('longitude')
        self.rating = kwargs.get('rating')
        self.image_link = kwargs.get('imgMedium')
        self.difficulty = kwargs.get('difficulty')
        self.high_elevation = kwargs.get('high')
        self.low_elevation = kwargs.get('low')
        self.url = kwargs.get('url')

    def __str__(self):
        return self.name
