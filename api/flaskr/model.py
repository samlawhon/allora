from geoalchemy2 import Geography # pylint: disable=import-error
from app.flaskr.server import db # pylint: disable=import-error


class TrailModel(db.Model):
    __tablename__ = 'trails'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    rating = db.Column(db.Integer())
    url = db.Column(db.String())
    route = db.Column(Geography(geometry_type='MULTILINESTRING'))


    def __init__(self, name, rating, url):
        self.name = name
        self.rating = rating
        self.url = url

    def __repr__(self):
        return f"<trail {self.name}>"
