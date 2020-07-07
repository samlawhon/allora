'''
Module defining a hiking trail object
'''

class HikingTrail:
    '''
    Class defining a hiking trail object
    '''

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    def __str__(self):
        return self.__dict__['name']

    def as_dict(self):
        '''
        Convert to dict for use with JS on frontend
        '''
        return {'name': self.__dict__['name'],
                'image': self.__dict__['imgMedium'],
                'rating': self.__dict__['stars']}
