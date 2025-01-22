import sys
from house_price_model import HousePriceModel

def predict(features):
    model = HousePriceModel.load_model()
    prediction = model.predict(features)
    print(prediction)

if __name__ == "__main__":
    features = [float(x) for x in sys.argv[1].split(',')]
    predict(features)

