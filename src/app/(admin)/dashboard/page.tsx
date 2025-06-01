import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import CalendarDateRangePicker from "./calendar-date-range-picker";
import data from "./data.json";
import { DataTable } from "./data-table";
import { Overview } from "./overview";
import { RecentSales } from "./recent-sales";
import { StatCards } from "./stat-cards";
import { TotalVisitorChart } from "./total-visitor";

export default function DashboardPage() {
  return (
    <Container>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <CalendarDateRangePicker />
                <Button>Download</Button>
              </div>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                  Notifications
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <StatCards />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <div className="col-span-4">
                    <Overview />
                  </div>
                  <div className="col-span-3">
                    <RecentSales />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div>
              <TotalVisitorChart />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </Container>
  );
}
