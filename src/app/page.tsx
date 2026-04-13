import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getProducts } from '@/services/productService'
import { ProductList } from '@/components/products/ProductList'

export default async function HomePage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductList />
    </HydrationBoundary>
  )
}
