import os
from fastapi import FastAPI, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import Column, Integer, String, Float, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import SQLAlchemyError
from sqladmin import Admin, ModelView
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import ImageType
import json

# Инициализация FastAPI
app = FastAPI()

# Получаем путь к директории текущего скрипта
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Полный путь к config.json
CONFIG_PATH = os.path.join(BASE_DIR, "config.json")

# Загрузка конфигурации
try:
    with open(CONFIG_PATH) as config_file:
        config = json.load(config_file)
except FileNotFoundError:
    raise FileNotFoundError(f"Не удалось найти файл конфигурации: {CONFIG_PATH}")

frontend_url = config.get("frontend_url", "http://localhost:3000")  # URL фронтенда из конфигурации

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройка базы данных
DATABASE_URL = "postgresql://postgres:12345@localhost:5432/christ"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Настройка хранилища файлов
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
storage = FileSystemStorage(path=UPLOAD_FOLDER)

# Определение модели таблицы "Product"
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    price = Column(Float, nullable=True)
    image_url = Column(ImageType(storage=storage))

# Создание таблиц
Base.metadata.create_all(bind=engine)

# Настройка sqladmin
admin = Admin(app, engine)

class ProductAdmin(ModelView, model=Product):
    column_list = [Product.id, Product.name, Product.description, Product.price, Product.image_url]
    name = "Продукт"
    name_plural = "Продукты"

admin.add_view(ProductAdmin)

# Сервинг статических файлов
app.mount("/uploads", StaticFiles(directory=UPLOAD_FOLDER), name="uploads")

# API для добавления продукта
@app.post("/products/")
async def create_product(
    name: str,
    description: str = "",
    price: float = 0.0,
    image: UploadFile = File(...)
):
    db = SessionLocal()
    try:
        # Сохраняем изображение
        file_name = storage.save(name + "_" + image.filename, image.file)
        file_url = os.path.join("uploads", file_name)

        # Создаем продукт
        new_product = Product(
            name=name,
            description=description,
            price=price,
            image_url=file_url,
        )
        db.add(new_product)
        db.commit()
        db.refresh(new_product)
        return {"id": new_product.id, "name": new_product.name, "image_url": new_product.image_url}
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Ошибка при добавлении продукта.")
    finally:
        db.close()

# API для получения всех продуктов
@app.get("/products/")
async def get_products():
    db = SessionLocal()
    try:
        products = db.query(Product).all()
        return [
            {
                "id": product.id,
                "name": product.name,
                "description": product.description,  
                "price": product.price,  
                "image_url": os.path.basename(product.image_url),
            }
            for product in products
        ]
    finally:
        db.close()
