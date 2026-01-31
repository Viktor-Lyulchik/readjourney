import MainLayout from '@/components/MainLayout';
import RecommendedBooks from '@/components/Books/RecommendedBooks';
import Dashboard from '@/components/Dashboard/Dashboard';
import RecommendedDashboard from '@/components/Dashboard/RecommendedDashboard';
import ResponsivePaginationWrapper from '@/components/Books/ResponsivePaginationWrapper';
import { cn } from '@/lib/utils';

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    author?: string;
    title?: string;
  }>;
};

export default async function RecommendedPage({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <MainLayout>
      <section className={cn()}>
        <div
          className={cn(
            'flex max-[1439px]:flex-wrap xxl:flex-nowrap',
            'gap-2.5 md:gap-4 xxl:gap-4',
            'container',
            'p-0!'
          )}
        >
          {/* Left dashboard */}
          <Dashboard>
            <RecommendedDashboard />
          </Dashboard>

          {/* Right content */}
          <div className={cn('flex-1')}>
            <ResponsivePaginationWrapper>
              <RecommendedBooks searchParams={params} />
            </ResponsivePaginationWrapper>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
