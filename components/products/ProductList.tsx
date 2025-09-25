import ProductCard from '@/components/products/ProductCard';
import type { Product } from '@/data/product';

export default function ProductList({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Iteration über die vorhandenen Produkte und Weitergabe der Daten pro Produkt an die ProductCard */}
            {products.map((p) => (
                <ProductCard key={p.Id} product={p} />
            ))}
        </div>
    );
}
