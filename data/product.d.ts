export interface Product {
    Id: string;
    Name: string;
    MetaTitle: string;
    MetaDescription: string;
    ManufacturerPartNumber: string;
    Gtin: string;
    DeliveryDate: number;
    FreightForwarding: boolean;
    IsDownload: boolean;
    ProductReviewCount: number;
    ProductReviewAverageRating: number;
    CrossSellProductsCount: number;
    DataSheet?: string;
    EnergyLabel?: string;
    EnergyBadge?: string;
    AvailableSince: string;
    StreetDate: string;
    DateExpected: string;
    BulletPoints: string;
    CategoryId: string;
    CategoryNameForTracking: string;
    EnergyClass?: string;
    Slug: string;
    FamilyId?: number;
    FamilyNameForTracking: string;
    MarketingAttribute: string;
    HighlightText?: string;
    TagIds: string[];
    Manufacturer: Manufacturer;
    Breadcrumb: Breadcrumb[];
    Kind: string;
    AssetModels: AssetModel[];
    ChargingInfo?: ChargingInfo;
    Price: Price;
    AlternateLanguageUrls?: Record<number, string>;
    Variation?: unknown;
    AgeRestriction?: unknown;
}

export interface Manufacturer {
    Id: number;
    Name: string;
    Slug: string;
    LogoPath: string;
    LogoWidth?: number;
    LogoHeight?: number;
}

export interface Breadcrumb {
    Id: number;
    CuId: number;
    Name: string;
    NameDefault: string;
    Slug: string;
}

export interface AssetModel {
    AssetId: string;
    Purpose: string;
    SortId: number;
    Type: string;
    Width?: number;
    Height?: number;
    Title?: string;
    ExternalUrl?: string;
}

export interface ChargingInfo {
    HasChargingDevice: boolean;
    HasUsbPowerDelivery: boolean;
    MinChargingPower: number;
    MaxChargingPower: number;
    ChargingPowerUnit: string;
}

export interface Price {
    PriceRaw: PriceRaw;
    PriceWithDiscountRaw: PriceRaw;
    OldPriceRaw: PriceRaw;
    EVKType: number;
    UVPStartDate?: string;
    UVPEndDate?: string;
    DisplayTaxInfo: boolean;
    PriceTaxRate: number;
    PriceTaxValue: PriceRaw;
    PriceTaxCategory: string;
    DisableBuyButton: boolean;
    DiscountInPercent: number;
    DiscountInMasterFeed: boolean;
    IsValid: boolean;
}

export interface PriceRaw {
    Value: number;
    Currency: Currency;
    AlternativeValue?: number;
    AlternativeCurrency?: Currency;
}
