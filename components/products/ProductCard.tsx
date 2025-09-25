import Link from 'next/link';
import Image from 'next/image';
import Stars from '@/components/ui/Stars';
import type { Product } from '@/data/product';
import { formatPrice } from '@/utils/format';

export default function ProductCard({ product }: { product: Product }) {
    //Abufbereitung der Daten und Ermittlung der richtigen werte wie z.B. saving oder verfügbarkeit
    //TODO: Auslagern
    const price = product.Price?.PriceWithDiscountRaw?.Value ?? product.Price?.PriceRaw?.Value;
    const currency =
        product.Price?.PriceWithDiscountRaw?.Currency?.CurrencyCode ??
        product.Price?.PriceRaw?.Currency?.CurrencyCode ??
        'EUR';
    const oldPrice = product.Price?.OldPriceRaw?.Value;
    const hasDiscount = !!oldPrice && !!price && oldPrice > price;
    const discountPercent =
        product.Price?.DiscountInPercent ?? (hasDiscount ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);
    const saving = hasDiscount ? oldPrice - price! : 0;
    const availableNow = product.DeliveryDate === 0;
    const rating = product.ProductReviewAverageRating ?? 0;
    const reviews = product.ProductReviewCount ?? 0;
    const energyBadgeUrl = product.EnergyBadge?.trim();
    const mainImage = product.AssetModels?.find((asset) => asset.Type === 'PICTURE' && asset.Purpose === 'MAIN');

    return (
        <Link href={`/products/${product.Id}`} className="group block" aria-label={`${product.Name} – Details ansehen`}>
            <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
                {/*Hersteller */}
                <div className="flex items-center justify-between px-4 pt-4">
                    <div className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {product.Manufacturer?.Name ?? '—'}
                    </div>
                </div>

                {/* Titel + Rating */}
                <div className="px-4 pt-2">
                    <h3 className="line-clamp-2 text-base font-semibold text-gray-900">{product.Name}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                        <Stars value={rating} />
                        {/* TODO: Auslagern */}
                        <span className="text-gray-500">{Number.isFinite(rating) ? rating.toFixed(1) : '—'}</span>
                        <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">{reviews}</span>
                    </div>
                </div>

                {/* Bild */}
                {/* Hier habe ich ein placeholder image gesetzt, da ich nicht auf die richtigen imge url zugreifen kann, ich prüfe auf asset purpose MAIN und würde dieses normal hier anzeigen. */}
                <div className="relative mx-4 mt-3 overflow-hidden rounded-xl bg-gray-100">
                    <div className="relative aspect-[4/3] w-full">
                        {mainImage ? (
                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                No Image
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>
                </div>

                {/* Preise */}
                <div className="px-4 pt-3">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        {hasDiscount && (
                            <div>
                                <span className="mr-2 rounded-full bg-orange-600 px-2 py-1 text-xs font-semibold text-white shadow">
                                    -{discountPercent}%
                                </span>
                                <span className="text-gray-400 line-through">{formatPrice(oldPrice, currency)}</span>{' '}
                                <span>UVP</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-1 text-2xl font-semibold text-orange-600">
                        {formatPrice(price, currency)}
                        {hasDiscount && (
                            <span className="ml-2 align-middle text-sm font-semibold text-orange-600">
                                Du sparst {formatPrice(saving, currency)}
                            </span>
                        )}
                    </div>

                    <div className="mt-1 text-xs text-gray-500">
                        {product.Price?.DisplayTaxInfo ? 'inkl. MwSt.' : 'ohne MwSt.'} zzgl. Versand
                    </div>

                    <div className="mt-1 text-xs text-gray-500">
                        0% Finanzierung schon ab {price ? formatPrice(price / 24, currency) : '—'}
                    </div>
                </div>

                {/* CTA + Availability + Energy */}
                {/* Hier habe ich einen fake-button platziert für die Optik. Es könnt aber der add to card button sein */}
                <div className="px-4 pt-3 pb-4">
                    <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-3 text-sm font-semibold text-white transition group-hover:bg-orange-700">
                        Produkt Details
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                            <span
                                className={`inline-block h-2 w-2 rounded-full ${
                                    availableNow ? 'bg-green-600' : 'bg-yellow-500'
                                }`}
                            />
                            <span className="text-gray-700">
                                {availableNow ? 'Online Sofort verfügbar' : 'Bald verfügbar'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        {energyBadgeUrl && (
                            <Image
                                src={energyBadgeUrl}
                                alt="Energieeffizienzlabel"
                                width={60}
                                height={20}
                                className="h-6 w-auto"
                            />
                        )}
                    </div>
                    {/* TODO: Produktblatt hinzufügen */}
                </div>
            </article>
        </Link>
    );
}
