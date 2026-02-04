import MainLayout from '@/components/MainLayout';
import Dashboard from '@/components/Dashboard/Dashboard';
import LibraryDashboard from '@/components/Dashboard/LibraryDashboard';
import MyLibrary from '@/components/MyLibrary/MyLibrary';
import { cn } from '@/lib/utils';

export default async function LibraryPage() {
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
            <LibraryDashboard />
          </Dashboard>

          {/* Right content */}
          <div className={cn('flex-1')}>
            <MyLibrary />
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
