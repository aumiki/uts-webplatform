"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles.module.css';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'skincare' | 'makeup' | 'fragrance' | 'shades';
  image: string;
  stock: number;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'skincare' as 'skincare' | 'makeup' | 'fragrance' | 'shades',
    image: '',
    stock: 0,
  });

  const API_BASE = 'http://localhost:5000/api';

  const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  };

  const apiFetch = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return new Response('No token', { status: 401 });
    }

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (res.status === 401 || res.status === 403) {
      router.push('/login');
    }

    return res;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await apiFetch('/products');
      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (data: Omit<Product, 'id'>) => {
    try {
      const res = await apiFetch('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      closeModal();
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to create product');
    }
  };

  const updateProduct = async (id: string, data: Omit<Product, 'id'>) => {
    try {
      const res = await apiFetch(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      closeModal();
      fetchProducts();
    } catch (err: any) {
      setError(err.message || 'Failed to update product');
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = getToken();
      if (!token) return;
      
      const res = await fetch(`${API_BASE}/products/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Delete error:', errorText);
        setError('Failed to delete product: ' + errorText);
        return;
      }
      
      fetchProducts();
      setError('');
    } catch (err: any) {
      console.error('Delete error:', err);
      setError('Failed to delete product. Please try again.');
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setIsEditMode(true);
      setCurrentProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: product.stock,
      });
    } else {
      setIsEditMode(false);
      setCurrentProduct(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        category: 'skincare',
        image: '',
        stock: 0,
      });
    }
    setIsModalOpen(true);
    setError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setCurrentProduct(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'skincare',
      image: '',
      stock: 0,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.price <= 0 || formData.stock < 0) {
      setError('Please fill all fields correctly');
      return;
    }
    if (isEditMode && currentProduct) {
      updateProduct(currentProduct.id, formData);
    } else {
      createProduct(formData);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.productsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>Product Management</h1>
          <p className={styles.pageSubtitle}>MAISONLUXE Admin Panel</p>
          <button className={styles.addBtn} onClick={() => openModal()}>
            + Add New Product
          </button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyTitle}>No Products</div>
            <p>Create your first luxury product to get started.</p>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <h3 className={styles.productName}>{product.name}</h3>
                <div className={styles.productDetail}>
                  <span>Category</span>
                  <strong>{product.category}</strong>
                </div>
                <div className={styles.productDetail}>
                  <span>Price</span>
                  <span className={styles.price}>${product.price.toFixed(2)}</span>
                </div>
                <div className={styles.productDetail}>
                  <span>Stock</span>
                  <strong>{product.stock}</strong>
                </div>
                <div className={styles.actions}>
                  <button
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => openModal(product)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>
                  {isEditMode ? 'Edit Product' : 'Add New Product'}
                </h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className={styles.modalBody}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Product Name</label>
                    <input
                      type="text"
                      className={styles.formInput}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea
                      className={styles.formTextarea}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={styles.formInput}
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                        }
                        required
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Stock</label>
                      <input
                        type="number"
                        min="0"
                        className={styles.formInput}
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select
                      className={styles.formSelect}
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as Product['category'],
                        })
                      }
                    >
                      <option value="skincare">Skincare</option>
                      <option value="makeup">Makeup</option>
                      <option value="fragrance">Fragrance</option>
                      <option value="shades">Shades</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Image URL</label>
                    <input
                      type="url"
                      className={styles.formInput}
                      value={formData.image}
                      onChange={(e) =>
                        setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button type="button" className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={`${styles.modalBtn} ${styles.submitBtn}`}>
                    {isEditMode ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

