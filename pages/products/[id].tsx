import { useRouter } from 'next/router';
import { products } from '@/data/products';
import ProductDetail from '@/components/products/ProductDetail';

export default function ProductDetailPage() {
    //Hier hole ich mir die ID aus der URL und suche in der Productliste nach dem Produkt. Falls es keins mit der ID gibt, gebe ich eine Fehlermeldung aus.
    const router = useRouter();
    const { id } = router.query;
    const product = products.find((p) => p.Id === id);

    if (!product) {
        return <p>Produkt nicht gefunden</p>;
    }

    return <ProductDetail product={product} />;
}
