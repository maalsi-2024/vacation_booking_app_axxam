from pymongo import MongoClient
from loguru import logger

client = MongoClient("mongodb://localhost:27017/")
db = client["Axxam"]
collection = db["offers"]

logger.add("app.log", format="{time} {level} {message}", level="INFO", rotation="10MB")

def get_data():
    data = list(collection.find())
    logger.info(f"Récupération de {len(data)} documents")
    for doc in data:
        logger.info(doc)
    return data

def main():
    data = get_data()
    for d in data:
        print(d)

if __name__ == "__main__":
    main()