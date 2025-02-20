import numpy as np
from collections import Counter

class DecisionTree:
    def __init__(self, max_depth=None, min_samples_split=2):
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.tree = None
    
    def fit(self, X, y):
        self.tree = self._grow_tree(X, y)
    
    def _grow_tree(self, X, y, depth=0):
        num_samples, num_features = X.shape
        
        if depth >= self.max_depth or num_samples < self.min_samples_split or len(set(y)) == 1:
            return Counter(y).most_common(1)[0][0]  # Majority class
        
        feat_idx, threshold = self._best_split(X, y)
        if feat_idx is None:
            return Counter(y).most_common(1)[0][0]
        
        left_idx = X[:, feat_idx] <= threshold
        right_idx = X[:, feat_idx] > threshold
        
        left_tree = self._grow_tree(X[left_idx], y[left_idx], depth + 1)
        right_tree = self._grow_tree(X[right_idx], y[right_idx], depth + 1)
        
        return (feat_idx, threshold, left_tree, right_tree)
    
    def _best_split(self, X, y):
        best_gain = -1
        best_feat, best_thresh = None, None
        
        for feat_idx in range(X.shape[1]):
            thresholds = np.unique(X[:, feat_idx])
            for threshold in thresholds:
                left_y = y[X[:, feat_idx] <= threshold]
                right_y = y[X[:, feat_idx] > threshold]
                gain = self._information_gain(y, left_y, right_y)
                
                if gain > best_gain:
                    best_gain, best_feat, best_thresh = gain, feat_idx, threshold
        
        return best_feat, best_thresh
    
    def _information_gain(self, parent, left, right):
        def entropy(y):
            probs = np.bincount(y) / len(y)
            return -np.sum([p * np.log2(p) for p in probs if p > 0])
        
        p_left, p_right = len(left) / len(parent), len(right) / len(parent)
        return entropy(parent) - (p_left * entropy(left) + p_right * entropy(right))
    
    def predict(self, X):
        return np.array([self._traverse_tree(sample, self.tree) for sample in X])
    
    def _traverse_tree(self, sample, node):
        if not isinstance(node, tuple):
            return node
        feat_idx, threshold, left, right = node
        return self._traverse_tree(sample, left if sample[feat_idx] <= threshold else right)

class RandomForest:
    def __init__(self, n_trees=10, max_depth=None, min_samples_split=2, sample_size=0.8):
        self.n_trees = n_trees
        self.max_depth = max_depth
        self.min_samples_split = min_samples_split
        self.sample_size = sample_size
        self.trees = []
    
    def fit(self, X, y):
        self.trees = []
        X, y = np.array(X), np.array(y)  # Ensure NumPy arrays
        n_samples = int(self.sample_size * len(X))

        for _ in range(self.n_trees):
            idxs = np.random.choice(len(X), n_samples, replace=True)
            tree = DecisionTree(max_depth=self.max_depth, min_samples_split=self.min_samples_split)
            tree.fit(X[idxs], y[idxs])  # Index correctly using NumPy
            self.trees.append(tree)

            
            for _ in range(self.n_trees):
                idxs = np.random.choice(len(X), n_samples, replace=True)
                tree = DecisionTree(max_depth=self.max_depth, min_samples_split=self.min_samples_split)
                tree.fit(X[idxs], y[idxs])
                self.trees.append(tree)
    
    def predict(self, X):
        predictions = np.array([tree.predict(X) for tree in self.trees])
        return np.array([Counter(pred).most_common(1)[0][0] for pred in predictions.T])  # Majority voting

# Example Usage
if __name__ == "__main__":
    from sklearn.datasets import make_classification
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import accuracy_score
    
    X, y = make_classification(n_samples=500, n_features=10, random_state=42)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    rf = RandomForest(n_trees=10, max_depth=5)
    rf.fit(X_train, y_train)
    y_pred = rf.predict(X_test)
    
    print("Accuracy:", accuracy_score(y_test, y_pred))