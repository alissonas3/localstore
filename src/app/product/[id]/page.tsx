import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getProductById } from '@/services/productService'
import { ProductDetail } from '@/components/products/ProductDetail'

export const dynamicParams = true

export async function generateStaticParams() {
  return Array.from({ length: 5 }, (_, i) => ({ id: String(i + 1) }))
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params
  const productId = Number(id)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetail id={productId} />
    </HydrationBoundary>
  )
}
