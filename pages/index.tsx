import ProductList from '@/components/products/ProductList';
import { products } from '@/data/products';

export default function Home() {
    // Hier lege ich die IDs der Produkte fest, die als "featured" angezeigt werden sollen.
    // Ich verwende dafür ein Array, weil die Produkte selbst kein "featured"-Flag besitzen.
    // Aus allen Produkten filtere ich nur die heraus, deren Id im Array enthalten ist.
    const featuredIds = ['1CE9-089', '1C26-CRP', '1A01-68H'];
    const featured = products.filter((p) => featuredIds.includes(p.Id));

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border bg-white p-6">
                <h2 className="mb-2 text-xl font-semibold">Intro</h2>
                <p className="text-gray-600">
                    Willkommen auf Cyperport.de, Hier finden sie eine kleine Auwahl an Angeboten.
                </p>
            </section>

            <section>
                <h3 className="mb-3 text-lg font-semibold">Featured Products</h3>
                <ProductList products={featured} />
            </section>
        </div>
    );
}
