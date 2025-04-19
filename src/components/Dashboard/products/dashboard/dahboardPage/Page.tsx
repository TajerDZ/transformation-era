import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SideBarContext } from "@/hooks/SideBarContext";
import { cn } from "@/lib/utils";
import { t } from "i18next";
import { useContext } from "react";
import Domains from "@/assets/icons/domains.png";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import Icon from "@/components/ui/Icon";
type PageProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};
function Page({ setStep }: PageProps) {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBarContext must be used within a SideBarProvider");
  }
  const { open } = context;
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-xl font-bold ">{t("products.dashboard.title")}</h1>
        <ul className="flex gap-1 text-sm font-medium">
          <li className="text-gray-500">{t("home.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("products.title")}</li>
          <li className="text-gray-500">-</li>
          <li className="text-gray-500">{t("products.dashboard.title")}</li>
        </ul>
        <Separator
          className={cn("max-sm:!w-full", open && "max-lg:!w-[100%]")}
          style={{
            width: open ? "calc(100vw - 19.5rem)" : "calc(100vw - 9.5rem)",
          }}
        />
      </div>
      <Card className="shadow-none rounded-2xl p-0 max-md:p-0 transition-all duration-300">
        <div className="flex justify-between items-center px-3">
          <div className="flex items-center gap-2 p-4">
            <span className="border rounded-full p-1">
              <img src={Domains} alt="domains" />
            </span>
            <div>
              <h2 className="font-bold text-gray-600">
                {t("products.dashboard.domains")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("products.dashboard.domains_desc")}
              </p>
            </div>
          </div>
          <Button
            className="bg-button rounded-full px-10"
            onClick={() => setStep(1)}
          >
            {t("products.dashboard.upgrade_plan")}
          </Button>
        </div>
      </Card>
      <div className="flex items-start gap-5 max-lg:flex-col pb-5">
        <div className="lg:flex-1 flex flex-col gap-2 max-lg:w-full">
          <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300">
            <div className="">
              <div className="flex items-center gap-4 p-4">
                <h1 className="font-bold">
                  {t("products.dashboard.site_details")}
                </h1>
              </div>
              <Table className="border border-x-0 border-b-0 divide-y">
                <TableBody>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      {t("products.dashboard.table.access_your_site_on")}
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      https://notchpal.com
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      {t("products.dashboard.table.access_your_site_with_www")}
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      https://www.notchpal.com
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      {t("products.dashboard.table.website_IP_address")}
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      <span className="text-secondary-1 font-medium flex items-center gap-2 justify-end">
                        46.202.156.141
                        <span className="cursor-pointer">
                          <Icon name="Copy" size={16} />
                        </span>
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
          <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300">
            <div className="">
              <div className="flex items-center gap-4 p-4">
                <h1 className="font-bold">
                  {t("products.dashboard.server_details")}
                </h1>
              </div>
              <Table className="border border-x-0 border-b-0 divide-y">
                <TableBody>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      {t("products.dashboard.table.server_name")}
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      server1800
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      {t("products.dashboard.table.server_location")}
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      السعودية
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
        <div className="w-1/4 max-lg:w-full">
          <Card className="shadow-none rounded-lg p-0 max-md:p-0 transition-all duration-300">
            <div className="">
              <div className="flex items-center gap-4 p-4">
                <h1 className="font-bold">
                  {t("products.dashboard.server_details")}
                </h1>
              </div>
              <Table className="border border-x-0 border-b-0 divide-y">
                <TableBody>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Disk Usage
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      1.43 MB / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      File Usage
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      180.585 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Bandwidth
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      10.99 MB / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Addon Domains
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Bandwidth
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Subdomains
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Alias Domains
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Email Accounts
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Mailiing Lists
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Autoresponders
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Forwarders
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      Email Filters
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      FTP Accounts
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      0 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      MySQL Databases
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      3 / ∞
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-start text-muted-foreground font-medium">
                      PostgreSQL Databases
                    </TableCell>
                    <TableCell className="text-end text-secondary-1 font-medium">
                      3 / ∞
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Page;
