import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Stars from '@/components/ui/Stars';
import type { Product } from '@/data/product';
import { formatPrice, formatDate } from '@/utils/format';

function MarketingBadge({ value }: { value?: string | null }) {
    const attr = (value ?? '').toUpperCase();
    if (attr === 'SALE')
        return (
            <span
                className={`ring-blue-200} inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset`}
            >
                NEW
            </span>
        );
    if (attr === 'NEW')
        return (
            <span
                className={`ring-red-200} inline-flex items-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset`}
            >
                SALE
            </span>
        );
    return null;
}

function BackButton({ label = 'Zurück' }) {
    const router = useRouter();
    return (
        <button onClick={() => router.back()} className="cursor-pointer text-orange-600 underline">
            {label}
        </button>
    );
}

export default function ProductDetail({ product }: { product: Product }) {
    //Abufbereitung der Daten und Ermittlung der richtigen werte wie z.B. saving oder verfügbarkeit
    //TODO: Auslagern
    const priceNow = product.Price?.PriceWithDiscountRaw?.Value ?? product.Price?.PriceRaw?.Value;
    const priceCurr =
        product.Price?.PriceWithDiscountRaw?.Currency?.CurrencyCode ??
        product.Price?.PriceRaw?.Currency?.CurrencyCode ??
        'EUR';
    const oldPrice = product.Price?.OldPriceRaw?.Value;
    const hasDiscount = !!oldPrice && !!priceNow && oldPrice > priceNow;
    const saving = hasDiscount ? oldPrice! - priceNow! : 0;
    const availableNow = product.DeliveryDate === 0;
    const rating = product.ProductReviewAverageRating ?? 0;
    const reviews = product.ProductReviewCount ?? 0;

    return (
        <div className="space-y-8">
            <BackButton />

            <header className="space-y-2">
                <MarketingBadge value={product.MarketingAttribute} />

                <h1 className="text-3xl font-bold">{product.Name}</h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                    <Stars value={rating} />
                    {/* Sicherheit damit die Zahl immer richtig dargestellt wird, isFinite prüft auf gültige Zahl und fixed rundet sie */}
                    {/* TODO: Auslagern */}
                    <span className="text-gray-500">{Number.isFinite(rating) ? rating.toFixed(1) : '—'}</span>
                    <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">{reviews}</span>
                </div>
            </header>

            {/* Bild */}
            {/* Hier habe ich ein placeholder image gesetzt, da ich nicht auf die richtigen imge url zugreifen kann, 
            ich zeige nur placeholder an, da hier viele images und videos gerendert werden würden und ich eine gallerie 
            component dafür erstellen würde */}
            <div className="relative mt-3 overflow-hidden rounded-xl bg-gray-100">
                <div className="aspect-[4/3] w-full">
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">No Image</div>
                </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold">Preis</h2>
                <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
                    <div className="text-3xl font-bold text-orange-600">{formatPrice(priceNow, priceCurr)}</div>
                    {hasDiscount && (
                        <Fragment>
                            <div className="text-gray-400 line-through">{formatPrice(oldPrice, priceCurr)}</div>
                            <div className="text-md text-red-500">Du sparst {formatPrice(saving, priceCurr)}</div>
                            <div className="text-md text-red-500">-{product.Price.DiscountInPercent}%</div>
                        </Fragment>
                    )}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                    {product.Price?.DisplayTaxInfo ? 'inkl. MwSt.' : 'exkl. MwSt.'} • Steuer (
                    {product.Price?.PriceTaxRate ?? '—'}%) ={' '}
                    {formatPrice(
                        product.Price?.PriceTaxValue?.Value,
                        product.Price?.PriceTaxValue?.Currency?.CurrencyCode,
                    )}
                </div>
            </div>

            {product.BulletPoints && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-3 text-xl font-semibold">Highlights</h2>
                    <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: product.BulletPoints }} />
                </div>
            )}

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold">Identifikatoren</h2>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Produkt-ID</div>
                    <div className="text-sm sm:col-span-2">{product.Id ?? '—'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Hersteller</div>
                    <div className="text-sm sm:col-span-2">{product.Manufacturer?.Name ?? '—'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Hersteller-Artikelnummer</div>
                    <div className="text-sm sm:col-span-2">{product.ManufacturerPartNumber ?? '—'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">GTIN</div>
                    <div className="text-sm sm:col-span-2">{product.Gtin ?? '—'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Slug</div>
                    <div className="text-sm sm:col-span-2">{product.Slug ?? '—'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Family</div>
                    <div className="text-sm sm:col-span-2">
                        {product.FamilyId != null
                            ? `${product.FamilyId} (${product.FamilyNameForTracking || '—'})`
                            : '—'}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Tags</div>
                    <div className="text-sm sm:col-span-2">
                        {product.TagIds?.length ? product.TagIds.join(', ') : '—'}
                    </div>
                </div>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-semibold">Verfügbarkeit & Flags</h2>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Lieferstatus</div>
                    <div className="text-sm sm:col-span-2">
                        {availableNow ? 'Sofort verfügbar' : 'Nicht sofort verfügbar'}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Speditionsversand</div>
                    <div className="text-sm sm:col-span-2">{product.FreightForwarding ? 'Ja' : 'Nein'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Download-Produkt</div>
                    <div className="text-sm sm:col-span-2">{product.IsDownload ? 'Ja' : 'Nein'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Disable Buy Button</div>
                    <div className="text-sm sm:col-span-2">{product.Price?.DisableBuyButton ? 'Ja' : 'Nein'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Verfügbar seit</div>
                    <div className="text-sm sm:col-span-2">{formatDate(product.AvailableSince)}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Street Date</div>
                    <div className="text-sm sm:col-span-2">{product.StreetDate || '—'}</div>
                </div>
                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                    <div className="text-sm text-gray-500">Erwartetes Datum</div>
                    <div className="text-sm sm:col-span-2">{product.DateExpected || '—'}</div>
                </div>
            </div>

            {(product.EnergyClass || product.EnergyLabel || product.EnergyBadge || product.ChargingInfo) && (
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="mb-3 text-xl font-semibold">Energie & Laden</h2>
                    <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                        <div className="text-sm text-gray-500">Energieklasse</div>
                        <div className="text-sm sm:col-span-2">{product.EnergyClass ?? '—'}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                        <div className="text-sm text-gray-500">EnergyLabel</div>
                        <div className="text-sm sm:col-span-2">{product.EnergyLabel ?? '—'}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                        <div className="text-sm text-gray-500">EnergyBadge</div>
                        <div className="sm:col-span-2">
                            {product.EnergyBadge ? (
                                <Image
                                    src={product.EnergyBadge}
                                    alt={`Energieeffizienzlabel${product.EnergyClass ? `: ${product.EnergyClass}` : ''}`}
                                    width={40}
                                    height={20}
                                    className="h-4 w-auto"
                                    priority={false}
                                />
                            ) : (
                                <span className="text-sm">—</span>
                            )}
                        </div>
                    </div>

                    {product.ChargingInfo ? (
                        <div className="mt-2 rounded-lg border">
                            <div className="border-b bg-gray-50 px-4 py-2 text-sm font-medium">Charging Info</div>
                            <div className="px-4 py-2">
                                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                                    <div className="text-sm text-gray-500">Mit Ladegerät</div>
                                    <div className="text-sm sm:col-span-2">
                                        {product.ChargingInfo.HasChargingDevice ? 'Ja' : 'Nein'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                                    <div className="text-sm text-gray-500">USB Power Delivery</div>
                                    <div className="text-sm sm:col-span-2">
                                        {product.ChargingInfo.HasUsbPowerDelivery ? 'Ja' : 'Nein'}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                                    <div className="text-sm text-gray-500">Min. Leistung</div>
                                    <div className="text-sm sm:col-span-2">
                                        {`${product.ChargingInfo.MinChargingPower} ${product.ChargingInfo.ChargingPowerUnit}`}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3">
                                    <div className="text-sm text-gray-500">Max. Leistung</div>
                                    <div className="text-sm sm:col-span-2">
                                        {`${product.ChargingInfo.MaxChargingPower} ${product.ChargingInfo.ChargingPowerUnit}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="py-2 text-sm text-gray-500">Keine Lade-Informationen vorhanden.</div>
                    )}
                </div>
            )}

            <BackButton />
        </div>
    );
}
