export type CategorySlug = 'educacao-financeira' | 'financiamento-veiculos' | 'credito-pessoa-fisica' | 'credito-empresas' | 'futuro' | 'relacao-investidores' | 'institucional';

export interface Category {
    slug: CategorySlug;
    name: string;
    description: string;
    coverImage?: string;
}