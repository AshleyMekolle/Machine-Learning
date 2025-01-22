import json
from house_price_model import HousePriceModel

def get_feature_importance():
    model = HousePriceModel.load_model()
    feature_importance = model.feature_importance.to_dict(orient='records')
    print(json.dumps(feature_importance))

if __name__ == "__main__":
    get_feature_importance()

