from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, TIMESTAMP, Text
from sqlalchemy.sql import func
from datetime import datetime

from app.database.db import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String(100)
    )

    email = Column(
        String(255),
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String(255),
        nullable=False
    )

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )



class Flowchart(Base):
    __tablename__ = "flowcharts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    title = Column(
        String(255)
    )

    code = Column(
        Text
    )

    flowchart_json = Column(
        Text
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )