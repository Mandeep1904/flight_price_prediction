import random
import numpy as np

class ExtraTreeRegressor:
    def __init__(self, max_depth=10, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None

    def fit(self, X, y):
        """Fit the model to the training data."""
        self.tree = self._build_tree(X, y, depth=0)

    def predict(self, X):
        """Predict target values for given input."""
        return np.array([self._predict_sample(sample, self.tree) for sample in X])

    def _build_tree(self, X, y, depth):
        """Recursively build the decision tree."""
        n_samples, n_features = X.shape
        
        # Stopping criteria
        if depth >= self.max_depth or n_samples < self.min_samples_split or len(np.unique(y)) == 1:
            return {"value": np.mean(y)}

        # Randomly select a feature and a split point
        feature_idx = random.randint(0, n_features - 1)
        feature_values = X[:, feature_idx]
        split_value = random.uniform(np.min(feature_values), np.max(feature_values))

        # Split the data
        left_mask = feature_values <= split_value
        right_mask = feature_values > split_value

        if np.sum(left_mask) == 0 or np.sum(right_mask) == 0:
            # If split creates an empty node, stop further splitting
            return {"value": np.mean(y)}

        # Recursive tree building
        left_tree = self._build_tree(X[left_mask], y[left_mask], depth + 1)
        right_tree = self._build_tree(X[right_mask], y[right_mask], depth + 1)

        return {
            "feature": feature_idx,
            "split": split_value,
            "left": left_tree,
            "right": right_tree,
        }

    def _predict_sample(self, sample, tree):
        """Traverse the tree to make a prediction for a single sample."""
        if "value" in tree:
            return tree["value"]

        feature_idx = tree["feature"]
        split_value = tree["split"]

        if sample[feature_idx] <= split_value:
            return self._predict_sample(sample, tree["left"])
        else:
            return self._predict_sample(sample, tree["right"])

# Example usage
if __name__ == "__main__":
    # Generate some sample data
    np.random.seed(0)
    X = np.random.rand(100, 1) * 10  # One feature
    y = 2 * X.squeeze() + np.random.randn(100) * 2  # Linear relationship with noise

    # Train Extra Tree Regressor
    model = ExtraTreeRegressor(max_depth=5, min_samples_split=5)
    model.fit(X, y)

    # Predict
    X_test = np.linspace(0, 10, 10).reshape(-1, 1)
    predictions = model.predict(X_test)

    print("Predictions:", predictions)
