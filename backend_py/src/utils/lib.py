from sklearn.cluster import KMeans
from PIL import Image
import numpy as np
import math

def weighted_average_of_closest_vectors(X, L, M):
    X_reshaped = X[:, np.newaxis, :]
    L_reshaped = L[np.newaxis, :, :]

    print("computing Manhattan distances")
    distances = np.sum(np.abs(X_reshaped - L_reshaped), axis=2)

    print("computing closest colors")
    closest_indices = np.argpartition(distances, kth=1, axis=1)[:, :2]

    d1 = distances[np.arange(len(X)), closest_indices[:, 0]]
    d2 = distances[np.arange(len(X)), closest_indices[:, 1]]
    L1 = M[closest_indices[:, 0]]
    L2 = M[closest_indices[:, 1]]

    # (d1*L2+d2*L1)/(d1+d2)
    return (d2[:, np.newaxis] * L1 + d1[:, np.newaxis] * L2) / (d1 + d2)[:, np.newaxis]


def find_closest_vector_indices(X, L):
    # Reshape X and L to 3D arrays
    X_reshaped = X[:, np.newaxis, :]
    L_reshaped = L[np.newaxis, :, :]

    # Calculate Manhattan distances
    print("computing manhattan distances")
    distances = np.sum(np.abs(X_reshaped - L_reshaped), axis=2)

    # Find the index of the minimum distance for each vector in X
    print("computing closest colors")
    min_indices = np.argmin(distances, axis=1)
    return min_indices

def transform_interpolate(image, colors, target): # pixels may be a linear combination of two colors in target palette
    colors = np.array(colors)
    target = np.array(target)
    width, height = image.size
    data = np.array(image).reshape(-1,3)
    new_data = weighted_average_of_closest_vectors(data, colors, target)
    original_shape = (height, width, data.shape[1])
    processed_img = Image.fromarray(new_data.reshape(original_shape).astype(np.uint8))
    return processed_img

def transform(image, colors,target): # no interpolation, every pixel in output is in the target palette
    colors = np.array(colors)
    target = np.array(target)
    width, height = image.size
    data = np.array(image).reshape(-1,3)
    min_indices = find_closest_vector_indices(data, colors)
    new_data = target[min_indices]
    original_shape = (height, width, data.shape[1])
    processed_img = Image.fromarray(new_data.reshape(original_shape).astype(np.uint8))
    return processed_img

def sort(vectors):
    sums = np.sum(vectors, axis=1)
    sorted_indices = np.argsort(sums)
    sorted_vectors = [vectors[i] for i in sorted_indices]
    return sorted_vectors

def k_means(image, k):
    sparse = int((image.size[0]+image.size[1])/2)
    data = np.array(image).reshape(-1,3)[::sparse]

    # Applying K-means clustering
    kmeans = KMeans(n_clusters=k, n_init=10)
    kmeans.fit(data)

    # Getting cluster labels and centroids
    centroids = kmeans.cluster_centers_
    centroids = sort(centroids)
    return centroids


def get_luminosity(color_palette):
    luminosities = []
    for color in color_palette:
        luminosity = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2]
        luminosities.append(luminosity)
    return luminosities
