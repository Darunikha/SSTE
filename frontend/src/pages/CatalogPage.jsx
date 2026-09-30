import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCatalogApi } from '../services/api';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import { useToast } from '../context/ToastContext';

const CATEGORIES = [
  'All Items',
  'Compact Spinning Spares',
  'Drives & Inverters',
  'Electronic Boards',
  'Sensors & Electronics',
  'HMI & Control Screens'
];

const CatalogPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slowLoad, setSlowLoad] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Items');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    if (!loading) return undefined;
    const timer = setTimeout(() => setSlowLoad(true), 4000);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await getCatalogApi();
        if (response.data?.success) {
          setItems(response.data.data);
          setFilteredItems(response.data.data);
        } else {
          addToast('Failed to load catalog items.', 'error');
        }
      } catch (err) {
        console.error('Error fetching catalog:', err);
        addToast('Error connecting to backend services.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, [addToast]);

  // Apply filters on search query or category changes
  useEffect(() => {
    let result = items;

    // Filter by Category
    if (activeCategory !== 'All Items') {
      result = result.filter(
        (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by Search Query (Name, SKU, Description, Category)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    setFilteredItems(result);
  }, [searchQuery, activeCategory, items]);

  const handleRequestQuote = (item) => {
    // Navigate back to Homepage quote section and pre-fill the form using state
    navigate('/', {
      state: {
        scrollTo: 'contact',
        prefillProduct: {
          name: item.name,
          sku: item.sku,
        },
      },
    });
    addToast(`Selected ${item.name} for quote request.`, 'success');
  };

  const getAvailabilityClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'in stock':
        return 'badge-success';
      case 'limited stock':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="catalog-page">
      {/* Hero Section */}
      <section className="catalog-hero section-alt">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our Inventory</span>
            <h1 className="catalog-title">Spares & Services Catalog</h1>
            <p className="catalog-lead">
              Browse and search our selection of precision textile machinery spare parts, electronic boards, and drive servicing options. View technical specifications and instantly request custom quotes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Main Catalog Search & Grid */}
      <section className="section">
        <div className="container">
          {/* Controls Bar */}
          <Reveal className="catalog-controls">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by part name, SKU, machine compatibility..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search Catalog"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                >
                  &times;
                </button>
              )}
            </div>

            <div className="category-tabs" role="tablist">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`category-tab ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Catalog Listing */}
          {loading ? (
            <div aria-busy="true" aria-live="polite">
              <div className="catalog-grid" aria-hidden="true">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div className="catalog-card skeleton-card" key={i}>
                    <div className="skeleton skeleton-image" />
                    <div className="catalog-card-content">
                      <div className="skeleton skeleton-line short" />
                      <div className="skeleton skeleton-line title" />
                      <div className="skeleton skeleton-line" />
                      <div className="skeleton skeleton-line" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="catalog-loading-note">
                {slowLoad
                  ? 'Waking up the server, this can take up to a minute the first time…'
                  : 'Loading spare parts inventory…'}
              </p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="catalog-empty">
              <h3>No items match your search.</h3>
              <p>Try adjusting your filters, searching for a different term, or get in touch with our team directly for custom parts sourcing.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All Items');
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="catalog-grid">
              {filteredItems.map((item, idx) => (
                <Reveal
                  key={item._id || item.sku}
                  className="catalog-card"
                  style={{ transitionDelay: `${Math.min(idx % 3, 3) * 80}ms` }}
                >
                  <div className="catalog-card-image">
                    <span className="part-placeholder-icon" role="img" aria-label={item.name}>
                      {item.imagePlaceholder || '⚙️'}
                    </span>
                    <span className={`availability-badge ${getAvailabilityClass(item.availability)}`}>
                      {item.availability}
                    </span>
                  </div>
                  <div className="catalog-card-content">
                    <span className="catalog-card-category">{item.category}</span>
                    <h3 className="catalog-card-title">{item.name}</h3>
                    <span className="catalog-card-sku">SKU: {item.sku}</span>
                    <p className="catalog-card-desc">{item.description}</p>
                    {item.compatibility && (
                      <div className="catalog-card-compat">
                        <strong>Fits: </strong> {item.compatibility}
                      </div>
                    )}
                  </div>
                  <div className="catalog-card-actions">
                    <button
                      className="btn btn-outline btn-compact"
                      onClick={() => setSelectedItem(item)}
                    >
                      Specifications
                    </button>
                    <button
                      className="btn btn-primary btn-compact"
                      onClick={() => handleRequestQuote(item)}
                    >
                      Request Quote
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Specifications & Details Modal */}
      {selectedItem && (
        <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close specifications modal"
            >
              &times;
            </button>

            <div className="modal-body-layout">
              <div className="modal-sidebar">
                <div className="modal-image-container">
                  <span className="modal-placeholder-icon">
                    {selectedItem.imagePlaceholder || '⚙️'}
                  </span>
                </div>
                <div className="modal-meta">
                  <div className="modal-meta-row">
                    <strong>SKU Code:</strong> <span>{selectedItem.sku}</span>
                  </div>
                  <div className="modal-meta-row">
                    <strong>Category:</strong> <span>{selectedItem.category}</span>
                  </div>
                  <div className="modal-meta-row">
                    <strong>Availability:</strong>
                    <span className={`availability-badge ${getAvailabilityClass(selectedItem.availability)}`}>
                      {selectedItem.availability}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-main">
                <span className="eyebrow">{selectedItem.category}</span>
                <h2 id="modal-title" className="modal-title">{selectedItem.name}</h2>
                <p className="modal-description">{selectedItem.description}</p>

                {selectedItem.compatibility && (
                  <div className="modal-compatibility-section">
                    <h4>Machinery Compatibility</h4>
                    <p>{selectedItem.compatibility}</p>
                  </div>
                )}

                {selectedItem.specifications && selectedItem.specifications.length > 0 && (
                  <div className="modal-specs-section">
                    <h4>Technical Specifications</h4>
                    <table className="modal-specs-table">
                      <tbody>
                        {selectedItem.specifications.map((spec, sIdx) => {
                          const parts = spec.split(':');
                          const label = parts[0]?.trim();
                          const val = parts.slice(1).join(':')?.trim();
                          return (
                            <tr key={sIdx}>
                              <td>{label}</td>
                              <td>{val || 'Yes'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="modal-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => setSelectedItem(null)}
                  >
                    Close Specs
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const item = selectedItem;
                      setSelectedItem(null);
                      handleRequestQuote(item);
                    }}
                  >
                    Request a Quote for this Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
