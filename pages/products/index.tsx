import ProductList from '@/components/products/ProductList';
import { products } from '@/data/products';
// Die Produktdaten werden hier importiert und an ProductList übergeben, da die ProductsPage bestimmt, welche Daten angezeigt werden.
// Die Komponente soll sie nur darstellen.

export default function ProductsPage() {
    return (
        <div>
            <h1 className="mb-4 text-2xl font-bold">Products</h1>
            <ProductList products={products} />
        </div>
    );
}
