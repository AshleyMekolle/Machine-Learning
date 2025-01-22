import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import joblib
import os

class RentalPriceModel:
    def __init__(self):
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=15,
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42
        )
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_importance = None
        
    def load_data(self, filepath):
        """Load and prepare the rental dataset"""
        try:
            print(f"Attempting to load data from: {os.path.abspath(filepath)}")
            
            # Load the dataset
            df = pd.read_csv(filepath)
            print(f"Successfully loaded {len(df)} rows of data")
            
            # Select features for prediction
            self.important_features = [
                'BHK',
                'Size',
                'Floor',
                'Bathroom',
                'Furnishing Status',
                'Area Type',
                'City'
            ]
            
            # Create label encoders for categorical variables
            categorical_features = ['Furnishing Status', 'Area Type', 'City']
            for feature in categorical_features:
                if feature in df.columns:
                    self.label_encoders[feature] = LabelEncoder()
                    df[feature] = self.label_encoders[feature].fit_transform(df[feature].fillna('Unknown'))
            
            # Handle missing values for numerical features
            numerical_features = ['BHK', 'Size', 'Floor', 'Bathroom']
            for feature in numerical_features:
                if feature in df.columns:
                    df[feature] = pd.to_numeric(df[feature], errors='coerce')
                    df[feature] = df[feature].fillna(df[feature].median())
            
            # Select features and target
            X = df[self.important_features]
            y = df['Rent']
            
            print("\nFeature summary:")
            print(X.describe())
            
            return X, y
            
        except Exception as e:
            print(f"Error loading data: {str(e)}")
            raise
    
    def train(self, X, y):
        """Train the model and calculate feature importance"""
        # Scale numerical features
        numerical_features = ['BHK', 'Size', 'Floor', 'Bathroom']
        X_numerical = X[numerical_features]
        X_categorical = X.drop(columns=numerical_features)
        
        X_numerical_scaled = self.scaler.fit_transform(X_numerical)
        X_scaled = np.hstack([X_numerical_scaled, X_categorical])
        
        # Train model
        self.model.fit(X_scaled, y)
        
        # Calculate feature importance
        self.feature_importance = pd.DataFrame({
            'feature': self.important_features,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        # Calculate training metrics
        y_pred = self.model.predict(X_scaled)
        rmse = np.sqrt(mean_squared_error(y, y_pred))
        r2 = r2_score(y, y_pred)
        
        return {
            'rmse': rmse,
            'r2': r2,
            'feature_importance': self.feature_importance
        }
    
    def predict(self, features):
        """Make predictions on new data"""
        # Convert input features to DataFrame
        features_df = pd.DataFrame([features], columns=self.important_features)
        
        # Encode categorical variables
        for feature, encoder in self.label_encoders.items():
            features_df[feature] = encoder.transform(features_df[feature])
        
        # Scale numerical features
        numerical_features = ['BHK', 'Size', 'Floor', 'Bathroom']
        numerical_scaled = self.scaler.transform(features_df[numerical_features])
        features_df[numerical_features] = numerical_scaled
        
        # Make prediction
        prediction = self.model.predict(features_df)[0]
        return prediction
    
    def save_model(self, model_path='rental_price_model.joblib'):
        """Save the trained model and preprocessors"""
        model_data = {
            'model': self.model,
            'scaler': self.scaler,
            'label_encoders': self.label_encoders,
            'feature_importance': self.feature_importance,
            'important_features': self.important_features
        }
        joblib.dump(model_data, model_path)
        print(f"Model saved successfully to {model_path}")
    
    @classmethod
    def load_model(cls, model_path='rental_price_model.joblib'):
        """Load a trained model and preprocessors"""
        model_data = joblib.load(model_path)
        instance = cls()
        instance.model = model_data['model']
        instance.scaler = model_data['scaler']
        instance.label_encoders = model_data['label_encoders']
        instance.feature_importance = model_data['feature_importance']
        instance.important_features = model_data['important_features']
        return instance

# Train and save model
if __name__ == "__main__":
    # Use raw string for Windows path
    data_path = r"C:\Users\Hp\Desktop\Machine-Learning\house-prediction\src\app\lib\train.csv"
    
    try:
        print("Initializing model...")
        model = RentalPriceModel()
        
        print("\nLoading data...")
        X, y = model.load_data(data_path)
        
        print("\nTraining model...")
        metrics = model.train(X, y)
        
        print("\nSaving model...")
        model.save_model()
        
        print("\nTraining Results:")
        print(f"RMSE: ₹{metrics['rmse']:,.2f}")
        print(f"R² Score: {metrics['r2']:.3f}")
        
        print("\nFeature Importance:")
        print(metrics['feature_importance'])
        
        # Example prediction
        print("\nExample Prediction:")
        sample_input = {
            'BHK': 2,
            'Size': 1000,
            'Floor': 2,
            'Bathroom': 2,
            'Furnishing Status': 'Furnished',
            'Area Type': 'Super Area',
            'City': 'Mumbai'
        }
        print(f"Predicted Rent for sample input: ₹{model.predict(sample_input):,.2f}")
        
    except Exception as e:
        print(f"\nAn error occurred: {str(e)}")
        print("Please check the file path and ensure the dataset is in the correct location")